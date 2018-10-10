var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db_model = require('./database_user')
var app = express();

// chooses database we will use
if (process.env.NODE_ENV === "test") {
  mongoose.connect('mongodb://localhost/MakersBnB_test');
  console.log("connected to test db")
} else {
  mongoose.connect('mongodb://localhost/MakersBnB');
  console.log("connected to real db")
}

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

// sets the urls for each routers
app.use('/users', usersRouter);
app.use('/listings', listingsRouter);
app.use('/bookings', bookingsRouter);

module.exports = app;
