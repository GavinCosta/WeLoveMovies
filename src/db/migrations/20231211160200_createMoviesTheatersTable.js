
exports.up = function(knex) {
  return knex.schema.createTable("movies_theaters", (table) => {
    table.integer('movie_id').unsigned().references('movies.id')
    table.integer('theater_id').unsigned().references('theaters.id')
    table.boolean('is_showing').notNullable().defaultTo(false)
    table.timestamps(true, true)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("movies_theaters")
};
