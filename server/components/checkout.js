var express = require('express');
var router = express.Router();

const pool = require("./db");

// to delete all products from a cart
router.post("/emptycart", async function(req, res) {
    try {
      const user_id = req.body.user_id;
      const str_query = "DELETE FROM cartitems WHERE user_id = $1";
      const db_res = await pool.query(str_query, [user_id]);
      console.log(str_query);
      res.json({ message: "Products deleted successfully" });
    } catch (error) {
      console.error(error.message);
    }
  });  

module.exports = router;
