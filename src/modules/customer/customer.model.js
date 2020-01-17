const connection = require('../../helper/database.helper');

module.exports = {
  createCustomer: (data, callback) => {
    connection.query(
      'INSERT INTO Customer(name, email, phone, balance) VALUES (?, ?, ?, 0)',
      [
        data.name,
        data.email,
        data.phone
      ],
      (error, result) => {
        if (error)
          callback(error);
        callback(null, result);
      }
    )
  },

};
