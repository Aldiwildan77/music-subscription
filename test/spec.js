const mocha = require("mocha");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../src/app");
const Customer = require("./test-cases/customer");
const {
  isRegisterDataFull,
  isValidEmail,
  doChaiPost,
  doChaiGet
} = require("../src/utils/index");
chai.use(chaiHttp);
const expect = chai.expect;
const requester = chai.request(app).keepOpen();
describe("Customer", () => {
  describe("/customer/register", async () => {
    let url = "/customer/register";
    for (let i = 0; i < Customer.length; i++) {
      let { name, email, phone } = Customer[i];
      if (!isRegisterDataFull(name, email, phone)) {
        it("return error if register data not full", async () => {
          let res = await doChaiPost(requester, url, Customer[i]);
          expect(res).to.have.status(400);
          expect(res.body).to.have.property("error", true);
          expect(res.body.message).to.have.property(
            "errorMessage",
            "Data tidak lengkap"
          );
        });
      } else if (!isValidEmail(email)) {
        it("return error if email not valid", async () => {
          let res = await doChaiPost(requester, url, Customer[i]);
          expect(res).to.have.status(400);
          expect(res.body).to.have.property("error", true);
          expect(res.body.message).to.have.property(
            "errorMessage",
            "Email tidak valid"
          );
        });
      } else {
        it("return customerId if no error", async () => {
          let res = await doChaiPost(requester, url, Customer[i]);
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("error", false);
        });
      }
    }
  });
  describe("/customer", async () => {
    it("return all customer", async () => {
      let res = await doChaiGet(requester, "/customer", null);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property("error", false);
    });
  });
});
