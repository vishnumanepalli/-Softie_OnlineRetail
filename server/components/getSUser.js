var express = require('express');
var router = express.Router();

const pool = require("./db");

router.post("/get_s_user",async function(req,res){
    try {
        // the data we get from request , just printing it 
        console.log(req.body);
        
        var db_res3 = await pool.query("SELECT * from Users where user_id = " + req.body.user_id);
        //returning all the row that were inserted
        res.json(db_res3.rows);
        console.log(db_res3.rows)
    
    } catch (error) {console.error(error.message);}
})

module.exports = router;