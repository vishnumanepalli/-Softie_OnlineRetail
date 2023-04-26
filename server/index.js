var express = require("express");
var app = express();

// cors allows communication from differnt domains(requests to our server) 
const cors = require("cors");

const PORT = process.env.PORT|| 5000

//creating middleware
app.use(cors());

//allowing us to extract json data from a request
app.use(express.json());

app.use(express.static('public'));
 
//Routes
  
app.use(require('./components/getProductDetails'));
app.use(require('./components/getProducts'));
app.use(require('./components/getUsers'));
app.use(require('./components/addUser'));
app.use(require('./components/delUser'));
app.use(require('./components/addCart'));
app.use(require('./components/getCart'));
app.listen(PORT,function(){
    console.log("Listening ");
})