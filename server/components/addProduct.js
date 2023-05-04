var express = require('express');
var router = express.Router();

const pool = require("./db");

router.post("/add_product", async function(req, res) {
  try {
    const { product_id, name, description, price, image_url, quantity, category} = req.body;
    
    // Check if a product with the same product_id already exists in the database
    const productExists = await pool.query('SELECT * FROM Products WHERE product_id = $1', [product_id]);
    if (productExists.rows.length > 0) {
      res.status(400).json({ error: 'There is another product for this product_id' });
      return;
    }
    
    const queryText = 'INSERT INTO Products (product_id, name, description, price, image_url, qt, category) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const values = [product_id, name, description, price, image_url, quantity, category];
    const result = await pool.query(queryText, values);
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
