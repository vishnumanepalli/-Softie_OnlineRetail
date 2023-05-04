const Pool = require("pg").Pool;

require("dotenv").config();

const pool = new Pool({
    user: "postgres",
    password: "vis",
    host: "localhost",
    port: 5432,
    database: "Softie"
} );

module.exports = pool;