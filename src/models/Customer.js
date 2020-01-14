'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Customer', CustomerSchema);