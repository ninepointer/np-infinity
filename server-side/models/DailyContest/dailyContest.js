const mongoose = require("mongoose");
const { Schema } = mongoose;

const contestSchema = new Schema({
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
        // required:true
    },
    description:{
        type: String,
        required: true,
    },
    contestType:{
        type: String,
        enum: ['Mock','Live'],
        required: true,
    },
    contestFor:{
        type: String,
        enum: ['StoxHero','College'],
        required: true,
    },
    collegeCode:{
        type: String,
        // required: true,
    },
    entryFee:{
        type:Number,
        default: 0
    },
    payoutPercentage:{
        type: Number,
        required: true,
    },
    portfolio:{
        type: Schema.Types.ObjectId,
        ref: 'user-portfolio',
    },
    college:{
        type: Schema.Types.ObjectId,
        ref: 'college',
    },
    interestedUsers:[{
        userId:{type:Schema.Types.ObjectId, ref: 'user-personal-detail'},
        registeredOn:{type:Date},
        status:{type:String, enum:['Joined','Exited']},
        exitDate:{type:Date},
    }],
    potentialParticipants:[
        {type:Schema.Types.ObjectId, ref: 'user-personal-detail'},
    ],
    contestSharedBy:[{
        userId:{type:Schema.Types.ObjectId, ref: 'user-personal-detail'},
        sharedAt:{type:Date}
    }],
    allowedUsers:[{
        userId:{type:Schema.Types.ObjectId, ref: 'user-personal-detail'},
        addedOn:{type:Date},
    }],
    purchaseIntent:[{
        userId:{type:Schema.Types.ObjectId, ref: 'user-personal-detail'},
        date:{type:Date},
    }],
    participants:[{
        userId:{type:Schema.Types.ObjectId, ref: 'user-personal-detail'},
        participatedOn:{type:Date},
        payout: {type: Number}
    }],
    maxParticipants:{
        type:Number,
        required: true
    },
    contestStatus:{
        type:String,
        required: true,
        enum: ['Active','Draft','Cancelled', 'Completed']
    },
    payoutStatus:{
        type:String,
        // required: true,
        enum: ['Completed','Not started','Processing']
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
    contestExpiry:{
        type:String,
        required: true,
        enum: ["Day", "Monthly", "Weekly"]
    },
    isNifty:{
        type:Boolean,
        required: true
    },
    isBankNifty:{
        type:Boolean,
        required: true
    },
    isFinNifty:{
        type:Boolean,
        required: true
    },
    isAllIndex:{
        type:Boolean,
        required: true
    },

})

const contestData = mongoose.model("daily-contest", contestSchema);
module.exports = contestData;