const router = require("express").Router();
const Customer = require("../controllers/Customer");

router.get("/", Customer.getAllCustomer);
router.post("/register", Customer.register);

module.exports = router;
