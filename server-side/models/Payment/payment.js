const mongoose = require("mongoose");
const { Schema } = mongoose;

const Payment = new mongoose.Schema({
    transactionId: {
        type: String,
        // required: true,
    },
    paymentTime: {
        type: Date,
        required: true,
    },
    currency: {
        type: String,
        required: true,
        enum: ['INR', 'Other']
    },
    amount: {
        type: Number,
        required: true,
    },
    paymentBy: {
        type: Schema.Types.ObjectId,
        ref: 'user-personal-detail'
    },
    paymentFor: {
        type: String,
    },
    paymentMode: {
        type: String,
        // required: true,
        enum: ['UPI', 'Account Transfer', 'Other']
    },
    paymentStatus:{
        type: String,
        enum:['succeeded', 'failed', 'processing', 'initiated', 'started', 'expired']
    },
    actions:[{
        actionTitle: String,
        actionDate: Date,
        actionBy: {
            type:Schema.Types.ObjectId,
            ref:'user-personal-detail'
        }
    }],
    merchantTransactionId: String,
    createdOn: {
        type: Date,
        default: function() {
          return Date.now();
        }
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: 'user-personal-detail'
    },
    modifiedOn: {
        type: Date,
        default: function() {
            return Date.now();
        }
    },
    modifiedBy:{
        type: Schema.Types.ObjectId,
        ref: 'user-personal-detail'
    },
    gatewayResponse: {}
});
const payment = mongoose.model('payment', Payment);
module.exports = payment;