const { Pool } = require("pg");

var connection = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '086638246ITC',
    database: 'inbiznest_lock_phone',
    port: '5432'
});

module.exports = connection;
