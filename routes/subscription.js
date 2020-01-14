const express = require('express');
const router = express.Router();

const SubscriptionController = require('../src/controllers/SubscriptionController')


router.post('/', SubscriptionController.store)
router.get('/', SubscriptionController.index)
router.get('/:id', SubscriptionController.show)

module.exports = router;
