const connection = require('../../helper/database.helper');

module.exports = {
  createTransaction: (data, callback) => {
    connection.query(
      `INSERT INTO Transaction (customer_id, subscription_id, total) VALUES (?, ?, ?)`,
      [
        parseInt(data.customer_id),
        parseInt(data.subscription_id),
        parseInt(data.total)
      ],
      (error, result) => {
        if (error)
          callback(error);
        callback(null, result);
      }
    )
  },
  getTransaction: (data, callback) => {
    connection.query(
      `SELECT * FROM Transaction`,
      (error, result) => {
        if (error)
          callback(error);
        callback(null, result);
      }
    )
  },
  getTransactionId: (data, callback) => {
    connection.query(
      `SELECT * FROM Transaction WHERE id = ?`,
      [
        data.transaction_id
      ],
      (error, result) => {
        if (error)
          callback(error);
        callback(null, result);
      }
    )
  }
};