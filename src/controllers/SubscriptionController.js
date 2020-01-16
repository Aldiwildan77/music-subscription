'use strict';

const mongoose = require('mongoose');
const Subscription = mongoose.model('Subscription');

exports.create_subscription = (req, res) => {
    var subscription = new Subscription(req.body);
    subscription.save((err, model) => {
        if (err) {
            res.send({
                message: "field not valid"
            });
        } else {
            res.json({
                message: "success create subscription",
                result: model
            });
        }
    });
};


exports.get_all_subscription = (req, res) => {
    Subscription.find({}, (err, models) => {
        if (err || models.length == 0) {
            res.send({
                message: "nothing subscription"
            })
        } else {
            res.json({
                message: "success",
                result_count: models.length,
                results: models
            });
        }
    });
};


exports.get_subscription_info = (req, res) => {
    Subscription.findById(req.params.id, (err, model) => {
        if (err || model == null) {
            res.send({
                message: "subscription not found"
            });
        } else {
            res.json({
                message: "success",
                result: model
            });
        }
    });
};