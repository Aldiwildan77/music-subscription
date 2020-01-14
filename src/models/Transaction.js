const Transaction = require("../data/Transaction");
const transactionModel = {
  insertTransaction: (data) => {
    Transaction.push(data)
  },
  getAllTransaction: () => Transaction
};

module.exports = transactionModel;
