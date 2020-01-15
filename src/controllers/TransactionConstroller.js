'use strict';

const mongoose = require('mongoose');
const Transaction = mongoose.model('Transaction');
const Customer = mongoose.model('Customer');
const Subscription = mongoose.model('Subscription');

exports.create_transaction = (req, res) => {
    Customer.findById(req.body.customer_id, (err, customer) => {
        if (err || customer == null) {
            res.send({
                message: "field not valid"
            });
        } else {
            Subscription.findById(req.body.subscription_id, (err, subscription) => {
                if (err || subscription == null) {
                    res.send({
                        message: "field not valid"
                    });
                } else {
                    if (customer.balance < subscription.price) {
                        res.send({
                            message: "balance not enough"
                        })
                    } else {
                        customer.balance -= parseInt(subscription.price);
                        var new_transaction = new Transaction({
                            customer_id: req.body.customer_id,
                            subscription_id: req.body.subscription_id,
                            total: subscription.price
                        });
                        customer.save((err, result) => {
                            if (err) {
                                res.send({
                                    message: "transaction failed"
                                });
                            } else {
                                new_transaction.save((err, model) => {
                                    if (err) {
                                        res.send({
                                            message: "transaction failed"
                                        });
                                    }
                                    res.json({
                                        message: "transaction success",
                                        result: model,
                                        your_balance: result.balance
                                    })
                                });
                            }
                        });
                    }
                }
            });
        }
    });
};


exports.get_all_transaction = (req, res) => {
    Transaction.find({}, (err, models) => {
        if (err || models.length == 0) {
            res.send({
                message: "no transaction found"
            })
        } else {
            res.json({
                message: "success",
                transaction_count: models.length,
                data: models
            });
        }
    });
}


exports.get_transaction_info = (req, res) => {
    Transaction.findById(req.params.id, (err, model) => {
        if (err || model == null) {
            res.send({
                message: "transaction not found"
            });
        } else {
            res.json({
                message: "success",
                result: model
            })
        }
    });
}