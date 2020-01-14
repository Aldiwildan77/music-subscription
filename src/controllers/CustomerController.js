const knex = require('knex')(require('../../knexfile').development)

exports.register = (req, res, next) => {
  knex('customers')
    .insert({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone
    })
    .returning('id')
    .then(r => {
      res.status(201).json({
        data: {
          id: r[0]
        }
      })
    })
}


exports.topup = (req, res, next) => {
  knex
    .select('balance')
    .from('customers')
    .where('id', req.body.customer_id)
    .first()
    .then(r => r.balance)
    .then(r => {
      return knex('customers')
        .where('id', req.body.customer_id)
        .update({
          'balance': (parseInt(r) + parseInt(req.body.amount))
        }, 'balance')
        .then(r => {
          return res.json({
            data: {
              balance: r[0]
            }
          })
        })
    })
}


exports.debit = (req, res, next) => {
  knex
    .select()
    .from('customers')
    .then(r => {
      return res.json({
        data: r
      })
    })
}
