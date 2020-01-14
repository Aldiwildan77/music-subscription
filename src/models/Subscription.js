const knex = require('knex')(require('../../knexfile').development)

exports.up = () => {
  return knex.schema.createTable('subscriptions', table => {
    table.increments('id')
    table.string('name')
    table.string('price')
    table.bigInteger('duration')
  })
}

exports.down = () => {
  return knex.schema.dropTableIfExists('subscriptions')
}
