var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();


app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');



app.use(cors())
app.use(bodyParser.json())

// defines each router
var usersRouter = require('./users.js');
app.use('/users', usersRouter);


// sets the urls for each routers

if (process.env.NODE_ENV !== 'test') {
  var listingsRouter = require('./listings.js');
  var bookingsRouter = require('./bookings.js');

  // sets the urls for each routers
  app.use('/listings', listingsRouter);
  app.use('/bookings', bookingsRouter);
}

module.exports = app;
