const Subscription = require("../data/Subscription");

const subscriptionModel = {
  insertSubscription: (data) => {
    Subscription.push(data);
  },
  getAllSubscription: () => Subscription,
  getSingleSubscriptionById: id => Subscription.filter(e => e.id == id)[0],
};

module.exports = subscriptionModel;
