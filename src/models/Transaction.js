const Transaction = require("../data/Transaction");
const transactionModel = {
  insertTransaction: data => {
    Transaction.push(data);
  },
  getAllTransaction: () => Transaction,
  getSingleTransactionById: id => Transaction.filter(e => e.id == id)[0]
};

module.exports = transactionModel;
