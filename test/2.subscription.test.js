const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../src/app");
chai.use(chaiHttp);
const expect = chai.expect;
const requester = chai.request(app).keepOpen();
const Subscription = require("./test-cases/subscription/subscriptionCreate");
const chaiUtil = require("../src/utils/chai");
const validSubscriptionData = ["id", "name", "price", "duration"];
describe("Subscription", () => {
  describe("POST /subscription", async () => {
    it("should return subscriptionId if no error", async () => {
      let res = await chaiUtil.post(
        requester,
        "/subscription",
        Subscription[0]
      );
      expect(res).to.have.status(201);
      expect(res.body).to.have.property("error", false);
    });
    it("should return error if create data not full", async () => {
      let res = await chaiUtil.post(
        requester,
        "/subscription",
        Subscription[1]
      );
      expect(res).to.have.status(400);
      expect(res.body).to.have.property("error", true);
      expect(res.body.message).to.have.property(
        "errorMessage",
        "Data tidak lengkap"
      );
    });
  });
  describe("GET /subscription", async () => {
    it("should return all subscription", async () => {
      let res = await chaiUtil.get(requester, "/subscription");
      expect(res).to.have.status(200);
      expect(res.body).to.have.property("error", false);
      expect(res.body.message).to.be.an("array");
    });
  });
  describe("GET /subscription/{id}", async () => {
    it("should return subscription data if no error", async () => {
      let res = await chaiUtil.get(requester, "/subscription/1");
      expect(res).to.have.status(200);
      expect(res.body).to.have.property("error", false);
      expect(res.body.message).to.have.all.keys(validSubscriptionData);
    });
    it("should return error if no subscription found", async () => {
      let res = await chaiUtil.get(requester, "/subscription/0");
      expect(res).to.have.status(404);
      expect(res.body).to.have.property("error", true);
      expect(res.body.message).to.have.property(
        "errorMessage",
        "Subscription tidak ditemukan"
      );
    });
  });
});
