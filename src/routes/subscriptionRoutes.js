'use strict';
exports.route = (app) => {
    var subscription = require('../controllers/SubscriptionController');


    app.route('/subscription')
        .post(subscription.create_subscription)
        .get(subscription.get_all_subscription);

    app.route('/subscription/:id')
        .get(subscription.get_subscription_info);
};