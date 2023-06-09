var express = require('express');
var router = express.Router();

const pool = require("./db");

router.post("/get_wishlist", async function(req, res) {
    try {
      // Get the user ID from the request body
      const userId = req.body.userId;
      // Query the database for the items in the user's wishlist
      const db_res = await pool.query(
        "SELECT w.*, p.* FROM  Wishlists w JOIN Products p ON w.product_id = p.product_id WHERE w.user_id = $1",
        [userId]
      );
  
      // If the wishlist contains items, return their details
        const wishlistItems = db_res.rows;
        res.json(wishlistItems);
        console.log(wishlistItems);
        
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }); 
  
module.exports = router;
