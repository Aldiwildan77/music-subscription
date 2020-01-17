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
  updateBalance: (data, callback) => {
    connection.query(
      'UPDATE Customer SET balance = balance + ? WHERE id = ?',
      [
        parseInt(data.amount),
        parseInt(data.costumer_id)
      ],
      (error, result) => {
        if (error)
          callback(error);
        callback(null, result);
      }
    )
  },
  debitBalance: (data, callback) => {
    connection.query(
      'UPDATE Customer SET balance = balance - ? WHERE id = ?',
      [
        parseInt(data.amount),
        parseInt(data.costumer_id)
      ],
      (error, result) => {
        if (error)
          callback(error);
        callback(null, result);
      }
    )
  },
};
