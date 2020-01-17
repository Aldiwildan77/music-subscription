const router = require('express').Router();
const {register, topup, debit} = require('./customer.controller');

router.post('/register', register);
router.put('/topup', topup);
router.put('/debit', debit);

module.exports = router;