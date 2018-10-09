var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/MakersBnB');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
  console.log('connected!');
})

var usersRouter = require('./users.js');
var listingsRouter = require('./listings.js');
var bookingsRouter = require('./bookings.js');



var app = express();

app.use(bodyParser.json())
//
// app.use(function(req, res, next) {
//   req.db = db;
//   next()
// })

app.use('/users', usersRouter);
app.use('/listings', listingsRouter);
app.use('/bookings', bookingsRouter);

module.exports = app;
