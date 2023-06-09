var express = require('express');
var router = express.Router();

const pool = require("./db");

router.post("/update_user",async function(req,res){
    try {
        const { user_id, username, address, city, state, country, password } = req.body;
        console.log(user_id,username)
        var db_res = await pool.query("UPDATE Users SET username = $2, address = $3, city = $4, state = $5, country = $6, password = $7 WHERE user_id = $1", [user_id, username, address, city, state, country, password]);
        //returning all the row that were updated
        var db_res2 = await pool.query("SELECT * from Users where user_id = " + user_id);
        res.json(db_res2.rows);
    } catch (error) {
        console.error(error.message);
    }
})

module.exports = router;