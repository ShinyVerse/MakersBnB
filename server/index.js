var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
// var db_model = require('./database_user')
var app = express();

//connects to database and posts confirmation on console
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
  console.log('connected!');
})

// defines each router
var usersRouter = require('./users.js');
var listingsRouter = require('./listings.js');
var bookingsRouter = require('./bookings.js');

// tells body parser to use JSON encoding?
app.use(bodyParser.json())
app.use(cors)
// sets the urls for each routers
app.use('/users', usersRouter);
app.use('/listings', listingsRouter);
app.use('/bookings', bookingsRouter);

module.exports = app;
