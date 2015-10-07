'use strict';

const buildDictionary = require('sails-build-dictionary');

module.exports = {

    loadController(cb) {
        buildDictionary.optional({
            dirname: config.appDir + '/app/controllers',
            filter: /^([^.]+)\.(js)$/,
            replaceExpr: /^.*\//,
            flattenDirectories: true,
        }, (err, controllers) => {
            _.each(controllers, function loadControllerToGlobal(controllerDef, controllerId) {
                global[controllerDef.globalId] = controllerDef;
            });

            cb(null, 'controller-loaded');
        });
    },

    loadServices(cb) {
        buildDictionary.optional({
            dirname: config.appDir + '/app/services',
            filter: /^([^.]+)\.(js)$/,
            replaceExpr: /^.*\//,
            flattenDirectories: true,
        }, (err, services) => {
            _.each(services, function loadServiceToGlobal(serviceDef, serviceId) {
                global[serviceDef.globalId] = serviceDef;
            });

            cb(null, 'service-loaded');
        });
    },

    loadModels(cb) {
        buildDictionary.optional({
            dirname: config.appDir + '/app/models',
            filter: /^([^.]+)\.(js)$/,
            replaceExpr: /^.*\//,
            flattenDirectories: true,
        }, cb);
    },

    loadStrategies(cb) {
        buildDictionary.optional({
            dirname: config.appDir + '/app/helpers/strategies',
            filter: /^([^.]+)\.(js)$/,
            replaceExpr: /^.*\//,
            flattenDirectories: true,
        }, cb);
    },

    loadRoutes(cb) {
        buildDictionary.optional({
            dirname: config.appDir + '/app/routes',
            filter: /^([^.]+)\.(js)$/,
            replaceExpr: /^.*\//,
            flattenDirectories: true,
        }, cb);
    },

};
