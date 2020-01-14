const knex = require('knex')(require('../../knexfile').development)

exports.up = () => {
  return knex.schema.createTable('transactions', table => {
    table.increments('id')
    table.bigInteger('customer_id')
      .unsigned()
      .references('customers.id')
    table.bigInteger('subscription_id')
      .unsigned()
      .references('subscriptions.id')
    table.decimal('total')
  })
}


exports.down = () => {
  return knex.schema.dropTableIfExists('transactions')
}
