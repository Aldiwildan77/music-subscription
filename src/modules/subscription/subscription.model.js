const connection = require('../../helper/database.helper');

module.exports = {
  createSubscriptions: (data, callback) => {
    connection.query(
      `INSERT INTO Subscription (name, price, duration) VALUES (?, ?, ?)`,
      [
        parseInt(data.name),
        parseInt(data.price),
        parseInt(data.duration)
      ],
      (error, result) => {
        if (error)
          callback(error);
        callback(null, result);
      }
    )
  },
};