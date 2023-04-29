var express = require('express');
var router = express.Router();

const pool = require("./db");

// to delete all products from a cart
router.delete("/emptycart", async function(req, res) {
    try {
      const cart_id = req.body.cartId;
      const str_query = "DELETE FROM cartitems WHERE cart_id = $1";
      const db_res = await pool.query(str_query, [cart_id]);
      console.log(str_query);
      res.json({ message: "Products deleted successfully" });
    } catch (error) {
      console.error(error.message);
    }
  });  

module.exports = router;
