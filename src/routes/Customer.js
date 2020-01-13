const router = require("express").Router();
const Customer = require("../controllers/Customer");

router.get("/", Customer.getAllCustomer);
router.get("/:id", Customer.getSingleCustomerById);
router.post("/register", Customer.register);
router.post("/topup", Customer.topupCustomer);
router.post("/debit", Customer.debitCustomer);

module.exports = router;
