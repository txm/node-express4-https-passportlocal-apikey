var express = require('express');
var router = express.Router();



var User = require('../models/user');


router.get('/', function(req, res, next) {
  // check user/pass
  // return apikey
  var apikey = req.headers.authorization.split(" ")[1];
    res.json({ message: 'Authenticated' });
});


router.post('/', function(req, res, next) {

  try {
    var email = req.body.email;
    var password = req.body.password;
    var user = new User;

    //var apikey = user.apilogin(email, password);


    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists
    User.findOne({ 'local.email' :  email }, function(err, user) {

      // if there are any errors, return the error before anything else
      if (err)
        res.status(401).json({ message: 'Error', error: err });

      // if no user is found, return the message
      else if (!user)
        res.status(401).json({ message: 'Error', error: 'No user found.' });

      // if the user is found but the password is wrong
      else if (!user.validPassword(password))
        res.status(401).json({ message: 'Error', error: 'Wrong password.' });

      // all is well, return successful user
      else
        res.json({ message: 'Authenticated', apikey: user.api.key });

    });

  } catch(err) {
    res.status(401).json({ message: 'Error', error: 'Pass email and pass.' });
  }

});


/*
router.post('/', passport.authenticate('api-login', {
  successRedirect : '/', // redirect to the secure profile section
  failureRedirect : '/login', // redirect back to the signup page if there is an error
  failureFlash : false
}));
*/

module.exports = router;
