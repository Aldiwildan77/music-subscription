'use strict';

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.register = (req, res) => {
    var user = new Customer(req.body);
    user.save((err, model) => {
        if (err) {
            res.send({
                message: "failed to create user"
            });
        } else {
            res.json({
                message: "success to create user",
                result: model
            });
        }
    });
};


exports.get_user_info = (req, res) => {
    Customer.findById(req.params.id, (err, model) => {
        if (err) {
            res.send({
                message: "user not found"
            });
        } else {
            res.json({
                message: "success",
                result: model
            });
        }
    });
};


exports.top_up = (req, res) => {
    Customer.findById(req.body.customer_id, (err, data) => {
        if (err || data == null) {
            res.send({
                message: "field not valid"
            });
        } else {
            data.balance += parseInt(req.body.amount);
            data.save((err, dataUpdated) => {
                if (err) {
                    res.send({
                        message: "field not valid"
                    });
                } else {
                    res.json({
                        message: "success top up",
                        result: dataUpdated
                    })
                }
            });
        }
    });
};


exports.debit = (req, res) => {
    Customer.findById(req.body.id, (err, data) => {
        if (err || data == null) {
            res.send({
                message: "field not valid"
            });
        } else if (req.body.amount > data.balance) {
            res.send({
                message: "balance is not enough"
            });
        } else {
            data.balance -= parseInt(req.body.amount);
            data.save((err, dataUpdated) => {
                if (err) {
                    res.send({
                        message: "field not valid"
                    });
                } else {
                    res.json({
                        message: "debit success",
                        result: dataUpdated
                    });
                }
            });
        }
    });
};