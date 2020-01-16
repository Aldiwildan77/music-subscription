const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../App');
const conn = require('../../../src/index');

describe('POST /customer/debit', () => {
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


    it('OK, user debit is work', (done) => {
        request(app).put('/customer')
            .send({
                customer_id: "5e20530b809eff43206c7652",
                amount: 30000
            })
            .then((res) => {
                const user = res.body.result;
                request(app).post('/customer/debit')
                    .send({
                        id: "5e20530b809eff43206c7652",
                        amount: 30000
                    })
                    .then((res) => {
                        const updateBalance = res.body.result;
                        expect(updateBalance).property('balance').equal(user.balance - 30000);
                        done();
                    })
                    .catch((err) => done(err));
            }).catch((err) => done(err));



    });


    it('FAIL, user balance is not enought', (done) => {
        request(app).get('/customer/5e205ceced517140cc6a9759')
            .send({})
            .then((res) => {
                const user = res.body.result;
                const amount = 30000;
                request(app).post('/customer/debit')
                    .send({
                        id: "5e205ceced517140cc6a9759",
                        amount: amount
                    })
                    .then((res) => {
                        const response = res.body;
                        expect(response).property('message').equal('balance is not enough');
                        expect(user.balance < amount).to.be.true;
                        done();
                    })
                    .catch((err) => done(err));
            })
            .catch((err) => done(err));
    });


    it('FAIL, user debit is empty id', (done) => {
        request(app).post('/customer/debit')
            .send({
                amount: 30000
            })
            .then((res) => {
                const response = res.body;
                expect(response).property('message').equal('field not valid');
                done();
            })
            .catch((err) => done(err));
    });


    it('FAIL, user debit is empty amount', (done) => {
        request(app).post('/customer/debit')
            .send({
                id: "5e205ceced517140cc6a9759"
            })
            .then((res) => {
                const response = res.body;
                expect(response).property('message').equal('field not valid');
                done();
            })
            .catch((err) => done(err));
    });


    it('FAIL, user debit is wrong id', (done) => {
        request(app).post('/customer/debit')
            .send({
                id: "apasih",
                amount: 10000
            })
            .then((res) => {
                const response = res.body;
                expect(response).property('message').equal('field not valid');
                done();
            })
            .catch((err) => done(err));
    });


    it('FAIL, user debit is wrong amount', (done) => {
        request(app).post('/customer/debit')
            .send({
                id: "5e205ceced517140cc6a9759",
                amount: "seribu"
            })
            .then((res) => {
                const response = res.body;
                expect(response).property('message').equal('field not valid');
                done();
            })
            .catch((err) => done(err));
    });


    it('FAIL, user debit is empty field', (done) => {
        request(app).post('/customer/debit')
            .send({})
            .then((res) => {
                const response = res.body;
                expect(response).property('message').equal('field not valid');
                done();
            })
            .catch((err) => done(err));
    });
})