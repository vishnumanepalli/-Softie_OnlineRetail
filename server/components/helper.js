var express = require('express');
var router = express.Router();

const pool = require("./db");

const getUserByEmailDb = async (email) => {
    const query = `
      SELECT users.*, cart.id AS cart_id 
      FROM users 
      LEFT JOIN cart ON cart.user_id = users.user_id 
      WHERE lower(email) = lower($1)
    `;
    const values = [email];
  
    try {
      const { rows: user } = await pool.query(query, values);
      console.log("check");
      return user[0];
    } catch (error) {
      console.error(error);
      throw new Error("Failed to get user by email");
    }
  };
  