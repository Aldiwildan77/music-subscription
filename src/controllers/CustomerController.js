'use strict';

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.register = (req, res) => {
    var user = new Customer(req.body);
    user.save((err, model) => {
        if (err)
            res.send(err);

        res.json({
            result: "succes create user",
            data: model
        });
    });
};


exports.get_user_info = (req, res) => {
    Customer.findById(req.body.id, (err, model) => {
        if (err || model == null)
            res.send({
                message: "user not found"
            });

        res.json(model);
    });
};


exports.top_up = (req, res) => {
    Customer.findById(req.body.id, (err, data) => {
        data.balance += parseInt(req.body.amount);

        data.save((err, dataUpdated) => {
            if (err) res.send(err);

            res.json({
                message: "succes top up",
                data: dataUpdated
            })
        });
    });
};


exports.debit = (req, res) => {
    Customer.findById(req.body.id, (err, data) => {
        if (req.body.amount > data.balance) {
            res.send({
                message: "balance is not enought"
            });
        } else {
            data.balance -= parseInt(req.body.amount);

            data.save((err, dataUpdated) => {
                if (err) res.send(err);

                res.json({
                    message: "debit success",
                    data: dataUpdated
                });
            });
        }
    });
};