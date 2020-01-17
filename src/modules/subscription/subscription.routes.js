const router = require('express').Router();
const {createSubscription, subscription} = require('./subscription.controller');

router.get('/', subscription);
router.get('/:subscription_id', subscriptionId);
router.post('/create', createSubscription);

module.exports = router;