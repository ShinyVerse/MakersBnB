var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')

//require dbConnection to access database table
var Connection = require('../src/connection.js')
var userSchema = require('../src/schemas/users.js')

process.env.NODE_ENV === "development"
let userConn = new Connection(mongoose, [{ name: 'Users', schema: userSchema }])

// displays all entries in users
router.get('/', function (req, res) {
    userConn.read('Users').exec( (err, users) => {
      if (err) {
        console.log(err)
      } else {
        res.send(users)
      }
    })
})


// create a new entry in db
router.post('/', function (req, res) {
  console.log(req.body)

  res.status(201).send()
  res.redirect('/users')
});

// displays individual entry
router.get('/:id', function (req, res) {
  res.json(users[req.params.id]);
});

// updates individual entry
router.put('/:id', function(req, res) {
  if (users.length > req.params.id) {
    users[req.params.id] = req.body.name;
    res.status(202).send();
  } else {
    res.status(400).send()
  }
  res.redirect('/users')
});

// deletes an individual entry
router.delete('/:id', function(req, res) {
  if (users.length > req.params.id) {
    users.splice(req.params.id, 1);
    res.status(202).send()
  } else {
    res.status(400).send()
  }
  res.redirect('/users')
});

module.exports = router;
