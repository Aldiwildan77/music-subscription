'use strict';
exports.route = (app) => {
    var customer = require('../controllers/CustomerController');


    app.route('/customer')
        .post(customer.register)
        .put(customer.top_up);


    app.route('/customer/:userId')
        .get(customer.get_user_info);



    app.route('/customer/debit/:userId')
        .put(customer.debit);

};