const express = require("express");
const Authenticate = require('../../authentication/authentication');
const router = express.Router({mergeParams: true});
const {createBatch, getBatch, getBatches,getInactiveBatches,getCompletedBatches, editBatch, approveUser, deleteBatch, getActiveBatches} = require('../../controllers/career/internBatch');


router.route('/').post(Authenticate, createBatch).get(getBatches);
router.route('/active').get(getActiveBatches);
router.route('/inactive').get(getInactiveBatches);
router.route('/completed').get(getCompletedBatches);
router.route('/:id').patch(Authenticate, editBatch).delete(deleteBatch).get(getBatch)
router.route('/:id/approve').patch(Authenticate, approveUser)


module.exports = router;