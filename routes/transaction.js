const express = require('express');
const router = express.Router();

const TransactionController = require('../src/controllers/TransactionController')


router.post('/payment', TransactionController.store)
router.get('/', TransactionController.index)
router.get('/:id', TransactionController.show)

module.exports = router;
