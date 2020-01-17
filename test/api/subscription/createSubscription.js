const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../App');
const conn = require('../../../src/index');

describe('POST /subscription', () => {
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


    it('OK, create a new subscription works', (done) => {
        request(app).post('/subscription')
            .send({
                name: 'Silver',
                price: 60000,
                duration: 15
            })
            .then((res) => {
                const body = res.body.result;
                expect(body).to.contain.property('_id')
                expect(body).to.contain.property('name')
                expect(body).to.contain.property('price')
                expect(body).to.contain.property('duration')
                done();
            })
            .catch((err) => done(err));
    });



    it('FAIL, subscription is empty field', (done) => {
        request(app).post('/subscription')
            .send({})
            .then((res) => {
                const body = res.body;
                expect(body).property('message').equal("field not valid");
                done();
            })
            .catch((err) => done(err));
    });


    it('FAIL, subscription is wrong field', (done) => {
        request(app).post('/subscription')
            .send({
                name: 'Gold',
                price: 'seribu',
                duration: 'seminggu'
            })
            .then((res) => {
                const body = res.body;
                expect(body).property('message').equal("field not valid");
                done();
            })
            .catch((err) => done(err));
    });

})