var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')

const domain = 'bookings'

//require dbConnection to access database table
var Connection = require('../src/connection.js')
var domainSchema = require('../src/schemas/' + domain + '.js')

let domainConn = new Connection(mongoose, [{ name: domain, schema: domainSchema }])

// displays all entries in users
router.get('/', function (req, res) {
  domainConn.read(domain).exec( (err, output) => {
    if (err) {
      res.redirect('/')
    } else {
      res.send(output)
    }
  })
})

// create a new entry in db
router.post('/', function (req, res) {
  domainConn.create(domain, req.body)
  res.redirect('/' + domain)
});

// displays individual entry
router.get('/:id', function (req, res) {
  domainConn.read(domain, { _id: req.params.id }).exec( (err, output) => {
    if (err) {
      res.redirect('/')
    } else {
      res.send(output)
    }
  })
});

// updates individual entry
router.put('/:id', function(req, res) {
  domainConn.update(domain, req.params.id, req.body)
  res.redirect('/' + domain)
});

// deletes an individual entry
router.delete('/:id', function(req, res) {
  domainConn.delete(domain, req.params.id)
  res.redirect('/' + domain)
});

module.exports = router;



// var express = require('express');
// var router = express.Router();
// var users = ['John', 'Betty', 'Hal'];
//
//
// router.get('/', function (req, res) {
//   res.json(users);
// });
//
// router.get('/:id', function (req, res) {
//   res.json(users[req.params.id]);
// });
//
// router.post('/', function (req, res) {
//   res.json(users);
// });
//
// router.put('/:id', function(req, res) {
//   res.json(users);
// });
//
// router.delete('/:id', function(req, res) {
//
// });
//
// module.exports = router;
