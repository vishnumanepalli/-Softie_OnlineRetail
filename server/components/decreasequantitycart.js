var express = require('express');
var router = express.Router();

const pool = require("./db");

router.post("/decrease_cart_item_quantity", async function(req, res) {
    try {
      const cartId = req.body.cartId;
      const productId = req.body.productId;
  
      const cartItem = await pool.query(
        "SELECT * FROM CartItems WHERE cart_id = $1 AND product_id = $2",
        [cartId, productId]
      );
  
      if (cartItem.rows.length > 0) {
        const currentQuantity = cartItem.rows[0].quantity;
        if (currentQuantity > 1) {
          const updateCartItem = await pool.query(
            "UPDATE CartItems SET quantity = quantity - 1 WHERE cart_id = $1 AND product_id = $2",
            [cartId, productId]
          );
          res.json({ success: "Product quantity decreased in cart" });
        } else {
          const deleteCartItem = await pool.query(
            "DELETE FROM CartItems WHERE cart_id = $1 AND product_id = $2",
            [cartId, productId]
          );
          res.json({ success: "Product removed from cart" });
        }
      } else {
        res.status(404).json({ error: "Product not found in cart" });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  
module.exports = router;