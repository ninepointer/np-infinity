const express = require("express");
const router = express.Router({mergeParams: true});
const {changePassword, editUser} = require('../../controllers/userController');

const Authenticate = require('../../authentication/authentication');
const restrictTo = require('../../authentication/authorization');

const setCurrentUser = async(req,res,next) => {
    req.params.id = req.user._id;
    next();
} 


router.route('/').patch(Authenticate, restrictTo('Admin', 'SuperAdmin'), editUser);
router.route('/changepassword/me').patch(Authenticate, setCurrentUser, changePassword);
router.route('/changepassword/:id').patch(Authenticate, restrictTo('Admin', 'SuperAdmin'), changePassword);


module.exports = router;