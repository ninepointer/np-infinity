// const User = require("../../models/User/userDetailSchema");
// const Subscription = require("../../models/TenXSubscription/TenXSubscriptionSchema");
// const InfinityTrader = require("../../models/mock-trade/infinityTrader");
const TenxTrader = require("../../models/mock-trade/tenXTraderSchema");
const takeAutoTenxTrade = require("./autoTrade");
// const { Kafka } = require('kafkajs')

// const kafka = new Kafka({
//   clientId: 'my-app',
//   brokers: ['b-1.democluster1.bagf1q.c3.kafka.ap-south-1.amazonaws.com:9092', 
//             'b-2.democluster1.bagf1q.c3.kafka.ap-south-1.amazonaws.com:9092', 
//             'b-3.democluster1.bagf1q.c3.kafka.ap-south-1.amazonaws.com:9092'],  // replace with your brokers
// })

const tenx = async()=>{
    let tradeArr = [];
    const data = await TenxTrader.aggregate(
        [
            {
              $match:
                {
                  status: "COMPLETE",
                },
            },
            {
              $group:
                {
                  _id: {
                    userId: "$trader",
                    subscriptionId: "$subscriptionId",
                    exchange: "$exchange",
                    symbol: "$symbol",
                    instrumentToken: "$instrumentToken",
                    variety: "$variety",
                    validity: "$validity",
                    order_type: "$order_type",
                    Product: "$Product",
                  },
                  runningLots: {
                    $sum: "$Quantity",
                  },
                  takeTradeQuantity: {
                    $sum: {
                      $multiply: ["$Quantity", -1],
                    },
                  },
                },
            },
            {
              $project:
                {
                  _id: 0,
                  userId: "$_id.userId",
                  subscriptionId: "$_id.subscriptionId",
                  exchange: "$_id.exchange",
                  symbol: "$_id.symbol",
                  instrumentToken: "$_id.instrumentToken",
                  variety: "$_id.variety",
                  validity: "$_id.validity",
                  order_type: "$_id.order_type",
                  Product: "$_id.Product",
                  runningLots: "$runningLots",
                  takeTradeQuantity: "$takeTradeQuantity",
                },
            },
          ]
    );
    
    for(let i = 0; i < data.length; i++){
      let date = new Date();
      let transaction_type = data[i].runningLots > 0 ? "BUY" : "SELL";
      let quantity = Math.abs(data[i].runningLots);

      let buyOrSell
      if(transaction_type === "BUY"){
          buyOrSell = "SELL";
      } else{
          buyOrSell = "BUY";
      }

      // console.log("this is data", data[i])
      // realSymbol: data[i]._id.symbol,
      let Obj = {};
      Obj.symbol = data[i].symbol ;
      Obj.Product = data[i].Product ;
      Obj.instrumentToken = data[i].instrumentToken ;
      Obj.real_instrument_token = data[i].instrumentToken ;
      Obj.exchange = data[i].exchange ;
      Obj.validity = data[i].validity ;
      Obj.OrderType = data[i].order_type ;
      Obj.variety = data[i].variety ;
      Obj.buyOrSell = buyOrSell ;
      Obj.trader = data[i].userId ;
      Obj.subscriptionId = data[i].subscriptionId ;
      Obj.autoTrade = true ;
      Obj.order_id = `${date.getFullYear()-2000}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}${Math.floor(100000000+ Math.random() * 900000000)}`
      Obj.dontSendResp = (i !== (data.length-1));

      await recursiveFunction(quantity)

      async function recursiveFunction(quantity) {
          if(quantity == 0){
              return;
          }
          else if (quantity < 1800) {
              Obj.Quantity = quantity;
              // tradeArr.push({value: JSON.stringify(Obj)});
              await takeAutoTenxTrade(Obj);
              return;
          } else {
              Obj.Quantity = 1800;
              // tradeArr.push({value: JSON.stringify(Obj)});
              await takeAutoTenxTrade(Obj);
              return recursiveFunction(quantity - 1800);
          }
      }
    }


    // tradeArr.push({name: "vijay"})
    // return tradeArr;
    
}

module.exports = tenx;


// const { Kafka } = require('kafkajs')

// const kafka = new Kafka({
//   clientId: 'my-app',
//   brokers: ['b-1.democluster1.bagf1q.c3.kafka.ap-south-1.amazonaws.com:9092', 
//             'b-2.democluster1.bagf1q.c3.kafka.ap-south-1.amazonaws.com:9092', 
//             'b-3.democluster1.bagf1q.c3.kafka.ap-south-1.amazonaws.com:9092'],  // replace with your brokers
// })

// const createTopic = async (topicName) => {
//     const admin = kafka.admin()
//     await admin.connect()
  
//     await admin.createTopics({
//       topics: [{
//         topic: topicName,
//         numPartitions: 10,
//         replicationFactor: 3
//       }],
//     })
  
//     await admin.disconnect()
// }
  
//   createTopic('my-topic');
// (async () => {
//   const producer = kafka.producer()
  
//   await producer.connect()
//   await producer.send({
//     topic: 'my-topic',
//     messages: [
//       { value: 'Hello KafkaJS user!' },
//       { value: 'Hello vijay user!' },
//       { value: 'Hello jai user!' },
//       { value: 'Hello jvv user!' },
//       { value: 'Hello vjji user!' },
//     ],
//   })

//   await producer.disconnect()


// })().catch(console.error)


// (async () => {
// const consumer = kafka.consumer({ groupId: 'my-group' })

// await consumer.connect()
// await consumer.subscribe({ topic: 'my-topic', fromBeginning: true })

// await consumer.run({
//   eachMessage: async ({ topic, partition, message }) => {
//     console.log(message)
//   },
// })
// })().catch(console.error)