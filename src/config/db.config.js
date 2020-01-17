const { Pool } = require("pg");

var connection = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '086638246itc',
    database: 'users',
    port: '5432'
});

module.exports = connection;
