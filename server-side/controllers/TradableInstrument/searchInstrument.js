// const axios = require('axios');
// const zlib = require('zlib');
// const csv = require('csv-parser');
const TradableInstrument = require("../../models/Instruments/tradableInstrumentsSchema")
// const getKiteCred = require('../../marketData/getKiteCred');
const { xtsAccountType, zerodhaAccountType } = require("../../constant");
//TODO toggle between 
const Setting = require("../../models/settings/setting");
const Role = require("../../models/User/everyoneRoleSchema");
const {infinityTrader} = require("../../constant")
const {client, getValue} = require("../../marketData/redisClient");


exports.search = async (searchString, res, req) => {
  let isRedisConnected = getValue();
  const setting  = await Setting.find().select('toggle');
  const page = parseInt(req.query.page);
  const size = parseInt(req.query.size);
  let {isNifty, isBankNifty, isFinNifty, dailyContest} = req.query;
  // console.log(isNifty, isBankNifty, isFinNifty)

  let query = [];
  if(isNifty){
    query.push({ $and: [{ isNifty: true }, { name: 'NIFTY50' }] })
  }
  if(isBankNifty){
    query.push({ $and: [{ isBankNifty: true }, { name: 'BANKNIFTY' }] })
  }
  if(isFinNifty){
    query.push({ $and: [{ isFinNifty: true }, { name: 'FINNIFTY' }] })
  }
  // let isNifty, isBankNifty, isFinNifty;
  const {role} = req.user;
  let roleObj;

  if(isRedisConnected && await client.exists('role')){
    roleObj = await client.get('role');
    roleObj = JSON.parse(roleObj)
    let roleArr = roleObj.filter((elem)=>{
      return (elem._id).toString() == role.toString();
    })
  
    roleObj = roleArr[0];
  } else{
      roleObj = await Role.find()
      await client.set('role', JSON.stringify(roleObj));
      let roleArr = roleObj.filter((elem)=>{
        return (elem._id).toString() == role.toString();
      })
    
      roleObj = roleArr[0];
  }


  try {
    let date = new Date();
    let todayDate = `${(date.getFullYear())}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    date.setDate(date.getDate() + 7);

    let fromLessThen = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    let data ;
    // console.log(roleObj.roleName , infinityTrader, searchString)

    if(roleObj.roleName === infinityTrader){
      data = await TradableInstrument.find({
        $and: [
          {
            $or: [
              { tradingsymbol: { $regex: searchString, $options: 'i' } },
              { name: { $regex: searchString, $options: 'i' } },
              { exchange: { $regex: searchString, $options: 'i' } },
              { expiry: { $regex: searchString, $options: 'i' } },
            ]
          },
          {
            status: 'Active',
            infinityVisibility: true,
            // tradingsymbol: { $regex: /^(NIFTY|BANK)/i }
          },
          {
            expiry: {
              $gte: todayDate, // expiry is greater than or equal to today's date
              $lt: fromLessThen
              // $gt: new Date(today.getFullYear(), today.getMonth(), today.getDate()) // expiry is greater than today's date
            }
          }
        ]
      })
        .sort({ expiry: 1 })
        .limit(size)
        .exec();

        // console.log("data", data)
    } else{

      if(dailyContest){
        data = await TradableInstrument.find({
          $and: [
            {
              $or: [
                { tradingsymbol: { $regex: searchString, $options: 'i' } },
                { name: { $regex: searchString, $options: 'i' } },
                { exchange: { $regex: searchString, $options: 'i' } },
                { expiry: { $regex: searchString, $options: 'i' } },
              ]
            },
            {
              status: 'Active'
            },
            {
              // accountType: accountType
            },
            {
              expiry: {
                $gte: todayDate, // expiry is greater than or equal to today's date
                $lt: fromLessThen
              }
            },
            {
              $or: query
            }
          ]
        })
          .sort({ expiry: 1 })
          .limit(size)
          .exec();
      } else{
        data = await TradableInstrument.find({
          $and: [
            {
              $or: [
                { tradingsymbol: { $regex: searchString, $options: 'i' } },
                { name: { $regex: searchString, $options: 'i' } },
                { exchange: { $regex: searchString, $options: 'i' } },
                { expiry: { $regex: searchString, $options: 'i' } },
              ]
            },
            {
              status: 'Active'
            },
            {
              tradingsymbol: { $regex: /^(NIFTY|BANK)/i }
            },
            {
              expiry: {
                $gte: todayDate, // expiry is greater than or equal to today's date
                $lt: fromLessThen
              }
            },
          ]
        })
          .sort({ expiry: 1 })
          .limit(size)
          .exec();
      }

    }


    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

}



