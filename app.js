'use strict';

global.config = require('./config');
global._ = require('lodash');
global.async = require('async');

if(process.env.APPCONFIG){
  global.config = _.merge(config, require('./config/' + process.env.APPCONFIG));
}

require('./logger');

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


var initialize = require('./app/helpers/initialize')();

// version
var version = '0.1.0';

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
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  name: 'alg.sess',
  resave: false,
  saveUninitialized: false,
  secret: config.cookie.secret,
  auto_reconnect: true,
  maxAge: new Date(Date.now() + 3600000),
  store: new MongoStore({
    host: config.mongodb.host,
    port: config.mongodb.port,
    db: config.mongodb.dbname,
    username: config.mongodb.username,
    password: config.mongodb.password
  })
}));
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(i18n.init);

// initialize
initialize(function(err, result) {

  // routes
  require('./app/routes')(app);

  // some globals
  global.ObjectID = require('mongodb').ObjectID;
  global.version = version;

  // start listening
  var port = config.port;
  var server = app.listen(port, function() {
    console.log('NodeApp server listening on port ' + port);
  });

})

// ups
process.on('uncaughtException', function(err) {
  console.error('uncaughtException', err.stack);
});