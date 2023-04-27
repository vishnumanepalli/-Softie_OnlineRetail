var express = require('express');
var router = express.Router();

const pool = require("./db");

// to add a user 
router.post("/get_cart",async function(req,res){
    try {
        var email = req.body.email//for now
        var index = email.indexOf("@")
        var str_query = "SELECT * FROM p_";
        str_query=str_query.concat(email.substring(0,index));
        str_query= str_query.concat("_cart");
        console.log(str_query);
        const db_res= await pool.query(str_query)

        res.json(db_res.rows);
        console.log(db_res.rows)
    
    } catch (error) {
        console.error(error.message);
    }
})

module.exports = router;