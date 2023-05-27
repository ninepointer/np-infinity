const XTSInteractive = require('xts-interactive-api').Interactive;
const XTSInteractiveWS = require('xts-interactive-api').WS;
const RetrieveOrder = require("../../models/TradeDetails/retreiveOrder")
const io = require('../../marketData/socketio');
const { xtsAccountType } = require("../../constant");
const { client, getValue } = require('../../marketData/redisClient');
const InfinityLiveTrader = require("../../models/TradeDetails/infinityLiveUser");
const InfinityLiveCompany = require("../../models/TradeDetails/liveTradeSchema");
const InfinityMockTrader = require("../../models/mock-trade/infinityTrader");
const InfinityMockCompany = require("../../models/mock-trade/infinityTradeCompany");
const BrokerageDetail = require("../../models/Trading Account/brokerageSchema");
const RedisBackup = require("../../models/TradeDetails/orderIdKeyBackup");
const mongoose = require('mongoose');
const { save } = require("./xtsHelper/saveXtsCred");



let xtsInteractiveWS;
let xtsInteractiveAPI;
// let orderData ;
const interactiveLogin = async () => {
  xtsInteractiveAPI = new XTSInteractive(
    process.env.INTERACTIVE_URL
  );

  xtsInteractiveWS = new XTSInteractiveWS(
    process.env.INTERACTIVE_URL
  );
  console.log("xtsInteractiveAPI", xtsInteractiveAPI)
  let loginRequest = {
    secretKey: process.env.INTERACTIVE_SECRET_KEY,
    appKey: process.env.INTERACTIVE_APP_KEY,
  };

  try {
    (async () => {
      console.log(loginRequest, process.env.INTERACTIVE_URL)
      let logIn = await xtsInteractiveAPI.logIn(loginRequest);
      console.log(logIn)
      let socketInitRequest = {
        userID: process.env.XTS_USERID,
        publishFormat: 'JSON',
        broadcastMode: 'Full',
        token: logIn?.result?.token
      };
      xtsInteractiveWS.init(socketInitRequest);

      xtsInteractiveWS.onConnect((connectData) => {
        console.log("socket connection", connectData);
      });

      xtsInteractiveWS.onJoined((joinedData) => {
        console.log("joinedData", joinedData);
      });

      await placedOrderData();
      await save(logIn?.result?.userID, logIn?.result?.token, "Interactive")

    })();
  } catch (err) {
    console.log(err);
  }

}

const placedOrderData = async () => {
  xtsInteractiveWS.onOrder(async (orderData) => {
    let traderData = {};
    if (orderData.OrderStatus === "Rejected" || orderData.OrderStatus === "Filled") {

      let { ClientID, AppOrderID, ExchangeOrderID, ExchangeInstrumentID, OrderSide, OrderType, ProductType,
        TimeInForce, OrderPrice, OrderQuantity, OrderStatus, OrderAverageTradedPrice, OrderDisclosedQuantity,
        ExchangeTransactTime, LastUpdateDateTime, CancelRejectReason, ExchangeTransactTimeAPI } = orderData;

        const exchangeTime = ExchangeTransactTimeAPI;
        const date1 = exchangeTime.split(" ");
        const date2 = date1[0].split("-");
        const date3 = `${date2[2]}-${date2[1]}-${date2[0]} ${date1[1]}`
        const utcDate = new Date(date3).toUTCString();
  
        const retreiveObj = {
          order_id: AppOrderID, status: (OrderStatus === "Filled" ? "COMPLETE" : "REJECTED"), average_price: OrderAverageTradedPrice,
          quantity: OrderQuantity, product: ProductType, transaction_type: OrderSide,
          exchange_order_id: ExchangeOrderID, order_timestamp: LastUpdateDateTime, validity: TimeInForce,
          exchange_timestamp: ExchangeTransactTime, order_type: OrderType, price: OrderPrice,
          disclosed_quantity: OrderDisclosedQuantity, placed_by: ClientID, status_message: CancelRejectReason,
          instrument_token: ExchangeInstrumentID, exchange_update_timestamp: new Date(utcDate), guid: `${ExchangeOrderID}${AppOrderID}`,
          exchangeInstrumentToken: ExchangeInstrumentID
        };

        const saveOrder = await RetrieveOrder.updateOne({order_id: AppOrderID}, { $setOnInsert: retreiveObj }, { upsert: true });

      

      if(isRedisConnected && await client.exists(`liveOrderBackupKey`)){
        let data = await client.HGET('liveOrderBackupKey', `${(orderData?.AppOrderID).toString()}`);
        traderData = JSON.parse(data);
      } else{
        traderData = await RedisBackup.findOne({order_id: orderData?.AppOrderID})
      }

      const startTime = Date.now();
      await getPlacedOrderAndSave(orderData, traderData, startTime);

    }
  })
}

