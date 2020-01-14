const router = require("express").Router();
const Transaction = require("../controllers/Transaction");

router.get("/", Transaction.getAllTransaction)
router.get("/:id", Transaction.getSingleTransaction)
router.post("/payment", Transaction.createTransaction)

module.exports = router;
