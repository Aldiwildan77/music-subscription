'use strict';

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.register = (req, res) => {
    var user = new Customer(req.body);
    user.save((err, model) => {
        if (err)
            res.send(err);

        res.json(model);
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