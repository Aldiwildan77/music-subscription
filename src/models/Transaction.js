'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    customer_id: {
        type: String,
        required: true
    },
    subscription_id: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Transaction', TransactionSchema);