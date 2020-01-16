const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../App');
const conn = require('../../../src/index');

describe('GET /subscription/:id', () => {
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


    it('OK, get a subscriptin info work', (done) => {
        request(app).get('/subscription/5e207d6edef1aa4398fc1e79')
            .send({})
            .then((res) => {
                const body = res.body;
                expect(body).property('message').equal('success');
                expect(body).property('result').to.contain.property('_id');
                done();
            })
            .catch((err) => done(err));
    });


    it('FAIL,subscriptin params is wrong', (done) => {
        request(app).get('/subscription/5e20sss')
            .send({})
            .then((res) => {
                const body = res.body;
                expect(body).property('message').equal('subscription not found');
                done();
            })
            .catch((err) => done(err));
    });


})