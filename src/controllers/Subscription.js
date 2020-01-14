const Subscription = require("../models/Subscription");
const { restReturn } = require("../utils/util");
const { isCreateDataFull } = require("../utils/subscription");

const subscriptionController = {
  createSubscription: async (req, res) => {
    let { name, price, duration } = req.body;
    if (!isCreateDataFull(name, price, duration)) {
      return restReturn(res, 400, true, { errorMessage: "Data tidak lengkap" });
    }
    let latestSubscriptionId = (await Subscription.getAllSubscription()).length;
    let id = latestSubscriptionId + 1;
    let subscriptionInsert = {
      id,
      name,
      price,
      duration
    };
    await Subscription.insertSubscription(subscriptionInsert);
    return restReturn(res, 201, false, { id });
  },
  getAllSubscription: (req, res) => {
    let data = Subscription.getAllSubscription();
    return restReturn(res, 200, false, data);
  },
  getSingleSubscription: (req, res) => {
    let { id } = req.params;
    let data = Subscription.getSingleSubscriptionById(id);
    if (!data) {
      return restReturn(res, 404, true, {
        errorMessage: "Subscription tidak ditemukan"
      });
    }
    return restReturn(res, 200, false, data);
  }
};

module.exports = subscriptionController;
