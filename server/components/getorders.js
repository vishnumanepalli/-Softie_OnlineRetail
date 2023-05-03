var express = require('express');
var router = express.Router();

const pool = require("./db");

router.post("/get_all_orders", async function(req, res) {
    try {
        const user_id = req.body.user_id;
        const db_res = await pool.query(
        "SELECT * FROM orders WHERE user_id = $1",
        [user_id]
      );
  
      if (db_res.rows.length > 0) {
        const orders = db_res.rows;
        res.json(orders);
        console.log(orders);
      } else {
        res.status(404).json({ error: "No orders found for this user" });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  });

module.exports = router;