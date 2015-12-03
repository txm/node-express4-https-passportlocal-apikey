var express = require('express');
var router = express.Router();

var passport = require('passport');
require('../config/passport')(passport);

var middleware = require('./middleware');

var User = require('../models/user');


router.post('/',
  //passport.authenticate('localapikey', { session: false, failureRedirect: '/api/unauthorised' }),

  function(req, res, next) {

      //User.where({ 'local.email': "random@address.fake" }).findOneAndRemove({ 'local.email': "random@address.fake" }, function(err) {
      User.where().findOneAndRemove({ 'local.email': "random@address.fake" }, function(err) {
        if (err) {
          res.status(500).json({ message: 'Error', error: err }).end();
        }
        else {
          res.json({ message: 'cleaned' }).end();
        }
      });


  }

);



module.exports = router;
