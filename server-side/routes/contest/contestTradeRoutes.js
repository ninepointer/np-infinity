const express = require("express");
const Authenticate = require('../../authentication/authentication');
const router = express.Router({mergeParams: true});
const {getHistoryRanks, newTrade, getUserTrades, currentUser, getContestRank, getMyContestRank, getContestPnl, getTradeByPagination, countTrades, getRedisLeaderBoard, getRedisMyRank, getHistoryMyRank} = require('../../controllers/contestTradeController');
const authoizeTrade = require('../../controllers/authoriseTrade');
const {client, getValue} = require('../../marketData/redisClient');

router.route('/myTrades').get(Authenticate, currentUser , getUserTrades);
router.route('/pnl').get(Authenticate, getContestPnl);
router.route('/countTrades').get(Authenticate, countTrades);
router.route('/tradesByPagination').get(Authenticate, getTradeByPagination);
router.route('/rank').get(getContestRank);
// router.route('/myrank').get(Authenticate, getMyContestRank);

router.route('/leaderboard').get( getRedisLeaderBoard);
router.route('/historyLeaderboard').get( getHistoryRanks)
router.route('/historyMyrank').get(Authenticate, getHistoryMyRank);

router.route('/myrank').get(Authenticate, getRedisMyRank);
router.route('/redtest').get( async(req,res,next)=>{
    try{
        console.log('we\'re testing');
        for(let i = 0; i<5; i++){
            await client.ZADD('test2', {
                score: 23+i,
                value: `user${i}`
            })
        }
    }catch(e){
        console.log(e);
    }
});

router.route('/').post(Authenticate, authoizeTrade.contestFundCheck, newTrade);
// router.route('/:userId').get(Authenticate, getUserTrades);

// router.route('/').post(Authenticate, newTrade);
// // router.route('/').get(Authenticate, getUserTrades);




module.exports = router;
// portfolio id se portfolio get krna
// userid se perticular user get krna
// then us user ka portfolio get krna

// step 2

// portfolio id and userid se us portfolio ka pnl get krna
