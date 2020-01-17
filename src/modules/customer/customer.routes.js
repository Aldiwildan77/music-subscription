const router = require('express').Router();
const {register, topup, debit, getProfile} = require('./customer.controller');

router.post('/register', register);
router.put('/topup', topup);
router.put('/debit', debit);
router.get('/profile/:costumer_id', getProfile);

module.exports = router;