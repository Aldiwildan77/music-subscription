const router = require('express').Router();
const {payment, transaction} = require('./transaction.controller');

router.get('/', transaction);
router.post('/payment', payment);

module.exports = router;