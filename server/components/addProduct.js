var express = require('express');
var router = express.Router();

const pool = require("./db");

router.post("/add_product", async function(req, res) {
  try {
    const { product_id, name, description, price, image_url, quantity} = req.body;
    const queryText = 'INSERT INTO Products (product_id, name, description, price, image_url, qt) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const values = [product_id, name, description, price, image_url, quantity];
    const result = await pool.query(queryText, values);
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
