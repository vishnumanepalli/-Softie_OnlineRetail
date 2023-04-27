var express = require('express');
var router = express.Router();

const pool = require("./db");
async function createUserGoogleDb({ sub, defaultUsername, email, name }) {
    const { rows } = await pool.query(
    'insert into users (google_id, username, email, fullname) values ($1, $2, $3, $4) on conflict (email) do update set google_id = $1, fullname = $4 returning *',
    [sub, defaultUsername, email, name]
    );
    return rows[0];
    }
    
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
    'select users.*, cart.id as cart_id from users left join cart on cart.user_id = users.user_id where lower(users.username) = lower($1)',
    [username]
    );
    return user[0];
    }
    
    async function createCartDb(userId) {
    const { rows: cart } = await pool.query(
    "insert into cart (user_id) values ($1) returning cart.id",
    [userId]
    );
    
    return cart[0];
    }

    async function getUserByEmailDb(email) {
        const query = 'SELECT users.*, cart.id AS cart_id FROM users LEFT JOIN cart ON cart.user_id = users.user_id WHERE LOWER(email) = LOWER($1)';
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
    createUserDb, getUserByEmailDb, getUserByUsernameDb, createCartDb, createUserGoogleDb
  };
  




  