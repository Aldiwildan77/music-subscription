const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Customer = require('./src/models/Customer');
const Subscription = require('./src/models/Subscription');
const Transaction = require('./src/models/Transaction');
const customerRoute = require('./src/routes/customerRoutes');
const subscriptionRoute = require('./src/routes/subscriptionRoutes');
const transactionRoute = require('./src/routes/transactionRoutes');


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

customerRoute.route(app);
subscriptionRoute.route(app);
transactionRoute.route(app);

module.exports = app;