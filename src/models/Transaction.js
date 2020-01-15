const Transaction = require("../data/Transaction");
const transactionModel = {
  insertTransaction: data => {
    Transaction.push(data);
  },
  getAllTransaction: () => Transaction,
  getSingleTransactionById: id => Transaction.filter(e => e.id == id)[0],
  updateTransaction: (customerId, subscriptionId, updateData) => {
    Transaction.forEach(e => {
      if (e.customer_id == customerId && e.subscription_id == subscriptionId) {
        (e.customer_id = updateData.customer_id
          ? updateData.customer_id
          : e.customer_id),
          (e.subscription_id = updateData.subscription_id
            ? updateData.subscription_id
            : e.subscription_id),
          (e.total = updateData.total ? updateData.total : e.total),
          (e.date_buy = updateData.date_buy ? updateData.date_buy : e.date_buy),
          (e.date_renew = updateData.date_renew
            ? updateData.date_renew
            : e.date_renew),
          (e.date_expire = updateData.date_expire
            ? updateData.date_expire
            : e.date_expire);
      }
    });
  }
};

module.exports = transactionModel;
