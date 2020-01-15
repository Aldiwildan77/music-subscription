const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Customer = require('./src/models/Customer');
const Subscription = require('./src/models/Subscription');
const Transaction = require('./src/models/Transaction');
const bodyParser = require('body-parser');
const customerRoute = require('./src/routes/customerRoutes');
const subscriptionRoute = require('./src/routes/subscriptionRoutes');
const transactionRoute = require('./src/routes/transactionRoutes');


var online = 'mongodb://admin:Dp9KNJLuCNGTcoKV@cluster0-shard-00-00-uavp4.mongodb.net:27017,cluster0-shard-00-01-uavp4.mongodb.net:27017,cluster0-shard-00-02-uavp4.mongodb.net:27017/local_library?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority'

mongoose.Promise = global.Promise;
mongoose.connect(online, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

customerRoute.route(app);
subscriptionRoute.route(app);
transactionRoute.route(app);

app.listen(8000);