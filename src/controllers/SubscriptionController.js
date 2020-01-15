'use strict';

const mongoose = require('mongoose');
const Subscription = mongoose.model('Subscription');

exports.create_subscription = (req, res) => {
    var subscription = new Subscription(req.body);
    subscription.save((err, model) => {
        if (err)
            res.send(err);

        res.json({
            result: "succes create subscription",
            data: model
        });
    });
};


exports.get_all_subscription = (req, res) => {
    Subscription.find({}, (err, models) => {
        if (err || models.length) {
            res.send({
                message: "nothing subscription"
            })
        }

        res.json(models);
    });
};


exports.get_subscription_info = (req, res) => {

};