var express = require('express');
var router = express.Router();
var users = ['John', 'Betty', 'Hal'];


router.get('/', function (req, res) {
  res.json(users);
});

router.post('/', function (req, res) {
  users.push(req.body.name)
  res.status(201).send()
  // return res.status(201).json('user created');
  res.redirect('/users')
});

router.get('/:id', function (req, res) {
  res.json(users[req.params.id]);
});

router.put('/:id', function(req, res) {
  if (users.length > req.params.id) {
    users[req.params.id] = req.body.name;
    res.status(202).send();
  } else {
    res.status(400).send()
  }
  res.redirect('/users')
});

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
