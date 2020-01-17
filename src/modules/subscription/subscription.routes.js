const router = require('express').Router();
const {subscription} = require('./subscription.controller');

router.get('/', subscription);

module.exports = router;