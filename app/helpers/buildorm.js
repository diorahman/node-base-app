
var moduleLoader = require('../helpers/moduleloader');
var mongoose = require('mongoose');

module.exports = function() {

  return function build(cb) {

    // Connect to mongodb
    var connect = function () {
      var options = { 
        server: { socketOptions: { keepAlive: 1 } },
        //user: config.mongodb.username,
        //pass: config.mongodb.password
      };
      mongoose.connect(config.mongodb.connectionUri, options);
    };

    connect();
    
    mongoose.connection.on('error', function(err) {
      console.error(err);
    });
    //mongoose.connection.on('disconnected', connect);

    moduleLoader.loadModels(function(err, models) {
      if (err) {
        console.error(err);
        return cb(err);
      }

      // Success
      cb(null, 'models-loaded');

    })
  }

}