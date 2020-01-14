const knex = require('knex')(require('../../knexfile').development)


exports.store = (req, res, next) => {
  knex('transactions')
    .insert({
      customer_id: req.body.customer_id,
      subscription_id: req.body.subscription_id,
      total: req.body.total
    })
    .returning('id')
    .then(r => {
      knex
        .select('balance')
        .from('customers')
        .where('id', req.body.customer_id)
        .first()
        .then(r => r.balance)
        .then(r => {
          knex('customers')
            .where('id', req.body.customer_id)
            .update({
              balance: (parseInt(r) - parseInt(req.body.total))
            }, 'balance')
            .then(r => {
              console.log(r)
            })
            .catch(e => {
              console.log(e)
            })
        })
        .catch(e => {
          console.log(e)
        })
      
      res.status(201).json({
        data: {
          id: r[0]
        }
      })
    })
}


exports.index = (req, res, next) => {
  knex
    .select()
    .from('transactions')
    .then(r => {
      res.status(200).json({
        data: r
      })
    })
}


exports.show = (req, res, next) => {
  knex
    .select()
    .from('transactions')
    .where('id', req.params.id)
    .first()
    .then(r => {
      res.status(200).json({
        data: r
      })
    })
}
