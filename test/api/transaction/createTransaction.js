const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../App');
const conn = require('../../../src/index');

describe('POST /transaction', () => {
    before((done) => {
        conn.connect()
            .then(() => done())
            .catch((err) => done(err));
    })


    after((done) => {
        conn.close()
            .then(() => done())
            .catch((err) => done(err));
    })


    it('OK, create a new transaction works', (done) => {
        request(app).put('/customer')
            .send({
                customer_id: "5e205ceced517140cc6a9759",
                //amount: 60000
            }).then((res) => {
                const user = res.body.result;
                const userBalance = user.balance;
                request(app).post('/transaction')
                    .send({
                        customer_id: "5e205ceced517140cc6a9759",
                        subscription_id: "5e207d6edef1aa4398fc1e79"
                    })
                    .then((res) => {
                        const body = res.body;
                        const subscriptionPrice = body.result.total;
                        const your_balance = body.your_balance;
                        const result = body.result;
                        expect(userBalance - subscriptionPrice == your_balance).to.is.true;
                        expect(body).property('message').equal('transaction success');
                        expect(result).to.contain.property('_id');
                        expect(result).to.contain.property('customer_id');
                        expect(result).to.contain.property('subscription_id');
                        expect(result).to.contain.property('total');
                        done();
                    })
                    .catch((err) => done(err));
            }).catch((err) => done(err));
    });


    it('FAIL, transaction is wrong field', (done) => {
        request(app).post('/transaction')
            .send({
                customer_id: "hajir",
                subscription_id: "gold"
            })
            .then((res) => {
                const body = res.body;
                expect(body).property('message').equal('field not valid')
                done();
            })
            .catch((err) => done(err));
    });

    it('FAIL, transaction is empty field', (done) => {
        request(app).post('/transaction')
            .send({})
            .then((res) => {
                const body = res.body;
                expect(body).property('message').equal('field not valid')
                done();
            })
            .catch((err) => done(err));
    });

    it('FAIL, user balance is not enough for transaction', (done) => {
        request(app).post('/transaction')
            .send({
                customer_id: "5e205ceced517140cc6a9759",
                subscription_id: "5e207d6edef1aa4398fc1e79"
            })
            .then((res) => {
                const body = res.body;
                expect(body).property('message').equal('balance not enough');
                done();
            })
            .catch((err) => done(err));
    });
})