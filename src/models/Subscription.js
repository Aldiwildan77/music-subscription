'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const SubscriptionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);