const placeOrder = async (obj, req, res) => {
  let isRedisConnected = getValue();
  let exchangeSegment;
  if (obj.exchange === "NFO") {
    exchangeSegment = 'NSEFO'
  }
  if (obj.exchange === "NSE") {
    exchangeSegment = 'NSECM'
  }
  const response = await xtsInteractiveAPI.placeOrder({
    exchangeSegment: exchangeSegment,
    exchangeInstrumentID: obj.exchangeInstrumentToken,
    productType: obj.Product,
    orderType: obj.OrderType,
    orderSide: obj.buyOrSell,
    timeInForce: obj.validity,
    disclosedQuantity: 0,
    orderQuantity: obj.Quantity,
    limitPrice: 0,
    stopPrice: 0,
    clientID: process.env.XTS_CLIENTID,
  });


  let backupObj = {
    order_id: response?.result?.AppOrderID,
    trader: req.body.trader,
    algoBoxId: req.body.algoBoxId,
    exchange: req.body.exchange,
    symbol: req.body.symbol,
    buyOrSell: req.body.buyOrSell,
    Quantity: req.body.Quantity,
    variety: req.body.variety,
    instrumentToken: req.body.instrumentToken,
    dontSendResp: req.body.dontSendResp,
    tradedBy: req.user._id
  }

  //check status, if status is 400 then send below error response.
  if (response?.result?.AppOrderID) {
    if(isRedisConnected){
      await client.HSET('liveOrderBackupKey', `${(response?.result?.AppOrderID).toString()}`, JSON.stringify(backupObj));
    }
    const redisBackup = await RedisBackup.create(backupObj);  
  } else{
    return res.status(500).json({message: "Something Went Wrong. Please Trade Again.", err: "Error"})
  }
  // return response;
}


/*
liveTradeKey

order_id ---> trader

we have order_id
trader fetched


1. redis map --> order_id - {tarder_id, .....}
2. a collection in which i save data of redis keys
3. in listener save retrieve order collection.
3. in orderData listner i fetch data from redis + database conditionally
4. if orderStatus is filled or rejected then i call getPlacedOrderAndSave function.
5. i have orderData in arguement, and req.body data from redis.
6. save data in db collection from orderData and redis.
7. expire redis key in 10 min and remove child key

if transaction is unsuccessful

1. Then i call this function again in catch, recursively
2. Keep timming wise recursively


*/

