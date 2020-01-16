const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../App');
const conn = require('../../../src/index');

describe('GET /subscription', () => {
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


    it('OK, get all subscriptin work', (done) => {
        request(app).get('/subscription')
            .send({})
            .then((res) => {
                const body = res.body;
                if (body.message === 'success') {
                    expect(body).to.contain.property('result_count');
                    expect(body).to.contain.property('results');
                } else {
                    expect(body).property('message').equal('nothing subscription')
                }
                done();
            })
            .catch((err) => done(err));
    });


})