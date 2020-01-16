const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../App');
const conn = require('../../../src/index');

describe('GET /customer/:id', () => {
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


    it('OK, get user info work', (done) => {
        request(app).get('/customer/5e20530b809eff43206c7652')
            .send({})
            .then((res) => {
                const body = res.body;
                expect(body).property('message').equal('success');
                expect(body.result).property('_id').equal('5e20530b809eff43206c7652');
                done();
            })
            .catch((err) => done(err));
    });


    it('FAIL, params id is wrong', (done) => {
        request(app).get('/customer/5e20530b809eff43206c7s2')
            .send({})
            .then((res) => {
                const body = res.body;
                expect(body).property('message').equal('user not found');
                done();
            })
            .catch((err) => done(err));
    });


    it('FAIL, params is empty', (done) => {
        request(app).get('/customer')
            .send({})
            .then((res) => {
                const body = res.body;
                expect(body).to.not.have.property('result');
                done();
            })
            .catch((err) => done(err));
    });


})