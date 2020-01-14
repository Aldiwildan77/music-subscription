const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const customerRoute = require('./src/routes/customerRoutes');

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

app.listen(3000);