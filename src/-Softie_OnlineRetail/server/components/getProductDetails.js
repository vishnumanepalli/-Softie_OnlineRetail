var express = require('express');
var router = express.Router();

const pool = require("./db");

router.post("/get_productdetails", async function(req, res) {
    try {
      // Get the product ID from the request body
      const productId = req.body.productId;
      // Query the database for the product with the specified ID
      const db_res = await pool.query(
        "SELECT * FROM Products WHERE product_id = $1",
        [productId]
      );
  
      // If the product exists, return its details
      if (db_res.rows.length > 0) {
        const product = db_res.rows[0];
        res.json(product);
        console.log(product);
      } else {
        // Otherwise, return a 404 error
        res.status(404).json({ error: "Product not found" });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  });  

module.exports = router;