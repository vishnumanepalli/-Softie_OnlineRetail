var express = require("express");
var app = express();
const router = express.Router();
const bodyParser = require('body-parser');


app.use(bodyParser.json());

// cors allows communication from differnt domains(requests to our server) 
const cors = require("cors");



//creating middleware
app.use(cors());

//allowing us to extract json data from a request
app.use(express.json());

app.use(express.static('public'));
 
//Routes
const signUp = require('./components/auth');
//router.post('/signup', signUp);
app.use(require('./components/getProductDetails'));
app.use(require('./components/getProducts'));
app.use(require('./components/addCart'));
app.use(require('./components/getCartIems'));
app.use(require('./components/auth'));
app.use(require('./components/addwishlist'));
app.use(require('./components/deletewishlist'));
app.use(require('./components/deletefromcart'));
app.use(require('./components/getwhishlistitems'));
app.use(require('./components/getSUser'));
app.use(require('./components/updateUser'));
app.use(require('./components/getorders'));
app.use(require('./components/getorderitems'));
app.use(require('./components/addProduct'));
app.use(require('./components/decreasequantitycart'));
app.use(require('./components/checkout'));

// const PORT = process.env.PORT|| 5000
// app.listen(PORT,function(){
//     console.log("Listening on port "+PORT);
// })
module.exports= app;
