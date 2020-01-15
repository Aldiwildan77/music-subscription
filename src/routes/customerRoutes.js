'use strict';
exports.route = (app) => {
    var customer = require('../controllers/CustomerController');


    app.route('/customer')
        .post(customer.register)
        .put(customer.top_up)
        .get(customer.get_user_info);


    app.route('/customer/debit')
        .put(customer.debit);

};