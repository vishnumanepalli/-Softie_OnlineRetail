var express = require('express');
var router = express.Router();

const pool = require("./db");

router.post("/get_cartitems", async function(req, res) {
    try {
      // Get the cart ID from the request body
      const user_id = req.body.user_id;
      // Query the database for the items in the specified cart
      const db_res = await pool.query(
        "SELECT c.quantity, p.* FROM CartItems c JOIN Products p ON c.product_id = p.product_id WHERE c.user_id = $1",
        [user_id]
      );
  
      // If the cart contains items, return their details
      if (db_res.rows.length > 0) {
        const cartItems = db_res.rows;
        res.json(cartItems);
        console.log(cartItems);
      } else {
        // Otherwise, return a 404 error
        res.status(404).json({ error: "Cart not found" });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }); 
  
module.exports = router;