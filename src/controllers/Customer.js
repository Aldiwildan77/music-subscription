const Customer = require("../models/Customer");
const { restReturn, isRegisterDataFull, isValidEmail } = require("../utils/index");
const customerController = {
  register: async (req, res) => {
    let { name, email, phone } = req.body;    
    if (!isRegisterDataFull(name, email, phone)) {
      return restReturn(res, 400, true, { errorMessage: "Data tidak lengkap" });
    } else if(!isValidEmail(email)) {
      return restReturn(res, 400, true, { errorMessage: "Email tidak valid" });      
    }
    let latestCustomerId = await Customer.getAllCustomer().length;
    let id = latestCustomerId + 1;
    await Customer.insertCustomer(id, name, email, phone);
    return restReturn(res, 200, false, { id });
  },
  getAllCustomer: (req, res) => {
    return restReturn(res, 200, false, Customer.getAllCustomer());
  }
};

module.exports = customerController;
