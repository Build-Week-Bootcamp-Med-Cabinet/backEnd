const knex = require('knex');
const knexfile = require('../knexfile');

const db = knex(knexfile[process.env.DB_ENV || 'development']);

module.exports = db;
