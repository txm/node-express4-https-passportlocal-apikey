var express = require('express');
var router = express.Router();

var passport = require('passport');
require('../config/passport')(passport);


router.get('/', function(req, res, next) {
  res.render('register.ejs', { message: req.flash('registerMessage') });
});


router.post('/', passport.authenticate('local-signup', {
  successRedirect : '/', // redirect to the secure profile section
  failureRedirect : '/register', // redirect back to the register page if there is an error
  failureFlash : true // allow flash messages
}));



module.exports = router;
