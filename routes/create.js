var express = require('express');
var router = express.Router();

var passport = require('passport');
require('../config/passport')(passport);

var middleware = require('./middleware');



router.get('/', middleware.isLoggedIn, function(req, res, next) {
  res.render('create.ejs', { message: req.flash('createMessage') });
});


router.post('/', middleware.isLoggedIn, function(req, res, next) {

  // create the app
  req.flash('info', 'Flash is back!')


  res.redirect('/');
});


module.exports = router;
