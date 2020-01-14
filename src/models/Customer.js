const knex = require('knex')(require('../../knexfile').development)

exports.up = () => {
  return knex.schema.createTable('customers', table => {
    table.increments('id')
    table.string('name')
    table.string('email')
    table.bigInteger('phone')
    table.decimal('balance').defaultTo(0)
  })
}

exports.down = () => {
  return knex.schema.dropTableIfExists('customers')
}
