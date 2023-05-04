const Pool = require("pg").Pool;

require("dotenv").config();

const pool = new Pool({
    user: "postgres",
    password: "tango",
    host: "localhost",
    port: 5432,
    database: "softi"
} );

module.exports = pool;