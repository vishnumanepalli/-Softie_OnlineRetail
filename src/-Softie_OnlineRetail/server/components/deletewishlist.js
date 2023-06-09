var express = require('express');
var router = express.Router();

const pool = require("./db");

router.delete("/delete_from_wishlist", async function(req, res) {
    try {
      // Get the user ID and product ID from the request body
      const userId = req.body.userId;
      const productId = req.body.productId;
  
      // Query the database to check if the product is in the user's wishlist
      const wishlist_res = await pool.query(
        "SELECT * FROM  Wishlists WHERE user_id = $1 AND product_id = $2",
        [userId, productId]
      );
  
      // If the product is in the wishlist, delete it
      if (wishlist_res.rows.length > 0) {
        const delete_res = await pool.query(
          "DELETE FROM  Wishlists WHERE user_id = $1 AND product_id = $2",
          [userId, productId]
        );
        res.json({ success: "Product removed from wishlist" });
      } else {
        // Otherwise, return a 404 error
        res.status(404).json({ error: "Product not found in wishlist" });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  });  

module.exports = router;