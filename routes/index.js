var express = require('express');
var router = express.Router();

var middleware = require('./middleware');



router.get('/', middleware.isLoggedIn, function(req, res, next) {
  var apps = {
    'aaa': {},
    'ccc': {}
  };
console.log('index')
  res.render('index', { title: 'title', apps: apps });
});


module.exports = router;
