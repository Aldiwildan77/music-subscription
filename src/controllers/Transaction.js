const Transaction = require("../models/Transaction");
const Customer = require("../models/Customer");
const Subscription = require("../models/Subscription");
const {
  restReturn,
  getCurrentDate,
  calculateExpireDate
} = require("../utils/util");

const transactionController = {
  createTransaction: (req, res) => {
    let { customer_id, subscription_id, total } = req.body;
    if (customer_id == null || subscription_id == null || total == null) {
      return restReturn(res, 400, true, {
        errorMessage: "Data tidak lengkap"
      });
    }
    let customerData = Customer.getSingleCustomerById(customer_id);
    let subscriptionData = Subscription.getSingleSubscriptionById(
      subscription_id
    );
    if (!customerData || !subscriptionData) {
      return restReturn(res, 404, true, {
        errorMessage: "Customer / subscription tidak ditemukan"
      });
    }
    let latestTransactionId = Transaction.getAllTransaction().length;
    let id = latestTransactionId + 1;
    let transactionInsert = {
      id,
      customer_id,
      subscription_id,
      total,
      date_buy: getCurrentDate(),
      date_renew: "-",
      date_expire: calculateExpireDate(subscriptionData.duration)
    };
    Transaction.insertTransaction(transactionInsert);
    return restReturn(res, 201, false, id);
  },
  getAllTransaction: (req, res) => {
    let data = Transaction.getAllTransaction();
    return restReturn(res, 200, false, data);
  },
  getSingleTransaction: (req, res) => {
    let { id } = req.params;
    let data = Transaction.getSingleTransactionById(id);
    if (!data) {
      return restReturn(res, 404, true, {
        errorMessage: "Transaction tidak ditemukan"
      });
    }
    return restReturn(res, 200, false, data);
  }
};

module.exports = transactionController;
