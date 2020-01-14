const router = require("express").Router();
const Transaction = require("../controllers/Transaction");

router.get("/", Transaction.getAllTransaction)
router.post("/payment", Transaction.createTransaction)

module.exports = router;
