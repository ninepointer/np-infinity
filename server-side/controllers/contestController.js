const Contest = require('../models/Contest/contestSchema');
const Payment = require('../models/Payment/payment');
const userPersonalDetail = require('../models/User/userDetailSchema');
const User = require('../models/User/userDetailSchema');


const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach((el) => {
      if (allowedFields.includes(el) && obj[el] !== null && obj[el] !== undefined && obj[el] !== '') {
        newObj[el] = obj[el];
      }
    });
    return newObj;
};

exports.createContest = async(req, res, next)=>{
    console.log(req.body)
    const{contestName, contestStartDate, contestEndDate, entryOpeningDate, entryClosingDate, 
        stockType, contestOn, contestRule, rewards, entryFee, instruments, maxParticipants, 
        minParticipants,status, contestMargin
    } = req.body;
    if(await Contest.findOne({contestName, status: "Live", contestOn })) return res.status(400).json({message:'This contest already exists.'});

    const contest = await Contest.create({contestName: contestName.trim(), contestStartDate, contestEndDate, entryOpeningDate, entryClosingDate, 
        stockType, contestOn, contestRule, rewards, entryFee, instruments, maxParticipants, 
        minParticipants, createdBy: req.user._id, lastModifiedBy: req.user._id,status, contestMargin});
    
    res.status(201).json({message: 'Contest successfully created.', data:contest});
}

exports.getContests = async(req, res, next)=>{
    console.log("inside getContests")
    try{
        const contests = await Contest.find({status: "Live"}).populate('contestRule','ruleName');
        
        res.status(201).json({status: 'success', data: contests, results: contests.length});    
    }catch(e){
        console.log(e);
        res.status(500).json({status: 'error', message: 'Something went wrong'});
    }
};

exports.getActiveContests = async(req, res, next)=>{
    console.log("inside ActiveContest")
    try {
        const contests = await Contest.find({ contestEndDate: { $gte: new Date() }, status: {$ne: 'Cancelled'}, entryClosingDate:{$gte: new Date()} }).populate('contestRule','ruleName'); 
    
        res.status(201).json({status: 'success', data: contests, results: contests.length}); 
        
    } catch (e) {
        console.log(e);
        res.status(500).json({status: 'error', message: 'Something went wrong'});
    }
       
        
};

exports.editContest = async(req, res, next) => {
    const id = req.params.id;

    // console.log("id is ,", id)
    const contest = await Contest.findById(id);

    const filteredBody = filterObj(req.body, "contestName", "contestStartDate", "contestEndDate", "entryOpeningDate", "entryClosingDate", 
        "stockType", "contestOn", "contestRule", "entryFee", "instruments", "maxParticipants", 
        "minParticipants","status");
    if(req.body.rewards)filteredBody.rewards=[...contest.rewards,
        {rankStart:req.body.rewards.rankStart,
            rankEnd:req.body.rewards.rankEnd,
            reward:req.body.rewards.reward,
            currency:req.body.rewards.currency}]
    filteredBody.lastModifiedBy = req.user._id;    

    await Contest.findByIdAndUpdate(id, filteredBody);

    res.status(200).json({message: 'Successfully edited contest.'});
}

exports.updateStatus = async(req, res, next) => {
    const status = req.body.status;
    const id = req.params.id;

    // console.log("id is ,", id)

    try{
        const contest = await Contest.findOneAndUpdate({_id : id}, {
            $set:{ 
                status: status
            }
        })
        res.status(200).json({message: 'Successfully edited contest.'});
    } catch (e){
        res.status(500).json({error:"Failed to edit data"});
    }
}

exports.joinContest = async(req, res, next) => {
    const userId = req.user._id;
    // const employeeid = req.user.employeeid;
    const contestId = req.params.id;
    const {paymentId, portfolioId} = req.body;
    // console.log(req.body, contestId)
    try{
        const contest = await Contest.findById(contestId);
        if(!contest){
            // console.log("in 1st")
            return res.status(404).json({
                status: 'error',
                message: 'No such contest exixts.'
            });
        }
        
        //Check if the contest end date hasn't passed.
        if(Date.now()>Date.parse(contest.contestEndDate)){
            // console.log("in 2st")
            return res.status(400).json({
                status: 'error',
                message: 'The contest has expired. Join an active contest.'
            });
        }

        //check entry date open or not
        if(Date.now()<=Date.parse(contest.entryOpeningDate)){
            // console.log("in 2st")
            return res.status(400).json({
                status: 'error',
                message: 'Entry for this contest is not started yet. Please wait.'
            });
        }

        // check if entry closed for the contest
        if(Date.now()>Date.parse(contest.entryClosingDate)){
            // console.log("in 2st")
            return res.status(400).json({
                status: 'error',
                message: 'Entry is closed for this contest. Please join another contest.'
            });
        }

        //Check if the contest has reached maxParticipants
        if(contest.participants.length == contest.maxParticipants){
            // console.log("in 3st")
            return res.status(400).json({
                status: 'error',
                message: 'The contest is full. Join another contest'
            });
        }

        //Check if the user has already joined the room
        if (contest.participants.some(elem => elem.userId == userId)) {
            // console.log("in 4st")
            return res.status(400).json({
              status: 'error',
              message: 'You have already registered for this contest.'
            });
          }

        // if(!paymentId){
        //     return res.status(401).json({
        //         status: 'error',
        //         message: 'Transcation not complete. Please complete your transaction'
        //       });
        // }
        // //Check if the paymentId is valid
        // const payment = await Payment.findOne({paymentId});
        // if(!payment){
        //     return res.status(401).json({
        //         status: 'error',
        //         message: 'Transcation not complete. Please complete your transaction'
        //       });
        // }
        
        // //Check if the payment status is successful
        // if(payment.paymentStatus != 'succeeded'){
        //     return res.status(401).json({
        //         status: 'error',
        //         message: 'Transcation not complete. Please complete your transaction'
        //       });
        // }
        
        // console.log("in 6st", {userId, registeredOn: Date.now(), paymentId, portfolioId: portfolioId, status: "Joined"})
        contest.participants.push({userId, registeredOn: Date.now(), paymentId, portfolioId: portfolioId, status: "Joined"});
        await contest.save({validateBeforeSave: false});
        const user = await User.findById(userId);
        user.contests.push(contest._id);
    
        await user.save({validateBeforeSave: false});

        res.status(200).json({status:'success', message:'Joined contest.'});


    }catch(e){
        console.log(e);
        res.status(500).json({status: 'error', message: 'Something went wrong'});
    }

}

