const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const customersRouter = require('./routes/customer');
const subscriptionsRouter = require('./routes/subscription');
const transactionsRouter = require('./routes/transaction');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/customer', customersRouter);
app.use('/transaction', transactionsRouter);
app.use('/subscription', subscriptionsRouter);

module.exports = app;
