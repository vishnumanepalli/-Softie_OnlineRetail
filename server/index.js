var express = require("express");
var app = express();

const pool = require("./components/db");

require("dotenv").config();

const devconfig={
    user: "postgres",
    password: "123",
    host: "localhost",
    port: 5432,
    database: "rnd"
}

const proConfig={
    connectionString: process.env.DATABASE_URL,
    ssl: true
}

// const pool = new Pool({
    
//     connectionString:"postgres://hjzkfaxfmpyjjo:6cf4a3fc572c16c2360d1536115d1d52abbfd38e7ca7b586b36a3a86330e4d67@ec2-52-54-212-232.compute-1.amazonaws.com:5432/d756afv3qeuka0",
//     ssl: {
//         rejectUnauthorized: false,
//     },
// } );

// module.exports = devconfig;


const getProducts = require('./components/getProducts');

// cors allows communication from differnt domains(requests to our server) 
const cors = require("cors");

const PORT = process.env.PORT|| 5000

//creating middleware
app.use(cors());


const jwt = require("jsonwebtoken")

const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client("84294184491-0n3vkd0vr2taefrmv0g5se53h4cbe2ds.apps.googleusercontent.com")

//allowing us to extract json data from a request
app.use(express.json());

app.use(express.static('public'));


function verifyToken(req,res,next){
    // extracting token from the header of the request 
    const token = req.headers["jwt-token"]

    if(!token){
        // if token not received then send a msg that we need token
        res.send("Please supply token")
    }
    else{
        // else verify that the token is correct 

        jwt.verify(token ,"jwtTempSecret",(err,authData)=>{
            if(err){
                res.json({
                    auth:false,
                    message : "authentication failure"
                })
            }
            else 
            {
                //go to next in case the token is verified 
                next();
            }
        })
    }
}


app.post("/test_temp",verifyToken,(req,res)=>{
    res.json(699)
})

app.post("/authenticate",async function(req,res){
    try {
        
        // the body that we received 

        var query2 = "SELECT * FROM users where email_id = '"
        query2 = query2.concat(req.body.email)
        query2 = query2.concat("'")

        console.log(query2);

        const db_res = await pool.query(query2)
        
        if(db_res.rows[0]==undefined)
        {
            // if the user himself is not valid then send -1
            res.json(-1);    
        }
        else{

            console.log(req.body)

            const {token} = req.body;
            
            // verifying the google login sent 
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: "84294184491-0n3vkd0vr2taefrmv0g5se53h4cbe2ds.apps.googleusercontent.com"
            });

            // making jwt token 

            const email_id = db_res.rows[0].email_id;
            const jwt_token = jwt.sign({email_id},"jwtTempSecret",{
                // value 300 corresponds to 5 mins 
                expiresIn: 18000
            })


            res.json({
                auth: true,
                token : jwt_token,
            })      
            
        }        
 
    } catch (error) {
        console.error(error.message);
    }
})


//Routes

app.post("/get_products",verifyToken,getProducts.getProducts);

app.get("/final_deploy_test",(req,res)=>{
    
  
    res.send("SERVER UP");

})

app.listen(PORT,function(){
    console.log("Listening ");
})