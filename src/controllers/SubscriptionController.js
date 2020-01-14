const knex = require('knex')(require('../../knexfile').development)


exports.store = (req, res, next) => {
  knex('subscriptions')
    .insert({
      name: req.body.name,
      price: req.body.price,
      duration: req.body.duration
    })
    .returning(['id', 'name'])
    .then(r => {
      res.status(201).json({
        data: r[0]
      })
    })
}


exports.index = (req, res, next) => {
  knex
    .select()
    .from('subscriptions')
    .then(r => {
      res.status(200).json({
        data: r
      })
    })
}


exports.show = (req, res, next) => {
  knex
    .select()
    .from('subscriptions')
    .where('id', req.params.id)
    .first()
    .then(r => {
      res.status(200).json({
        data: r
      })
    })
}
