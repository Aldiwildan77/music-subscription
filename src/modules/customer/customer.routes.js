const router = require('express').Router();
const {register} = require('./customer.controller');

router.post('/register', register);

module.exports = router;