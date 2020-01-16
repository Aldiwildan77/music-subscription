const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../App');
const conn = require('../../../src/index');

describe('PUT /customer', () => {
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


    it('OK, success top up work', (done) => {
        request(app).put('/customer')
            .send({
                customer_id: "5e20530b809eff43206c7652",
                // amount: 30000
            })
            .then((res) => {
                const body = res.body;
                expect(body).property('message').equal('success top up');
                expect(body).to.contain.property('result');
                done();
            })
            .catch((err) => done(err));
    });


    it('FAIL, top up is empty customer_id', (done) => {
        request(app).put('/customer')
            .send({
                amount: 30000
            })
            .then((res) => {
                const body = res.body;
                expect(body).property('message').equal('field not valid');
                done();
            })
            .catch((err) => done(err));
    });


    it('FAIL, top up is empty amount', (done) => {
        request(app).put('/customer')
            .send({
                customer_id: "5e20530b809eff43206c7652"
            })
            .then((res) => {
                const body = res.body;
                expect(body).property('message').equal('field not valid');
                done();
            })
            .catch((err) => done(err));
    });


    it('FAIL, top up is not have field', (done) => {
        request(app).put('/customer')
            .send({})
            .then((res) => {
                const body = res.body;
                expect(body).property('message').equal('field not valid');
                done();
            })
            .catch((err) => done(err));
    });


})