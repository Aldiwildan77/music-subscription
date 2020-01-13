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
  getAllCustomer: () => Customer,
  getSingleCustomerById: id => Customer.filter(e => e.id == id)[0],
  updateCustomer: (id, updateData) => {
    Customer.forEach(e => {
      if(e.id == id){
        e.name = updateData.name ? updateData.name : e.name,
        e.email = updateData.email ? updateData.email : e.email,
        e.phone = updateData.phone ? updateData.phone : e.phone,
        e.balance = updateData.balance ? updateData.balance : e.balance
      }
    })
  }
};

module.exports = customerModel;
