var express = require('express');
var router = express.Router();

const pool = require("./db");

router.post("/delete_product", async function(req, res) {
    try {
      const product_id  = req.body.product_id;
      const queryText = 'DELETE FROM Products WHERE product_id = $1';
      const values = [product_id];
      const result = await pool.query(queryText, values);
      res.json({ message: `Product with ID ${product_id} deleted` });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  });
  
module.exports = router;