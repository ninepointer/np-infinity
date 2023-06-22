const express = require("express");
const Authenticate = require('../../authentication/authentication');
const router = express.Router({mergeParams: true});
const contestController = require('../../controllers/dailyContestController');

router.post('/contest', Authenticate, contestController.createContest);
router.get('/contestusers', contestController.getUsers);
router.get('/contest/:id', contestController.getContest);

router.put('/contest/:id', contestController.editContest);
router.delete('/contest/:id', contestController.deleteContest);
router.put('/contest/:id/participate', Authenticate, contestController.registerUserToContest);
router.put('/contest/:id/register',Authenticate, contestController.registerUserToContest);
router.put('/contest/:id/allow/:userId', contestController.addAllowedUser);
router.put('/contest/:id/remove/:userId', contestController.removeAllowedUser);

// Routes for getting contests
router.get('/contests', contestController.getAllContests);
router.get('/contests/upcoming', contestController.getUpcomingContests);
router.get('/contests/completed', contestController.getCompletedContests);
router.get('/contests/draft', contestController.getDraftContests);



module.exports=router;