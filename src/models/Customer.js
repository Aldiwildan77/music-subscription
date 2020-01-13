const Customer = require("../data/Customer");

const customerModel = {
  insertCustomer: (id, name, email, phone) => {
    Customer.push({
      id,
      name,
      email,
      phone,
      balance: 0
    });
  },
  getAllCustomer: () => Customer
};

module.exports = customerModel;
