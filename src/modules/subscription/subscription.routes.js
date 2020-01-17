const router = require('express').Router();
const {createSubscription, subscription, subscriptionId} = require('./subscription.controller');

router.get('/', subscription);
router.post('/create', createSubscription);
router.get('/:subscription_id', subscriptionId);

module.exports = router;