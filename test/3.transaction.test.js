const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../src/app");
chai.use(chaiHttp);
const expect = chai.expect;
const requester = chai.request(app).keepOpen();
const chaiUtil = require("../src/utils/chai");
const Transaction = require("./test-cases/transaction/transactionPayment");
const validTransactionData = ["id", "customer_id", "subscription_id", "total"];
describe("Transaction", () => {
  describe("POST /transaction/payment", async () => {
    it("should return transactionId if no error", async () => {
      let res = await chaiUtil.post(
        requester,
        "/transaction/payment",
        Transaction[0]
      );
      expect(res).to.have.status(201);
      expect(res.body).to.have.property("error", false);
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
});
