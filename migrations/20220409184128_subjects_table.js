
exports.up = function(knex) {
  return knex.schema
  .createTable('subjects', (table) => {
      table.increments('subject_id').primary();
      table.string('title').notNullable();
      table.increments('num_posts').notNullable();
  })
  .createTable('comments', (table) => {
    table.increments('comment_id').primary();
    table.increments('post_id').notNullable();
    table.increments('subject_id').notNullable();
    table.string('body').notNullable();
  })
  .createTable('posts', (table) =>{
      table.increments('post_id').primary();
      table.increments('subject_id').notNullable();
      table.string('body').notNullable();
      table.string('title').notNullable();
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable('subjects').dropTable('comments').dropTable('posts');
};