exports.getContest = async (req,res,next) => {
    // console.log("inside getContest")
    const {id} = req.params;
    try {
        const contest = await Contest.findOne({
          _id: id,
          status: {$ne: "Cancelled"}
        })
        .populate('contestRule', { ruleName: 1, contestRules: 1 })
        .populate('participants.userId', 'first_name')
        .populate('participants.portfolioId', 'portfolioName')
        .populate('lastModifiedBy', { first_name: 1, last_name: 1 })
        .populate('createdBy', { first_name: 1, last_name: 1 });
        console.log("contest", contest)
        if (!contest) {
            // console.log("in if of contest")
          return res.status(200).json({ status: 'success', message: 'Contest not found.', data: {} });
        }
        return res.status(200).json({ status: 'success', message: 'Successful', data: contest });
      } catch (e) {
        console.log(e);
        res.status(500).json({ status: 'error', message: 'Something went wrong' });
      }
}

exports.myContests = async(req,res,next) => {
    const userId = req.user._id;
    try{
        const myContests = await Contest.find({"participants.userId": userId, contestEndDate: {$gte: new Date()}});

        if(!myContests){
            return res.status(404).json({status:'error', message: 'No contests found'});
        }

        res.status(200).json({status: 'success', data: myContests, results: myContests.length});

    }catch(e){
        console.log(e);
        res.status(500).json({status: 'error', message: 'Something went wrong'});
    }
}

exports.contestHistory = async(req, res, next) => {
    const userId = req.user._id;
    try{
       const myContestHistory = await Contest.find({"participants.userId": userId, contestEndDate: {$lt: new Date()}});
       if(!myContestHistory){
           return res.status(404).json({status:'error', message: 'No contests found'});
       }
   
       res.status(200).json({status: 'success', data: myContestHistory, results: myContestHistory.length});
   
    }catch(e){
       console.log(e);
       res.status(500).json({status: 'error', message: 'Something went wrong'});
     } 
}

exports.myPortfolio = async(req,res,next) => {
    const userId = req.user._id;
    try{
        const myContests = await Contest.find({"participants.userId": userId});

        if(!myContests){
            return res.status(404).json({status:'error', message: 'No contests found'});
        }

        res.status(200).json({status: 'success', data: myContests, results: myContests.length});

    }catch(e){
        console.log(e);
        res.status(500).json({status: 'error', message: 'Something went wrong'});
    }
}

exports.getTimeForSync = async(req,res,next) => {
    try{
        let now = new Date();
        let minus5Hours30Minutes = 5.5 * 60 * 60 * 1000;
        let dateTimeMinus5Hours30Minutes = new Date(now);
        res.status(200).json({status: 'success', data: dateTimeMinus5Hours30Minutes});

    }catch(e){
        console.log(e);
        res.status(500).json({status: 'error', message: 'Something went wrong'});
    }
}

exports.exitContest = async(req,res,next)=>{
    const userId = req.user._id;
    const {id} = req.params;
    try{
        const user = await userPersonalDetail.findById(userId);
        const contest = await Contest.findById(id);
        const index = contest.participants.findIndex(obj => obj.userId == userId);
        const indexToRemove = user.contests.indexOf(id);
        if (indexToRemove !== -1) {
            contest.participants.splice(index, 1);
          }
        await contest.save({validateBeforeSave: false});
        
        
        if (indexToRemove !== -1) {
            user.contests.splice(indexToRemove, 1);
          }
        await user.save({validateBeforeSave: false});
        res.status(200).json({status:'success', message:'Exited from the contest'});
    }catch(e){
        console.log(e);
        return res.status(500).json({status:'error', message:'Something went wrong'});
    }

}

