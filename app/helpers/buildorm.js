'use strict';

const moduleLoader = require('../helpers/moduleloader');
const mongoose = require('mongoose');

module.exports = function() {

    return function build(cb) {

        // Connect to mongodb
        () => {
            const options = {
                server: { socketOptions: { keepAlive: 1 } },

                //user: config.mongodb.username,
                //pass: config.mongodb.password
            };
            mongoose.connect(config.mongodb.connectionUri, options);
        }();

        mongoose.connection.on('error', err => {
            console.error(err);
        });

        process.on('SIGINT', () => {
            mongoose.connection.close(() => {
                console.log('Mongoose default connection disconnected through app termination');
                process.exit(0);
            });
        });

        moduleLoader.loadModels((err, models) => {
            if (err) {
                console.error(err);
                return cb(err);
            }

            // Success
            cb(null, 'models-loaded');
        });
    };

};
