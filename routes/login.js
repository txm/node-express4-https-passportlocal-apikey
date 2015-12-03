var express = require('express');
var router = express.Router();

var passport = require('passport');
require('../config/passport')(passport);



router.get('/', function(req, res, next) {
  res.render('login.ejs', { message: req.flash('loginMessage') }); 
});

router.post('/', passport.authenticate('local-login', {
  successRedirect : '/', // redirect to the secure profile section
  failureRedirect : '/login', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}));

module.exports = router;
