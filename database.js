var config = require('./knexfile')[process.env.NODE_ENV || 'development'];

var knex = require('knex')(config);
var bookshelf = require('bookshelf')(knex);

bookshelf.model();

module.exports = bookshelf;