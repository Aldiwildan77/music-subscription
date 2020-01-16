const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../App');
const conn = require('../../../src/index');

describe('POST /customer', () => {
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


    it('OK, registering a new customer works', (done) => {
        request(app).post('/customer')
            .send({
                name: 'hajir',
                email: "hajir@gmail.com",
                //phone: "0811"
            })
            .then((res) => {
                const body = res.body.result;
                expect(body).to.contain.property('_id')
                expect(body).to.contain.property('name')
                expect(body).to.contain.property('email')
                expect(body).to.contain.property('phone')
                expect(body).to.contain.property('balance')
                done();
            })
            .catch((err) => done(err));
    });


    it('FAIL, registering is empty name', (done) => {
        request(app).post('/customer')
            .send({
                email: "hajir@gmail.com",
                phone: "0811"
            })
            .then((res) => {
                const body = res.body;
                expect(body).property('message').equal('failed to create user');
                done();
            })
            .catch((err) => done(err));
    });


    it('FAIL, registering is empty email', (done) => {
        request(app).post('/customer')
            .send({
                name: "muhajir",
                phone: "0811"
            })
            .then((res) => {
                const body = res.body;
                expect(body).property('message').equal('failed to create user');
                done();
            })
            .catch((err) => done(err));
    });


    it('FAIL, registering is empty phone', (done) => {
        request(app).post('/customer')
            .send({
                name: "muhajir",
                email: "hajir@gmail.com"
            })
            .then((res) => {
                const body = res.body;
                expect(body).property('message').equal('failed to create user');
                done();
            })
            .catch((err) => done(err));
    });


    it('FAIL, registering is not have field', (done) => {
        request(app).post('/customer')
            .send({})
            .then((res) => {
                const body = res.body;
                expect(body).property('message').equal('failed to create user');
                done();
            })
            .catch((err) => done(err));
    });


})