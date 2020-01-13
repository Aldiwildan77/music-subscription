const Customer = require("../models/Customer");
const {
  restReturn,
  isRegisterDataFull,
  isValidEmail
} = require("../utils/index");
const customerController = {
  register: async (req, res) => {
    let { name, email, phone } = req.body;
    if (!isRegisterDataFull(name, email, phone)) {
      return restReturn(res, 400, true, { errorMessage: "Data tidak lengkap" });
    } else if (!isValidEmail(email)) {
      return restReturn(res, 400, true, { errorMessage: "Email tidak valid" });
    }
    let latestCustomerId = await Customer.getAllCustomer().length;
    let id = latestCustomerId + 1;
    await Customer.insertCustomer(id, name, email, phone);
    return restReturn(res, 200, false, { id });
  },
  getAllCustomer: (req, res) => {
    let data = Customer.getAllCustomer();
    return restReturn(res, 200, false, data);
  },
  getSingleCustomerById: (req, res) => {
    let id = req.params.id;
    let data = Customer.getSingleCustomerById(id);
    if (!data) {
      return restReturn(res, 404, true, {
        errorMessage: "Customer tidak ditemukan"
      });
    }
    return restReturn(res, 200, false, data);
  },
  topupCustomer: (req, res) => {
    let { customer_id, amount } = req.body;
    let beforeUpdate = Customer.getSingleCustomerById(customer_id);
    if (!beforeUpdate) {
      return restReturn(res, 404, true, {
        errorMessage: "Customer tidak ditemukan"
      });
    }
    let beforeUpdateBalance = beforeUpdate.balance;
    let updateData = {
      balance: beforeUpdateBalance + amount
    };
    Customer.updateCustomer(customer_id, updateData);
    return restReturn(res, 200, false);
  },
  debitCustomer: (req, res) => {
    let { customer_id, amount } = req.body;
    let beforeUpdate = Customer.getSingleCustomerById(customer_id);
    if (!beforeUpdate) {
      return restReturn(res, 404, true, {
        errorMessage: "Customer tidak ditemukan"
      });
    }
    let beforeUpdateBalance = beforeUpdate.balance;
    let updateData = {
      balance: beforeUpdateBalance - amount
    };
    if (updateData.balance < 0) {
      return restReturn(res, 400, true, {
        errorMessage: "Saldo tidak cukup"
      });
    }
    Customer.updateCustomer(customer_id, updateData);
    return restReturn(res, 200, false);
  }
};

module.exports = customerController;
