const express = require("express");
const Authenticate = require('../../authentication/authentication');
const router = express.Router({mergeParams: true});
const contestController = require('../../controllers/dailyContestController');

router.post('/contest', Authenticate, contestController.createContest);
router.put('/contest/:id', contestController.editContest);
router.delete('/contest/:id', contestController.deleteContest);
router.put('/contest/:id/register/:userId', contestController.registerUserToContest);
router.put('/contest/:id/allow/:userId', contestController.addAllowedUser);

// Routes for getting contests
router.get('/contests', contestController.getAllContests);
router.get('/contests/upcoming', contestController.getUpcomingContests);
router.get('/contests/completed', contestController.getCompletedContests);
router.get('/contests/draft', contestController.getDraftContests);



module.exports=router;