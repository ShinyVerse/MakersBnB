var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json())

// defines each router
var usersRouter = require('./users.js');
app.use('/users', usersRouter);


app.use(cors)
// sets the urls for each routers

if (process.env.NODE_ENV !== 'test') {
  var listingsRouter = require('./listings.js');
  var bookingsRouter = require('./bookings.js');

  // sets the urls for each routers
  app.use('/listings', listingsRouter);
  app.use('/bookings', bookingsRouter);
}

module.exports = app;
