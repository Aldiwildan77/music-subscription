const express = require('express');
const router = express.Router();

const CustomerController = require('../src/controllers/CustomerController')


router.post('/register', CustomerController.register)
router.post('/topup', CustomerController.topup)
router.get('/debit', CustomerController.debit)

module.exports = router;
