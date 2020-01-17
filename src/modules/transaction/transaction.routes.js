const router = require('express').Router();
const {payment} = require('./transaction.controller');

router.post('/payment', payment);

module.exports = router;