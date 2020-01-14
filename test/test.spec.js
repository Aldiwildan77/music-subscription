const knex = require('knex')(require('../knexfile').development)
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const axios = require('axios').create({
  baseURL: 'http://localhost:3000',
  timeout: 10000
})

chai.use(chaiAsPromised)
const expect = chai.expect

const customer = require('../src/models/Customer')
const subscription = require('../src/models/Subscription')
const transaction = require('../src/models/Transaction')

describe('Model', () => {
  async function cleanUp() {
    await knex.schema.dropTableIfExists('transactions')
    await knex.schema.dropTableIfExists('customers')
    await knex.schema.dropTableIfExists('subscriptions')
    return
  }

  before(cleanUp)
  after(cleanUp)

  describe('Customer', () => {
    describe('up', () => {
      it('should be a function', () => {
        expect(customer.up).to.be.a('Function')
      })

      it('should return a promise', () => {
        const customerUpResult = customer.up()
        expect(customerUpResult.then).to.be.a('Function')
        expect(customerUpResult.catch).to.be.a('Function')
      })

      it('should create a table name \'customers\'', function * () {
        yield customer.up()

        return expect(knex.schema.hasTable('customers'))
          .to.eventually.be.true
      })
    })
  })

  describe('subscription', () => {
    describe('up', () => {
      it('should be a function', () => {
        expect(subscription.up).to.be.a('Function')
      })

      it('should return a promise', () => {
        const subscriptionUpResult = subscription.up()
        expect(subscriptionUpResult.then).to.be.a('Function')
        expect(subscriptionUpResult.catch).to.be.a('Function')
      })

      it('should create a table name \'subscriptions\'', function * () {
        yield subscription.up()

        return expect(knex.schema.hasTable('subscriptions'))
          .to.eventually.be.true
      })
    })
  })

  describe('transaction', () => {
    describe('up', () => {
      it('should be a function', () => {
        expect(transaction.up).to.be.a('Function')
      })

      it('should return a promise', () => {
        const transactionUpResult = transaction.up()
        expect(transactionUpResult.then).to.be.a('Function')
        expect(transactionUpResult.catch).to.be.a('Function')
      })

      it('should create a table name \'transactions\'', function * () {
        yield transaction.up()

        return expect(knex.schema.hasTable('transactions'))
          .to.eventually.be.true
      })
    })
  })
})

describe('api', () => {
  async function cleanUp() {
    await knex.schema.dropTableIfExists('transactions')
    await knex.schema.dropTableIfExists('customers')
    await knex.schema.dropTableIfExists('subscriptions')
    return
  }

  before(async() => {
    await customer.up()
    await subscription.up()
    await transaction.up()
  })
  after(cleanUp)

  describe('customers', () => {
    describe('registering a new customer', () => {
      it('should return an id', (done) => {
        axios
          .post('/customer/register', {
            name: 'AzizFM',
            email: 'aziz.fm@example.com',
            phone: '6285842345510'
          })
          .then(r => r.data)
          .then(r => {
            expect(r).to.be.eql({"data":{"id":1}})
            done()
          })
          .catch(err => {
            done(err)
          })
      })
    })

    describe('topup a registered customer', () => {
      it('should return current balance of a customer', (done) => {
        axios
          .post('/customer/topup', {
            customer_id: 1,
            amount: 100000
          })
          .then(r => r.data)
          .then(r => {
            expect(r).to.be.eql({"data":{"balance":"100000.00"}})
            done()
          })
          .catch(err => {
            done(err)
          })
      })
    })

    describe('show debit of a registered customer', () => {
      it('should return all customer data', (done) => {
        axios
          .get('/customer/debit')
          .then(r => r.data)
          .then(r => {
            expect(r).to.be.eql({"data":[{"id":1,"name":"AzizFM","email":"aziz.fm@example.com","phone":"6285842345510","balance":"100000.00"}]})
            done()
          })
          .catch(err => {
            done(err)
          })
      })
    })
  })

  describe('subscription', () => {
    describe('create a new subscription', () => {
      it('should create a new subscription', (done) => {
        axios
          .post('/subscription', {
            name: 'Baby',
            price: '20000',
            duration: 30
          })
          .then(r => r.data)
          .then(r => {
            expect(r).to.be.eql({"data":{"id":1,"name":"Baby"}})
            done()
          })
          .catch(err => {
            done(err)
          })
      })
    })

    describe('get all subscriptions', () => {
      it('should return all subscriptions', (done) => {
        axios
          .get('/subscription')
          .then(r => r.data)
          .then(r => {
            expect(r).to.be.eql({"data":[{"id":1,"name":"Baby","price":"20000","duration":"30"}]})
            done()
          })
          .catch(err => {
            done(err)
          })
      })
    })

    describe('get one subscription', () => {
      it('should return one subscription', (done) => {
        axios
          .get('/subscription/1')
          .then(r => r.data)
          .then(r => {
            expect(r).to.be.eql({"data":{"id":1,"name":"Baby","price":"20000","duration":"30"}})
            done()
          })
          .catch(err => {
            done(err)
          })
      })
    })
  })

  describe('transaction', () => {
    describe('create a new payment', () => {
      it('should create a new transaction', (done) => {
        axios
          .post('/transaction/payment', {
            customer_id: 1,
            subscription_id: 1,
            total: 20000
          })
          .then(r => r.data)
          .then(r => {
            expect(r).to.be.eql({"data":{"id":1}})
            done()
          })
          .catch(err => {
            done(err)
          })
      })
    })

    describe('renew payment', () => {
      it('should create a new transaction', (done) => {
        axios
          .post('/transaction/payment', {
            customer_id: 1,
            subscription_id: 1,
            total: 20000
          })
          .then(r => r.data)
          .then(r => {
            expect(r).to.be.eql({"data":{"id":2}})
            done()
          })
          .catch(err => {
            done(err)
          })
      })
    })

    describe('get all transactions', () => {
      it('should return all transactions', (done) => {
        axios
          .get('/transaction')
          .then(r => r.data)
          .then(r => {
            expect(r).to.be.eql({"data":[{"id":1,"customer_id":"1","subscription_id":"1","total":"20000.00"},{"id":2,"customer_id":"1","subscription_id":"1","total":"20000.00"}]})
            done()
          })
          .catch(err => {
            done(err)
          })
      })
    })

    describe('get one transaction', () => {
      it('should return one transaction', (done) => {
        axios
          .get('/transaction/1')
          .then(r => r.data)
          .then(r => {
            expect(r).to.be.eql({"data":{"id":1,"customer_id":"1","subscription_id":"1","total":"20000.00"}})
            done()
          })
          .catch(err => {
            done(err)
          })
      })
    })
  })
})
