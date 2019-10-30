var express = require('express');
var app = express();
// app.set('view engine', 'ejs');
// var main = require('./routes/router.js');
var bodyParser = require("body-parser");
// app.use('/',main);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var utils = require('.//utils/data')

app.get('/products', function(req, res) {
  result = utils.getData();
  console.log("> Products GET: Request recieved");
  console.log("< Products GET: Sending response");
  console.log("\nProcessed request count, GET: " + utils.increment_get() + " POST: " + utils.count_post() + " DELETE: " + utils.count_delete());

  res.send(result);
});


app.post('/products', function(req, res) {

  console.log("req body is " + typeof(req.body.product));
  var input = { 'product' : req.body.product, 'price': req.body.price, "category": req.body.category};

  result = utils.putData(input);
  console.log("> Products POST: Request recieved");
  console.log("< Products POST: Sending response");

  console.log("\nProcessed request count, GET: " + utils.count_get() + " POST: " + utils.increment_post()+ " DELETE: " + utils.count_delete());
  res.send(result);
});

app.delete('/products', function(req, res) {
  result = utils.deleteData();

  console.log("> Products DELETE: Request recieved");
  console.log("< Products DELETE: Sending response");

  console.log("\nProcessed request count, GET: " + utils.count_get() + " POST: " + utils.count_post()+ " DELETE: " + utils.increment_delete());
  res.send("All Products Deleted.");
});




app.listen(3009, function() {
  console.log('\nServer listining to port 3009 \n server url: http://127.0.0.1:3009 \n \
   APIs:\n 1. GET: http://127.0.0.1:3009/products\n 2. POST: http://127.0.0.1:3009/products\n Sample payload: { "product": "Laptop",  "price": 250.58, "category": "PC" } 3.DELETE: http://127.0.0.1:3009/products\n ')
});

