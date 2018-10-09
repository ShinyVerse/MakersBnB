var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db_model = require('./database_user')
var app = express();

// chooses database we will use
if (process.env.NODE_ENV == "test") {
  mongoose.connect('mongodb://localhost/MakersBnB_test');
} else {
  mongoose.connect('mongodb://localhost/MakersBnB');
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


app.use(bodyParser.json())

// we probably don't need this, it was used for monk
// app.use(function(req, res, next) {
//   req.db = db;
//   next()
// })

// sets the urls for each routers
app.use('/users', usersRouter);
app.use('/listings', listingsRouter);
app.use('/bookings', bookingsRouter);

module.exports = app;
