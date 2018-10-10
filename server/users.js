var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

// placeholder for when we were using a variable instead of db, delete when db implemented
var users = []

//require user to access database table
var User = require('./database_user')

// displays all entries in users
router.get('/', function (req, res) {
  User.find((err, users) => {
    if (err) return res.status(500).send(err)

    return res.json(users);
  })
});

//temporary route to populate the database, delete
router.get('/populate', function(req, res) {
  var dog = new User({ name: 'dog', email: "dog@dog.com", password: 'dog123' });
  var cat = new User({ name: 'cat', email: "cat@dog.com", password: 'cat123' });
  dog.save();
  cat.save();
  res.redirect('/users')
})

// create a new entry in db
router.post('/', function (req, res) {
  users.push(req.body.name)
  res.status(201).send()
  // return res.status(201).json('user created');
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
