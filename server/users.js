var express = require('express');
var router = express.Router();
var users = ['John', 'Betty', 'Hal'];


router.get('/', function (req, res) {
  res.json(users);
});

router.post('/', function (req, res) {
  users.push(req.body.name)
  res.redirect('/users')
});

router.get('/:id', function (req, res) {
  res.json(users[req.params.id]);
});

router.put('/:id', function(req, res) {
  res.json(users);
});

router.delete('/:id', function(req, res) {

});

module.exports = router;