const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../App');
const conn = require('../../../src/index');

describe('GET /transaction/:id', () => {
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


    it('OK, get a transaction info work', (done) => {
        request(app).get('/transaction/5e21401f8f0f4534185ffcc7')
            .send({})
            .then((res) => {
                const body = res.body;
                expect(body).property('message').equal('success');
                expect(body).property('result').to.contain.property('_id');
                expect(body).property('result').to.contain.property('customer_id');
                expect(body).property('result').to.contain.property('subscription_id');
                expect(body).property('result').to.contain.property('total');
                done();
            })
            .catch((err) => done(err));
    });


    it('FAIL,subscriptin params is wrong', (done) => {
        request(app).get('/transaction/5dsdssdss')
            .send({})
            .then((res) => {
                const body = res.body;
                expect(body).property('message').equal('transaction not found');
                done();
            })
            .catch((err) => done(err));
    });


})