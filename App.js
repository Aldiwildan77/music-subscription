const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Customer = require('./src/models/Customer');
const Subscription = require('./src/models/Subscription');
const Transaction = require('./src/models/Transaction');
const bodyParser = require('body-parser');
const customerRoute = require('./src/routes/customerRoutes');
const subscriptionRoute = require('./src/routes/subscriptionRoutes');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

customerRoute.route(app);
subscriptionRoute.route(app);

app.listen(3000);