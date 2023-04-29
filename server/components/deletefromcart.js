var express = require('express');
var router = express.Router();

const pool = require("./db");

router.delete("/delete_from_cart", async function(req, res) {
    try {
      const cartId = req.body.cartId;
      const productId = req.body.productId;
  
      const cartItem = await pool.query(
        "SELECT * FROM  cartitems WHERE cart_id = $1 AND product_id = $2",
        [cartId, productId]
      );
  
      if (cartItem.rows.length > 0) {
        const deleteCartItem = await pool.query(
          "DELETE FROM  cartitems WHERE cart_id = $1 AND product_id = $2",
          [cartId, productId]
        );
        res.json({ success: "Product removed from cart" });
      } else {
        res.status(404).json({ error: "Product not found in cart" });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
module.exports = router;