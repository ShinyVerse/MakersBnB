var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'src')));

var bnbRouter = require('./bnbRouter.js');
app.use('/', bnbRouter);

module.exports = app;
