var express = require('express');
var router = express.Router();
var session = require('express-session')
var ejs = require('ejs');

router.get('/', function(req, res) {
  res.render('index.ejs', {})
})

router.post('/', function(req, res) {
  req.session.login = req.body
  res.redirect('/')
})

router.get('/user', function(req, res) {
  res.send(req.session.login)
})

module.exports = router;
