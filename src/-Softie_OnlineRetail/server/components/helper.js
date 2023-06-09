var express = require('express');
var router = express.Router();

const pool = require("./db");
    
    async function createUserDb({ username, password, email, fullname }) {
        console.log("11");
    const { rows: user } = await pool.query(
    'insert into users (username, password, email, fullname) values ($1, $2, $3, $4) returning user_id, username, email, fullname, roles, address, city, state, country, created_at',
    [username, password, email, fullname]
    );
    return user[0];
    }
    
    async function getUserByUsernameDb(username) {
      const { rows: user } = await pool.query(
        'SELECT * FROM users WHERE lower(username) = lower($1)',
        [username]
      );
      return user[0];
    }    
    

    async function getUserByEmailDb(email) {
      const query = 'SELECT * FROM users WHERE LOWER(email) = LOWER($1)';
      const values = [email];
    
      try {
        const { rows: user } = await pool.query(query, values);
        console.log("check");
        return user[0];
      } catch (error) {
        console.error(error);
        throw new Error("Failed to get user by email");
      }
    }
  module.exports = {
    createUserDb, getUserByEmailDb, getUserByUsernameDb
  };
  




  