const mongoose = require("mongoose");
const { Schema } = mongoose;

const contestSchema = new mongoose.Schema({
    contestName:{
        type: String,
        required: true
    },
    contestStartTime:{
        type: Date,
        required: true
    },
    contestEndTime:{
        type:Date,
        required: true
    },
    contestOn:{
        type:String,
        required:true
    },
    description:{
        type: String,
        required: true,
    },
    contestType:{
        enum: ['Mock','Live'],
        type: required,
    },
    entryFee:{
        amount:Number,
        currency:{type:String,enum:['INR']}
    },
    payoutPercentage:{
        type: Number,
        required: true,
    },
    portfolio:{
        type: Schema.Types.ObjectId,
        ref: 'user-portfolio',
    },
    registeredUsers:[{
        userId:{type:Schema.Types.ObjectId, ref: 'user-personal-detail'},
        registeredOn:{type:Date},
        status:{type:String, enum:['Joined','Exited']},
        exitDate:{type:Date},
    }],
    allowedUsers:[{
        userId:{type:Schema.Types.ObjectId, ref: 'user-personal-detail'},
        addedOn:{type:Date},
    }],
    maxParticipants:{
        type:Number,
        required: true
    },
    contestStatus:{
        type:String,
        required: true,
        enum: ['Live','Draft','Cancelled']
    },
    payoutStatus:{
        type:String,
        required: true,
        enum: ['Live','Draft','Cancelled']
    },
    createdOn:{
        type: Date,
        required : true,
        default: ()=>new Date(),
    },
    lastModifiedOn:{
        type: Date,
        required : true,
        default: ()=>new Date(),
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: 'user-personal-detail',
    },
    lastModifiedBy:{
        type: Schema.Types.ObjectId,
        ref: 'user-personal-detail',
    },
})

const contestData = mongoose.model("daily-contest", contestSchema);
module.exports = contestData;