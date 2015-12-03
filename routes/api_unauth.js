var express = require('express');
var router = express.Router();

var passport = require('passport');
require('../config/passport')(passport);

var middleware = require('./middleware');



router.get('/', function(req, res, next) {
  res.status(401).json({ message: 'Not Authenticated' }).end();
});



module.exports = router;
