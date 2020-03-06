const knex = require('knex');
const knexfile = require('../knexfile');

const environment = process.env.ENVIRONMENT;

module.exports = knex(knexfile[environment]);
