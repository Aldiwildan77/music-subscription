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
    Customer.findById(req.params.userId, (err, model) => {
        if (err)
            res.send({
                message: "user not found"
            });

        res.json(model);
    });
};


exports.top_up = (req, res) => {
    Customer.findById(req.body.id, (err, data) => {
        data.balance += parseInt(req.body.balance);

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

};