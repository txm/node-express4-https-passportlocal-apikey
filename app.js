var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');

var config = require('./config');
var mongoose = require('mongoose');

var app = express();

mongoose.connect(config.db.url);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// required for passport
app.use(session({
  secret: config.session.secret,
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',                  require('./routes/index'));
app.use('/register',          require('./routes/register'));
app.use('/login',             require('./routes/login'));
app.use('/logout',            require('./routes/logout'));
app.use('/create',            require('./routes/create'));

app.use('/api/deletetestuser',require('./routes/deletetestuser'));
app.use('/api/unauthorised',  require('./routes/api_unauth'));
app.use('/api/auth',          require('./routes/api_auth'));
app.use('/api/apps/json/:appuuid',  require('./routes/api_app_json'));
app.use('/api/apps/media/:appuuid', require('./routes/api_app_media'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {

/*
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
*/

}
else {

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });

}
module.exports = app;
