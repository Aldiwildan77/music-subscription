const router = require('express').Router();
const {register, topup} = require('./customer.controller');

router.post('/register', register);
router.put('/topup', topup);

module.exports = router;