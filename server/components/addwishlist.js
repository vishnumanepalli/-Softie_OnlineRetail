var express = require('express');
var router = express.Router();

const pool = require("./db");

router.post("/add_to_wishlist", async function(req, res) {
  try {
    // Get the user ID and product ID from the request body
    const userId = req.body.userId;
    const productId = req.body.productId;

    // Check if the product exists in the database
    const db_res = await pool.query(
      "SELECT * FROM Products WHERE product_id = $1",
      [productId]
    );
    
    // If the product does not exist, return a 404 error
    if (db_res.rows.length === 0) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    // Check if the user already has the product in their wishlist
    const wishlist_res = await pool.query(
      "SELECT * FROM  Wishlists WHERE user_id = $1 AND product_id = $2",
      [userId, productId]
    );

    // If the user already has the product in their wishlist, return an error
    if (wishlist_res.rows.length > 0) {
      res.status(400).json({ error: "Product already in wishlist" });
      return;
    }

    // Add the product to the user's wishlist
    const insert_res = await pool.query(
      "INSERT INTO  Wishlists (user_id, product_id) VALUES ($1, $2)",
      [userId, productId]
    );

    res.json({ message: "Product added to wishlist" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;