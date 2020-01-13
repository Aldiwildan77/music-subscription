const Subscription = require("../data/Subscription");

const subscriptionModel = {
  insertSubscription: (id, name, price, duration) => {
    Subscription.push({
      id,
      name,
      price,
      duration
    });
  },
  getAllSubscription: () => Subscription,
  getSingleSubscriptionById: id => Subscription.filter(e => e.id == id)[0],
};

module.exports = subscriptionModel;
