var express = require('express');
var router = express.Router();

var ejs = require('ejs');

router.get('/', function(req, res) {
  res.render('index.ejs')
})

module.exports = router;
