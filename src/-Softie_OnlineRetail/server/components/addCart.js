var express = require('express');
var router = express.Router();

const pool = require("./db");

// to add a user 
router.post("/cart",async function(req,res){
    try {
        // Get the available quantity for the product
        var str_query1 = "SELECT qt from Products where product_id = $1";
        const db_res1 = await pool.query(str_query1, [req.body.product_id]);
        const quantity_available = db_res1.rows[0].qt;
        console.log(quantity_available)
        // Get the quantity of the product in the cart
        var str_query2 = "SELECT quantity from CartItems where user_id = $1 AND product_id = $2";
        const db_res2 = await pool.query(str_query2, [req.body.user_id, req.body.product_id]);
        var quantity_in_cart = 0;
        if (db_res2.rows.length > 0) {
            quantity_in_cart = db_res2.rows[0].quantity;
        }
        console.log(quantity_in_cart)
        // Add the product to the cart if there is enough quantity available
        if (quantity_available > quantity_in_cart) {
            if (db_res2.rows.length === 0) {
                var str_query3 = "INSERT INTO CartItems (user_id, product_id, quantity) VALUES ($1, $2, $3) returning *";
                const db_res3 = await pool.query(str_query3, [req.body.user_id, req.body.product_id, 1]);
                console.log(str_query3);
                res.json(db_res3.rows);
            } else {
                var str_query4 = "UPDATE CartItems SET quantity = quantity + 1 WHERE user_id = $1 AND product_id = $2 returning *";
                const db_res4 = await pool.query(str_query4, [req.body.user_id, req.body.product_id]);
                console.log(str_query4);
                res.json(db_res4.rows);
            }
        } else {
            res.status(400).json({ error: "Not enough quantity available" });
        }
    } catch (error) {
        console.error(error.message);
    }
})

module.exports = router;
