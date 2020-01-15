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
    if (customerData.balance < total) {
      return restReturn(res, 400, true, { errorMessage: "Saldo tidak cukup" });
    }
    customerUpdate = {
      balance: customerData.balance - total
    };
    Customer.updateCustomer(customer_id, customerUpdate);
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
  },
  renewTransaction: (req, res) => {
    let { id, total } = req.body;
    if (id == null || total == null) {
      return restReturn(res, 400, true, {
        errorMessage: "Data tidak lengkap"
      });
    }
    let currTransData = Transaction.getSingleTransactionById(id);
    if (!currTransData) {
      return restReturn(res, 404, true, {
        errorMessage: "Transaction tidak ditemukan"
      });
    }
    let customerData = Customer.getSingleCustomerById(
      currTransData.customer_id
    );
    if (customerData.balance < total) {
      return restReturn(res, 400, true, { errorMessage: "Saldo tidak cukup" });
    }
    customerUpdate = {
      balance: customerData.balance - total
    };
    Customer.updateCustomer(currTransData.customer_id, customerUpdate);
    let subscriptionData = Subscription.getSingleSubscriptionById(
      currTransData.subscription_id
    );
    let renewData = {
      date_buy: currTransData.date_buy,
      date_renew: getCurrentDate(),
      date_expire: calculateExpireDate(
        subscriptionData.duration,
        getCurrentDate()
      )
    };
    Transaction.updateTransaction(renewData);
    return restReturn(res, 200, false, currTransData.id);
  }
};

module.exports = transactionController;
