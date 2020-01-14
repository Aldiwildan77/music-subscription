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