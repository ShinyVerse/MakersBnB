var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
// var cookieParse = require('cookie-parser')
var session = require('express-session')
var app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'src')));

// app.use(express.cookieParser('secret'))
app.use(session({
  secret: "test"
}))

var bnbRouter = require('./bnbRouter.js');
app.use('/', bnbRouter);

module.exports = app;
