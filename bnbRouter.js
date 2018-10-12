var express = require('express');
var router = express.Router();
var session = require('express-session')
var ejs = require('ejs');

router.get('/', function(req, res) {
  user = req.session.login || {"_id": 0 ,"name": 0, "email":0, "password": 0,"__v": 0}
  res.render('index.ejs', {user: user})
})

router.post('/', function(req, res) {
  req.session.login = req.body
  res.redirect('/')
})

router.get('/user', function(req, res) {
  res.send(req.session.login)
})

module.exports = router;
