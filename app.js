
// uncomment below to generate memory stats using memwatch
// require('./memory');

// uncomment below to use winston as logger
// require('./logger');

// node modules
var path = require('path');

var express = require('express');
var swig = require('swig');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session    = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var i18n = require("i18n");
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');

// version
var version = '0.1.3';

// global
global.config = require('./config/' + process.env.APPCONFIG);
global._ = require('lodash');
global.async = require('async');
global.ObjectID = require('mongodb').ObjectID;
global.version = version;

var initialize = require('./app/helpers/initialize')();

// i18n
i18n.configure({
  locales: ['en_US', 'id'],
  directory: __dirname + '/app/locales',
  updateFiles: false
});

// express setup
var app = express();

// view engine setup
swig.setDefaults(config.swig);
app.engine('swig', swig.renderFile);
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'swig');

app.disable('x-powered-by');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// initialize
initialize(function(err, result) {

app.use(session({
  name: 'nodeapp.sess',
  resave: false,
  saveUninitialized: false,
  secret: config.cookie.secret,
  auto_reconnect: true,
  maxAge: new Date(Date.now() + 3600000),
  
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
}));

app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(i18n.init);

  // routes
  require('./app/routes')(app);

  // start listening
  var port = process.env.PORT || 4002;
  var server = app.listen(port, function() {
    console.log('NodeApp server listening on port ' + port);
  });

})

// ups
process.on('uncaughtException', function(err) {
  console.error('uncaughtException', err.stack);
});
