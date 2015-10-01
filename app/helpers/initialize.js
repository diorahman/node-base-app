
var passport = require('./passport');
var moduleLoader = require('./moduleloader');
var buildOrm = require('./buildorm')();

module.exports = function() {

    return function initialize(cb) {

        async.auto({
            load_strategies: function(cb) {
                moduleLoader.loadStrategies(cb);
            },

            load_controllers: function(cb) {
                moduleLoader.loadController(cb);
            },

            load_services: function(cb) {
                moduleLoader.loadServices(cb);
            },

            load_models: function(cb) {
                buildOrm(cb);
            },
        }, cb);

    };

};
