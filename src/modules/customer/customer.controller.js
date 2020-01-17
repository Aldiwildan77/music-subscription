const {createCustomer} = require('./customer.model');

module.exports = {
  register: (req, res) => {
    const {name, email, phone} = req.body;

    if (!name || !email || !phone) {
      return res.status(422).json({
        success: false,
        data: null,
        message: `Payload for customer are empty`
      });
    }

    const params = req.body;
    createCustomer(params, (error, result) => {
      if (error)
        return res.status(422).json({
          success: false,
          data: error,
          message: `Failed to create customer`
        });
      return res.status(201).json({
        success: true,
        data: result.insertId,
        message: `Success create customer`
      })
    });
  },

};