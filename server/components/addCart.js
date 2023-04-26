var express = require('express');
var router = express.Router();

const pool = require("./db");

// to add a user 
router.post("/cart",async function(req,res){
    try {
        // the data we get from request , just printing it 
        console.log(req.body);

        // running the insert command 
        // const db_res = await pool.query(" INSERT INTO Users(username, password, email, fullname, roles) VALUES ($1, $2, $3, $4, $5) returning * ",[req.body.username,req.body.password,req.body.email,req.body.fullname,req.body.role]);
        
        // // creating a table for this prof:-
        // if(req.body.admin==2 || req.body.admin==3){
        //     // first extracting the entry number

        // var email = req.body.email;
        var email = "2020csb1097@iitrpr.ac.in"//for now
        var index = email.indexOf("@")
        var str_query = "SELECT count(*) from p_";
        str_query=str_query.concat(email.substring(0,index));
        str_query = str_query.concat("_cart where product_id = $1");
        const db_res= await pool.query(str_query, [req.body.product_id]);
        
        // str_query=str_query.concat(" (product_id, product_name, quantity) VALUES ($1, $2, $3) returning * ",[req.body.email, req.body.title, req.body.quantity]);
        console.log(str_query);
        // const db_res= await pool.query(str_query)
        console.log(db_res.rows)
        //need modification still

            var email = "2020csb1097@iitrpr.ac.in"//for now
            var index = email.indexOf("@")
            var str_query = "INSERT INTO p_";
            str_query=str_query.concat(email.substring(0,index));
            str_query= str_query.concat("_cart");
            str_query=str_query.concat(" (product_id, product_name, quantity) VALUES ($1, $2, $3) returning * ");
            console.log(str_query,[req.body.product_id, req.body.title, 1]);
            const db_res2= await pool.query(str_query,[req.body.product_id, req.body.title, 1])
        // }        

        var db_res3 = await pool.query("SELECT * from users");
        //returning all the row that were inserted
        res.json(db_res3.rows);
    
    } catch (error) {
        console.error(error.message);
    }
})

module.exports = router;