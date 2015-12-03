var fs = require('fs');
var express = require('express');
var router = express.Router();

var passport = require('passport');
require('../config/passport')(passport);

var middleware = require('./middleware');

var User = require('../models/user');


router.get('/',
  //passport.authenticate('localapikey', { session: false, failureRedirect: '/api/unauthorised' }),
  function(req, res, next) {

    try {
      var apikey = req.headers.authorization.split(" ")[1];

      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      User.findOne({ 'api.key' :  apikey }, function(err, user) {

        // if there are any errors, return the error before anything else
        if (err)
          res.status(401).json({ message: 'Error', error: err }).end();

        // if no user is found, return the message
        if (!user)
          res.status(401).json({ message: 'Error', error: 'No key found.' }).end();
        else {
          // there must be a better way to capture :appuuid
          var readStream = fs.createReadStream('private/json/'+req.baseUrl.split('/')[4]);

          readStream.on('open', function () {
            readStream.pipe(res);
          });

          readStream.on('error', function(err) {
            res.status(404).json({ message: 'Error', error: 'No file found.' }).end();
            res.end(err);
          });

        }

      });

    }
    catch(err) {
      res.status(401).json({ message: 'Error: missing API key', error: err }).end();
    }

  }

);



module.exports = router;
