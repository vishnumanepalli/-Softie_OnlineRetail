var express = require("express");
var app = express();
const router = express.Router();

// cors allows communication from differnt domains(requests to our server) 
const cors = require("cors");

const PORT = process.env.PORT|| 5000

//creating middleware
app.use(cors());

//allowing us to extract json data from a request
app.use(express.json());

app.use(express.static('public'));
 
//Routes
<<<<<<< HEAD
const signUp = require('./components/auth');
router.post('/signup', signUp);

=======
  
app.use(require('./components/getProductDetails'));
app.use(require('./components/getCartIems'));
>>>>>>> bed5e318a1695079480fced26224bfa5a39e19ed
app.use(require('./components/getProducts'));
app.use(require('./components/getUsers'));
app.use(require('./components/addUser'));
app.use(require('./components/delUser'));
<<<<<<< HEAD
app.use(require('./components/auth'));
=======
app.use(require('./components/addCart'));
app.use(require('./components/getCart'));
>>>>>>> bed5e318a1695079480fced26224bfa5a39e19ed
app.listen(PORT,function(){
    console.log("Listening ");
})