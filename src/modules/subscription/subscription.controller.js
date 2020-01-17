const {createSubscriptions} = require('./subscription.model');

module.exports = {
  createSubscription: (req, res) => {
    const {name, price, duration} = req.body;

    if (!name || !price || !duration) {
      return res.status(422).json({
        success: false,
        data: null,
        message: `Payload for create subscription are empty `
      });
    }

    const params = req.body;
    createSubscriptions(params, (error, result) => {
      if (error)
        return res.status(422).json({
          success: false,
          data: error,
          message: `Failed create subscription`
        });
      return res.status(201).json({
        success: true,
        data: result,
        message: `Success create subscription`
      });
    })
  },
  subscription: (req, res) => {
    getSubscription(null, (error, result) => {
      if (error)
        return res.status(422).json({
          success: false,
          data: error,
          message: `Failed get subscription`
        });

      if (result.length === 0)
        return res.status(204).json({
          success: true,
          data: [],
          message: `Subscription data not found`
        });

      return res.status(200).json({
        success: true,
        data: result,
        message: `Success get subscription`
      });
    })
  },
};