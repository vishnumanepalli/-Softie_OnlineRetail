var express = require('express');
var router = express.Router();

const pool = require("./db");
router.post('/search_product', (req, res) => {
  const searchText = req.body.searchText;
  const queryString = "SELECT * FROM Products WHERE name ILIKE '%' || $1 || '%' OR description ILIKE '%' || $1 || '%'";
  pool.query(queryString, [searchText], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (results.rows.length>0){
        res.json({ results: results.rows });
      }
      else{
          res.status(404).json({ error: "Product not found" });
      }
      
    }
  });
});


// router.post("/search_product", async function(req, res) {
//     // try {
//     //   const searchText = req.body.searchText;
  
//     //   const db_res = await pool.query(
//     //     "SELECT * FROM Products WHERE name ILIKE '%' || $1 || '%' OR description ILIKE '%' || $1 || '%'",
//     //     [searchText]
//     //   );
//     const searchText = req.body.searchText;
//     const query = `SELECT * FROM Products WHERE name ILIKE '%' || $1 || '%' OR description ILIKE '%' || $1 || '%'`;
//     try {
//       const db_res = await pool.query(query, [searchText]);

//       if (db_res.rows.length > 0) {
//         res.json(db_res.rows);
//         console.log(db_res.rows);
//       } else {
//         res.status(404).json({ error: "Product not found" });
//       }
//     } catch (error) {
//       console.error(error.message);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   });

module.exports = router;
