const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../App');
const conn = require('../../../src/index');

describe('GET /transaction', () => {
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


    it('OK, get all transaction work', (done) => {
        request(app).get('/transaction')
            .send({}).then((res) => {
                const result = res.body;
                expect(result).property('message').equal('success');
                expect(result).to.contain.property('transaction_count');
                expect(result).to.contain.property('data');
                done();
            }).catch((err) => done(err));
    });


})