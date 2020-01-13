const router = require("express").Router();
const Subscription = require("../controllers/Subscription");

router.get("/", Subscription.getAllSubscription);
router.get("/:id", Subscription.getSingleSubscription);
router.post("/", Subscription.createSubscription);

module.exports = router;
