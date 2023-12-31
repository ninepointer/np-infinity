const mongoose = require("mongoose");
const uniqueId = require('uniqid')
const retireivSchema = new mongoose.Schema({
    order_id:{
        type: String,
        required: true,
        unique: true
    },
    status:{
        type: String,
        required: true
    },
    average_price:{
        type: Number,
        // required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    product:{
        type: String,
        required: true
    },
    transaction_type:{
        type: String,
        required: true
    },
    orderUniqueIdentifier:{
        type: String,
    },
    exchange_order_id:{
        type: String,
    },
    order_timestamp:{
        type: Date,
        required: true
    },
    variety:{
        type: String,
        // required: true
    },
    validity:{
        type: String,
        required: true
    },
    exchange:{
        type: String,
        required: true,
        default: "NFO"
    },
    exchange_timestamp:{
        type: Date,
    },
    order_type:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    filled_quantity:{
        type: Number,
        // required: true
    },
    pending_quantity:{
        type: Number,
        // required: true
    },
    cancelled_quantity:{
        type: Number,
        // required: true
    },
    guid:{
        type: String,
        default: uniqueId()
        // required: true,
        // unique: true
    },
    market_protection:{
        type: Number,
        // required: true
    },
    disclosed_quantity:{
        type: Number,
        // required: true
    },
    tradingsymbol:{
        type: String,
        // required: true
    },
    placed_by:{
        type: String,
        required: true
    },
    account_id:{
        type: String,
        // required: true
    },
    status_message:{
        type: String,
    },
    status_message_raw:{
        type: String,
    },
    instrument_token:{
        type: Number,
    },
    exchange_update_timestamp:{
        type: Date,
    }
})

const retireivDetail = mongoose.model("retreive-orders", retireivSchema);
module.exports = retireivDetail;





