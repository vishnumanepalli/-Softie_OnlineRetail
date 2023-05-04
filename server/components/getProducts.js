var express = require('express');
var router = express.Router();

const pool = require("./db");

router.post("/get_products",async function(req,res){
    try {
        // the data we get from request , just printing it 
        console.log(req.body);
        const { searchText } = req.body;
        
        let db_res3;
        if (searchText !== '') {
            db_res3 = await pool.query("SELECT * FROM Products WHERE name ILIKE '%' || $1 || '%' OR description ILIKE '%' || $1 || '%' OR category ILIKE '%' || $1 || '%'", [`%${searchText}%`]);
        } else {
            db_res3 = await pool.query("SELECT * from Products");
        }
        //returning all the row that were inserted
        res.json(db_res3.rows);
        // console.log(db_res3.rows)
    
    } catch (error) {
        console.error(error.message);
    }
})

module.exports = router;