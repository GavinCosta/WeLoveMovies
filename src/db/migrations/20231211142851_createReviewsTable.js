
exports.up = function(knex) {
  return knex.schema.createTable('reviews', (table) => {
    table.increments('review_id').primary()
    table.text('content')
    table.integer('score')
    table.integer('critic_id').unsigned().references('critics.id')
    table.integer('movie_id').unsigned().references('movies.id')
    table.timestamps(true, true)
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable('reviews')
};
