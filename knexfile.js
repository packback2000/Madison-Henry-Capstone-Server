// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root',
      password: 'rootroot',
      database: 'madison_henry_capstone',
      charset: 'utf8',
    },
  },
};
