var express = require('express');
var router = express.Router();

const pool = require("./db");

// to delete all products from a cart and create a new order
router.post("/emptycart", async function(req, res) {
    try {
        const user_id = req.body.user_id;

        // insert new order into orders table
        const order_query = "INSERT INTO orders (user_id) VALUES ($1) RETURNING order_id";
        const order_res = await pool.query(order_query, [user_id]);
        const order_id = order_res.rows[0].order_id;

        // move cart items to order items
        const cart_query = "INSERT INTO order_item (order_id, product_id, quantity) SELECT $1, product_id, quantity FROM cartitems WHERE user_id = $2";
        const cart_res = await pool.query(cart_query, [order_id, user_id]);

        const update_query = "UPDATE products SET qt = qt - (SELECT quantity FROM cartitems WHERE user_id = $1 AND product_id = products.product_id) WHERE product_id IN (SELECT product_id FROM cartitems WHERE user_id = $1)";
        const update_res = await pool.query(update_query, [user_id]);

        // empty cart
        const delete_query = "DELETE FROM cartitems WHERE user_id = $1";
        const delete_res = await pool.query(delete_query, [user_id]);

        res.json({ message: "Products deleted and order created successfully" });
    } catch (error) {
        console.error(error.message);
    }
});  

module.exports = router;

