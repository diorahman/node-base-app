

module.exports = _.merge(require('./'), {

    local: true,
    port: process.env.PORT || 8000,

    // database
    mongodb: {
        host: 'localhost',
        dbname: 'foodgasm',
    },

    // swig
    swig: {
        cache: false,
    },
});
