'use strict';

const passport = require('./passport');
const moduleLoader = require('./moduleloader');
const buildOrm = require('./buildorm')();

module.exports = function() {

    return function initialize(cb) {

        async.auto({
            loadStrategies(cb) {
                moduleLoader.loadStrategies(cb);
            },

            loadControllers(cb) {
                moduleLoader.loadController(cb);
            },

            loadServices(cb) {
                moduleLoader.loadServices(cb);
            },

            loadModels(cb) {
                buildOrm(cb);
            },
        }, cb);

    };

};
