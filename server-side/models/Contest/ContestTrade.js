// import mongoose, { Schema } from "mongoose";
const mongoose = require("mongoose");
const { Schema } = mongoose;

const ContestTrade = new mongoose.Schema({
    order_id:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    status_message:{
        type: String,
        // required: true
    },
    // createdBy:{
    //     type: String,
    //     required : true
    // },
    average_price:{
        type: Number,
        // required: true
    },
    Quantity:{
        type: String,
        required: true
    },
    Product:{
        type: String,
        required: true
    },
    buyOrSell:{
        type: String,
        required: true
    },
    variety:{
        type: String,
        // required: true
    },
    validity:{
        type: String,
        // required: true
    },
    exchange:{
        type: String,
        required: true
    },
    order_type:{
        type: String,
        required: true
    },
    symbol:{
        type: String,
        required: true
    },
    placed_by:{
        type: String,
        required: true
    },
    brokerage:{
        type: String,        
    },
    instrumentToken:{
        type: Number,
        required: true        
    },
    // tradeBy:{
    //     type: Schema.Types.ObjectId,
    //     ref: 'user-personal-detail',       
    // },
    amount:{
        type: Number,
        // required: true        
    },
    trade_time:{
        type: Date,
        // required: true        
    },
    // employeeid:{
    //     type: String,
    //     // required: true        
    // },
    trader:{
        type: Schema.Types.ObjectId,
        ref: 'user-personal-detail',
        // required : true
    },
    contestId:{
        type: Schema.Types.ObjectId,
        ref: 'contest',
        // required : true
    },
    portfolioId:{
        type: Schema.Types.ObjectId,
        ref: 'user-portfolio',
        // required : true
    },
    createdOn:{
        type: Date,
        default: ()=>new Date()
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: 'user-personal-detail',
        required: true
    }
})

const contestTrade = mongoose.model("contestTrade", ContestTrade);
module.exports = contestTrade;


