'use strict';
exports.route = (app) => {
    var transaction = require('../controllers/TransactionConstroller');

    app.route('/transaction')
        .post(transaction.create_transaction)
        .get(transaction.get_all_transaction);

    app.route('/transaction/:id')
        .get(transaction.get_transaction_info);
};