const getPlacedOrderAndSave = async (orderData, traderData, startTime) => {

  if (exchange === "NFO") {
    exchangeSegment = 2;
  }

  let { algoBoxId, exchange, symbol, buyOrSell, Quantity, variety, trader,
    instrumentToken, dontSendResp } = traderData

  let { ClientID, AppOrderID, ExchangeOrderID, ExchangeInstrumentID, OrderSide, OrderType, ProductType,
    TimeInForce, OrderPrice, OrderQuantity, OrderStatus, OrderAverageTradedPrice, OrderDisclosedQuantity,
    ExchangeTransactTime, LastUpdateDateTime, CancelRejectReason, ExchangeTransactTimeAPI } = orderData;


  if (Date.now() - startTime >= 10000) {
    let exchangeSegment;
    if (exchange === "NFO") {
      exchangeSegment = 'NSEFO'
    }
    if (exchange === "NSE") {
      exchangeSegment = 'NSECM'
    }
    if (OrderSide === "Buy") {
      buyOrSell = "SELL"
    } else {
      buyOrSell = "BUY"
    }

    const response = await xtsInteractiveAPI.placeOrder({
      exchangeSegment: exchangeSegment,
      exchangeInstrumentID: ExchangeInstrumentID,
      productType: ProductType,
      orderType: OrderType,
      orderSide: buyOrSell,
      timeInForce: TimeInForce,
      disclosedQuantity: 0,
      orderQuantity: Math.abs(OrderQuantity),
      limitPrice: 0,
      stopPrice: 0,
      clientID: process.env.XTS_CLIENTID,
    });

    io.emit(`sendResponse${trader.toString()}`, { message: "Order Rejected Unexpexctedly. Please Place Your Order Again.", status: "Error" })
    return; // Terminate recursion
  }



  let date = new Date();
  let todayDate = `${(date.getFullYear())}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
  todayDate = todayDate + "T23:59:59.999Z";
  const today = new Date(todayDate);
  const secondsRemaining = Math.round((today.getTime() - date.getTime()) / 1000);


  const brokerageDetailBuy = await BrokerageDetail.find({ transaction: "BUY", accountType: xtsAccountType });
  const brokerageDetailSell = await BrokerageDetail.find({ transaction: "SELL", accountType: xtsAccountType });
  const session = await mongoose.startSession();


  try {
    let status, transaction_type;
    session.startTransaction();
    if (OrderStatus === "Rejected") {
      status = "REJECTED";
    } else if (OrderStatus === "Filled") {
      status = "COMPLETE";
    }

    if (OrderSide == "Sell") {
      transaction_type = "SELL";
    } else if (OrderSide == "Buy") {
      transaction_type = "BUY";
    }

    if (!CancelRejectReason) {
      CancelRejectReason = "null"
    }
    if (!ExchangeTransactTime) {
      ExchangeTransactTime = "null"
    }
    if (!ExchangeOrderID) {
      ExchangeOrderID = "null"
    }
    if (!OrderAverageTradedPrice) {
      OrderAverageTradedPrice = 0;
    }

    // let responseMsg = status;
    // let responseErr = CancelRejectReason;

    if (transaction_type == "SELL") {
      OrderQuantity = 0 - OrderQuantity;
    }
    if (buyOrSell == "SELL") {
      Quantity = 0 - Quantity;
    }

    function buyBrokerage(totalAmount) {
      let brokerage = Number(brokerageDetailBuy[0].brokerageCharge);
      let exchangeCharge = totalAmount * (Number(brokerageDetailBuy[0].exchangeCharge) / 100);
      let gst = (brokerage + exchangeCharge) * (Number(brokerageDetailBuy[0].gst) / 100);
      let sebiCharges = totalAmount * (Number(brokerageDetailBuy[0].sebiCharge) / 100);
      let stampDuty = totalAmount * (Number(brokerageDetailBuy[0].stampDuty) / 100);
      let sst = totalAmount * (Number(brokerageDetailBuy[0].sst) / 100);
      let finalCharge = brokerage + exchangeCharge + gst + sebiCharges + stampDuty + sst;
      return finalCharge;
    }

    function sellBrokerage(totalAmount) {
      let brokerage = Number(brokerageDetailSell[0].brokerageCharge);
      let exchangeCharge = totalAmount * (Number(brokerageDetailSell[0].exchangeCharge) / 100);
      let gst = (brokerage + exchangeCharge) * (Number(brokerageDetailSell[0].gst) / 100);
      let sebiCharges = totalAmount * (Number(brokerageDetailSell[0].sebiCharge) / 100);
      let stampDuty = totalAmount * (Number(brokerageDetailSell[0].stampDuty) / 100);
      let sst = totalAmount * (Number(brokerageDetailSell[0].sst) / 100);
      let finalCharge = brokerage + exchangeCharge + gst + sebiCharges + stampDuty + sst;

      return finalCharge
    }

    let brokerageCompany;
    let brokerageUser;

    if (transaction_type === "BUY") {
      brokerageCompany = buyBrokerage(Math.abs(Number(OrderQuantity)) * OrderAverageTradedPrice);
    } else {
      brokerageCompany = sellBrokerage(Math.abs(Number(OrderQuantity)) * OrderAverageTradedPrice);
    }

    if (buyOrSell === "BUY") {
      brokerageUser = buyBrokerage(Math.abs(Number(Quantity)) * OrderAverageTradedPrice);
    } else {
      brokerageUser = sellBrokerage(Math.abs(Number(Quantity)) * OrderAverageTradedPrice);
    }

    const companyDoc = {
      disclosed_quantity: OrderDisclosedQuantity, price: OrderPrice, guid: `${ExchangeOrderID}${AppOrderID}`,
      status, createdBy: tradedBy, average_price: OrderAverageTradedPrice, Quantity: OrderQuantity,
      Product: ProductType, buyOrSell: transaction_type,
      variety, validity: TimeInForce, exchange, order_type: OrderType, symbol, placed_by: ClientID,
      algoBox: algoBoxId, order_id: AppOrderID, instrumentToken, brokerage: brokerageCompany,
      trader: trader, isRealTrade: true, amount: (Number(OrderQuantity) * OrderAverageTradedPrice), trade_time: LastUpdateDateTime,
      exchange_order_id: ExchangeOrderID, exchange_timestamp: ExchangeTransactTime, isMissed: false,
      exchangeInstrumentToken: ExchangeInstrumentID
    }

    const traderDoc = {
      disclosed_quantity: OrderDisclosedQuantity, price: OrderPrice, guid: `${ExchangeOrderID}${AppOrderID}`,
      status, createdBy: tradedBy, average_price: OrderAverageTradedPrice, Quantity: Quantity,
      Product: ProductType, buyOrSell: buyOrSell,
      variety, validity: TimeInForce, exchange, order_type: OrderType, symbol, placed_by: ClientID,
      order_id: AppOrderID, instrumentToken, brokerage: brokerageUser, trader: trader,
      isRealTrade: true, amount: (Number(Quantity) * OrderAverageTradedPrice), trade_time: LastUpdateDateTime,
      exchange_order_id: ExchangeOrderID, exchange_timestamp: ExchangeTransactTime, isMissed: false,
      exchangeInstrumentToken: ExchangeInstrumentID
    }

    const companyDocMock = {
      status, average_price: OrderAverageTradedPrice, Quantity: OrderQuantity,
      Product: ProductType, buyOrSell: transaction_type, variety, validity: TimeInForce, exchange, order_type: OrderType,
      symbol, placed_by: ClientID, algoBox: algoBoxId, order_id: AppOrderID,
      instrumentToken, brokerage: brokerageCompany, createdBy: tradedBy,
      trader: trader, isRealTrade: false, amount: (Number(OrderQuantity) * OrderAverageTradedPrice),
      trade_time: LastUpdateDateTime, exchangeInstrumentToken: ExchangeInstrumentID
    }

    const traderDocMock = {
      status, average_price: OrderAverageTradedPrice, Quantity: Quantity,
      Product: ProductType, buyOrSell, exchangeInstrumentToken: ExchangeInstrumentID,
      variety, validity: TimeInForce, exchange, order_type: OrderType, symbol, placed_by: ClientID,
      isRealTrade: false, order_id: AppOrderID, instrumentToken, brokerage: brokerageUser,
      createdBy: tradedBy, trader: trader, amount: (Number(Quantity) * OrderAverageTradedPrice), trade_time: LastUpdateDateTime,
    }

    const liveCompanyTrade = await InfinityLiveCompany.updateOne({ order_id: AppOrderID }, { $setOnInsert: companyDoc }, { upsert: true, session });
    const algoTraderLive = await InfinityLiveTrader.updateOne({ order_id: AppOrderID }, { $setOnInsert: traderDoc }, { upsert: true, session });
    const mockCompany = await InfinityMockCompany.updateOne({ order_id: AppOrderID }, { $setOnInsert: companyDocMock }, { upsert: true, session });
    const algoTrader = await InfinityMockTrader.updateOne({ order_id: AppOrderID }, { $setOnInsert: traderDocMock }, { upsert: true, session })

    let settingRedis;
    if (await client.exists(`${trader.toString()} overallpnl`)) {
      let pnl = await client.get(`${trader.toString()} overallpnl`)
      pnl = JSON.parse(pnl);
      console.log("redis pnl", pnl)
      const matchingElement = pnl.find((element) => (element._id.instrumentToken === algoTrader[0].instrumentToken && element._id.product === algoTrader[0].Product));
      // if instrument is same then just updating value
      if (matchingElement) {
        // Update the values of the matching element with the values of the first document
        matchingElement.amount += (algoTrader[0].amount * -1);
        matchingElement.brokerage += Number(algoTrader[0].brokerage);
        matchingElement.lastaverageprice = algoTrader[0].average_price;
        matchingElement.lots += Number(algoTrader[0].Quantity);

      } else {
        // Create a new element if instrument is not matching
        pnl.push({
          _id: {
            symbol: algoTrader[0].symbol,
            product: algoTrader[0].Product,
            instrumentToken: algoTrader[0].instrumentToken,
            exchangeInstrumentToken: algoTrader[0].exchangeInstrumentToken,
            exchange: algoTrader[0].exchange,
          },
          amount: (algoTrader[0].amount * -1),
          brokerage: Number(algoTrader[0].brokerage),
          lots: Number(algoTrader[0].Quantity),
          lastaverageprice: algoTrader[0].average_price,
        });
      }
      settingRedis = await client.set(`${trader.toString()} overallpnl`, JSON.stringify(pnl))
      console.log("in chek if 3", settingRedis)
      console.log(settingRedis)
    }

    await client.expire(`${trader.toString()} overallpnl`, secondsRemaining);
    // Commit the transaction

    // console.log("redis setting chaeck", settingRedis)
    if (settingRedis === "OK") {
      await session.commitTransaction();
      // isDataSaved = true;
    } else {
      throw new Error();
    }


    console.log("data saved in retreive order for", AppOrderID)

    if (!dontSendResp) {
      await client.expire(`liveOrderBackupKey`, 600);
      await client.HDEL('liveOrderBackupKey', AppOrderID.toString());
      io.emit("updatePnl", liveCompanyTrade)
      io.emit(`sendResponse${trader.toString()}`, { message: {Quantity: Quantity, symbol: symbol}, status: "complete" })
      // return res.status(201).json({ message: responseMsg, err: responseErr })
    }
    // }
  } catch (err) {
    await client.del(`${trader.toString()} overallpnl`)
    await session.abortTransaction();

    console.error('Transaction failed, documents not saved:', err, response);

    await getPlacedOrderAndSave(orderData, traderData, startTime);
    // return res.status(201).json({ message: "Order Rejected Unexpexctedly. Please Place Your Order Again.", err: "Error" })

  } finally {
    session.endSession();
  }

  return;
}

const positions = async () => {
  xtsInteractiveWS.onPosition((positionData) => {
    io.emit('positions', positionData);
    // console.log(positionData);
  });
}


module.exports = { interactiveLogin, placeOrder, positions };


// {
//   "type": "success",
//   "code": "s-user-0001",
//   "description": "Success order history",
//   "result": [
//     {
//       "LoginID": "SYMP1",
//       "ClientID": "SYMP1",
//       "AppOrderID": 648468730,
//       "OrderReferenceID": "",
//       "GeneratedBy": "TWSAPI",
//       "ExchangeOrderID": "1005239196374108",
//       "OrderCategoryType": "NORMAL",
//       "ExchangeSegment": "NSECM",
//       "ExchangeInstrumentID": 16921,
//       "OrderSide": "BUY",
//       "OrderType": "Limit",
//       "ProductType": "NRML",
//       "TimeInForce": "DAY",
//       "OrderPrice": 254.55,
//       "OrderQuantity": 15,
//       "OrderStopPrice": 0,
//       "OrderStatus": "New",
//       "OrderAverageTradedPrice": 250.4,
//       "LeavesQuantity": 1,
//       "CumulativeQuantity": 0,
//       "OrderDisclosedQuantity": 0,
//       "OrderGeneratedDateTime": "14-05-2021 11:17:29",
//       "ExchangeTransactTime": "14-05-2021 11:17:30",
//       "LastUpdateDateTime": "14-05-2021 11:17:29",
//       "OrderExpiryDate": "01-01-1980 00:00:00",
//       "CancelRejectReason": "",
//       "OrderUniqueIdentifier": "123abc",
//       "OrderLegStatus": "SingleOrderLeg",
//       "BoLegDetails": 0,
//       "IsSpread": false,
//       "BoEntryOrderId": "",
//       "MessageCode": 9004,
//       "MessageVersion": 4,
//       "TokenID": 0,
//       "ApplicationType": 0,
//       "SequenceNumber": 0
//     }
//   ]
// }