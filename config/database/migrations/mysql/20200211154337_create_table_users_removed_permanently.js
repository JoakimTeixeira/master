exports.up = function(knex) {
  return knex.schema.createTable('users_removed_permanently', table => {
    table.increments('id')
    // prettier-ignore
    table.string('_id').unique().notNullable()
    table.string('name').notNullable()
    table.string('cellphone')
    table.string('password').notNullable()
    table.datetime('deleted_at').notNullable()
    table.timestamp('emitted_at').defaultTo(knex.fn.now())
    table.engine('InnoDB')
    table.charset('utf8mb4')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('users_removed_permanently')
}
