var express = require('express');
var router = express.Router();

const pool = require("./db");

router.post("/get_order_items", async function(req, res) {
    try {
      const order_id = req.body.order_id;
      const db_res = await pool.query(
        "SELECT oi.quantity, p.* FROM order_item oi JOIN products p ON oi.product_id = p.product_id WHERE oi.order_id = $1",
        [order_id]
      );
  
      if (db_res.rows.length > 0) {
        const orderItems = db_res.rows;
        res.json(orderItems);
        console.log(orderItems);
      } else {
        res.status(404).json({ error: "No order items found for this order" });
      }
    } catch (error) {console.error(error.message);res.status(500).json({ error: "Internal server error" });}
  });

module.exports = router;
