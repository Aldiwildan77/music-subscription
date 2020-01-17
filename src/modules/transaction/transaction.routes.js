const router = require('express').Router();
const {payment, transaction, transactionId} = require('./transaction.controller');

router.get('/', transaction);
router.get('/:transaction_id', transactionId);
router.post('/payment', payment);

module.exports = router;