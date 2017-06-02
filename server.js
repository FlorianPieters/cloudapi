var express = require('express');
var bodyparser = require('body-parser');

// Create app
var app = express();


// Static file hosting
app.use(express.static('client'));

// Application middleware. Must be above REST endpoints
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin","http://"+req.headers.host+':3000',"*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyparser.json());


app.listen(3000);
