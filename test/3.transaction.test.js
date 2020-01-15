const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../src/app");
chai.use(chaiHttp);
const expect = chai.expect;
const requester = chai.request(app).keepOpen();
const chaiUtil = require("../src/utils/chai");
const Transaction = require("./test-cases/transaction/transactionPayment");
const TransactionRenew = require("./test-cases/transaction/transactionRenew");
const validTransactionData = [
  "id",
  "customer_id",
  "subscription_id",
  "total",
  "date_buy",
  "date_renew",
  "date_expire"
];
describe("Transaction", () => {
  describe("POST /transaction/payment", async () => {
    it("should return transactionId and decrease customer's balance if no error", async () => {
      let data = Transaction[0];
      let id = Transaction[0].customer_id;
      let beforePay = await chaiUtil.get(requester, `/customer/${id}`);
      let res = await chaiUtil.post(
        requester,
        "/transaction/payment",
        Transaction[0]
      );
      let afterPay = await chaiUtil.get(requester, `/customer/${id}`);
      let balanceBeforePay = beforePay.body.message.balance;
      let balanceAfterPay = afterPay.body.message.balance;
      let balanceDiff = balanceBeforePay - balanceAfterPay;
      expect(res).to.have.status(201);
      expect(res.body).to.have.property("error", false);
      expect(balanceDiff).to.equal(data.total);
      expect(res.body.message).to.be.an("number");
    });
    it("should return error if can't find customer / subscription", async () => {
      let res = await chaiUtil.post(
        requester,
        "/transaction/payment",
        Transaction[1]
      );
      expect(res).to.have.status(404);
      expect(res.body).to.have.property("error", true);
      expect(res.body.message).to.have.property(
        "errorMessage",
        "Customer / subscription tidak ditemukan"
      );
    });
    it("should return error if payment data not full", async () => {
      let res = await chaiUtil.post(
        requester,
        "/transaction/payment",
        Transaction[2]
      );
      expect(res).to.have.status(400);
      expect(res.body).to.have.property("error", true);
      expect(res.body.message).to.have.property(
        "errorMessage",
        "Data tidak lengkap"
      );
    });
  });
  describe("GET /transaction", async () => {
    it("should return all transaction", async () => {
      let res = await chaiUtil.get(requester, "/transaction");
      expect(res).to.have.status(200);
      expect(res.body).to.have.property("error", false);
      expect(res.body.message).to.be.an("array");
    });
  });
  describe("GET /transaction/{id}", async () => {
    it("should return transaction data if no error", async () => {
      let res = await chaiUtil.get(requester, "/transaction/1");
      expect(res).to.have.status(200);
      expect(res.body).to.have.property("error", false);
      expect(res.body.message).to.have.all.keys(validTransactionData);
    });
    it("should return error if no transaction found", async () => {
      let res = await chaiUtil.get(requester, "/transaction/0");
      expect(res).to.have.status(404);
      expect(res.body).to.have.property("error", true);
      expect(res.body.message).to.have.property(
        "errorMessage",
        "Transaction tidak ditemukan"
      );
    });
  });
  describe("POST /transaction/renew", async () => {
    it("should return transactionId and decrese customer's balance if no error", async () => {
      let data = TransactionRenew[0];
      let beforePay = await chaiUtil.get(requester, `/customer/1`);
      let res = await chaiUtil.post(requester, "/transaction/renew", data);
      let afterPay = await chaiUtil.get(requester, `/customer/1`);
      let balanceBeforePay = beforePay.body.message.balance;
      let balanceAfterPay = afterPay.body.message.balance;
      let balanceDiff = balanceBeforePay - balanceAfterPay;
      expect(res).to.have.status(200);
      expect(res.body).to.have.property("error", false);
      expect(balanceDiff).to.equal(data.total);
      expect(res.body.message).to.be.an("number");
    });
    it("should return error if can't find customer / subscription", async () => {
      let data = TransactionRenew[1];
      let res = await chaiUtil.post(requester, "/transaction/renew", data);
      expect(res).to.have.status(404);
      expect(res.body).to.have.property("error", true);
      expect(res.body.message).to.have.property(
        "errorMessage",
        "Transaction tidak ditemukan"
      );
    });
    it("should return error if renew data not full", async () => {
      let data = TransactionRenew[2];
      let res = await chaiUtil.post(requester, "/transaction/renew", data);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property("error", true);
      expect(res.body.message).to.have.property(
        "errorMessage",
        "Data tidak lengkap"
      );
    });
  });
});
