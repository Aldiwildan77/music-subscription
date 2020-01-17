const {createCustomer, updateBalance, debitBalance, getCustomer} = require('./customer.model');

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
  topup: (req, res) => {
    const {costumer_id, amount} = req.body;

    if (!costumer_id || !amount) {
      return res.status(422).json({
        success: false,
        data: null,
        message: `Payload for topup balance are empty `
      });
    }

    const params = req.body;
    updateBalance(params, (error, result) => {
      if (error)
        return res.status(422).json({
          success: false,
          data: error,
          message: `Failed to topup balance customer id ${costumer_id}`
        });
      return res.status(200).json({
        success: true,
        data: null,
        message: `Success update balance for customer id ${costumer_id}`
      })
    });
  },
  debit: (req, res) => {
    const {costumer_id, amount} = req.body;

    if (!costumer_id || !amount) {
      return res.status(422).json({
        success: false,
        data: null,
        message: `Payload for debit balance are empty `
      });
    }

    const params = req.body;
    debitBalance(params, (error, result) => {
      if (error)
        return res.status(422).json({
          success: false,
          data: error,
          message: `Failed to debit balance customer id ${costumer_id}`
        });
      return res.status(200).json({
        success: true,
        data: null,
        message: `Success debit balance for customer id ${costumer_id}`
      })
    });
  },
  getProfile: (req, res) => {
    const {costumer_id} = req.params;
    if (!costumer_id) {
      return res.status(422).json({
        success: false,
        data: null,
        message: `Payload for get customer are empty `
      });
    }

    const params = req.params;
    getCustomer(params, (error, result) => {
      if (error)
        return res.status(422).json({
          success: false,
          data: error,
          message: `Failed to get profile with customer id ${costumer_id}`
        });
      return res.status(200).json({
        success: true,
        data: result,
        message: `Success get profile with customer id ${costumer_id}`
      })
    });
  }
};