// server.js
// This is where your node app starts

//load the 'express' module which makes writing webservers easy
const express = require("express");
const app = express();
const lodash=require("lodash")
const cors=require("cors")
const bodyParser = require("body-parser");
const logger = require("morgan");

app.use(logger('dev'));
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

//load the quotes JSON
const quotes = require("./quotes.json");

// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
//   /quotes            - Should return all quotes (json)
//   /quotes/random     - Should return ONE quote (json)
app.get("/", function (request, response) {
  response.send("Neill's Quote Server!  Ask me for /quotes/random, or /quotes");
});

//START OF YOUR CODE...
app.get("/quotes",function(req,response){
 
  response.send(quotes);
  
})
app.get("/quotes/echo",function(req,response){
  const query=req.query.word;
  response.send(`you said ${query}`)
  
  
  
})
app.get("/quotes/search",function(req,response){
  const query=req.query.term;
  response.send(search(quotes,query))
  
})
function search(quotes,term){
  let t=quotes.filter(function(obj){
    return obj.quote.toLowerCase().includes(term.toLowerCase())
    ||
    obj.author.toLowerCase().includes(term.toLowerCase());
  })
  return t;
}
app.get("/quotes/random",function(request,response){
  //response.send(pickFromArray(quotes))
  response.send(lodash.sample(quotes))
})
app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})
app.get('/products/:id', cors(), function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for a Single Route'})
})

app.get("/test",function(request,response){
  response.sendFile(__dirname+"/index.html")
})
app.post("/test",function(request,response){
  
  console.log(request.body)
  const name=request.body.v1
  response.send(name)
})

//...END OF YOUR CODE

//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)
//
function pickFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

//Start our server so that it listens for HTTP requests!
//process.env.PORT
const listener = app.listen(process.env.PORT||3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
