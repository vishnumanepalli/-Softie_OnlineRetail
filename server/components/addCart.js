var express = require('express');
var router = express.Router();

const pool = require("./db");

// to add a user 
router.post("/cart",async function(req,res){
    try {
        var str_query = "SELECT quantity from CartItems where cart_id = $1 AND product_id = $2";
        const db_res= await pool.query(str_query, [req.body.cart_id,req.body.product_id]);
        
        console.log(str_query);
        console.log(db_res.rows)
        
        // Add the product to the cart if it doesn't exist
        if (db_res.rows.length === 0) {
            var str_query2 = "INSERT INTO CartItems (cart_id, product_id, quantity) VALUES ($1, $2, $3) returning *";
            const db_res2 = await pool.query(str_query2, [req.body.cart_id, req.body.product_id, 1]);
            console.log(str_query2);
            res.json(db_res2.rows);
        } else {
            // Otherwise, update the quantity of the existing product
            var str_query3 = "UPDATE CartItems SET quantity = quantity + 1 WHERE cart_id = $1 AND product_id = $2 returning *";
            const db_res3 = await pool.query(str_query3, [req.body.cart_id, req.body.product_id]);
            console.log(str_query3);
            res.json(db_res3.rows);
        }
    } catch (error) {
        console.error(error.message);
    }
})

module.exports = router;
