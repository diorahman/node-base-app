const path = require('path');

module.exports = {

    local: false,
    port: process.env.PORT || 8000,
    hostname: 'localhost',
    get fullhostname() {
        if (this.local) {
            return 'http://localhost:' + this.port;
        } else {
            return 'http://' + this.hostname;
        }
    },

    // database
    mongodb: {
        host: 'localhost',
        port: '27017',
        dbname: 'foodgasm',
        username: '',
        password: '',
        get connectionUri() {
            return 'mongodb://' + this.host + ':' + this.port + '/' + this.dbname;
        },
    },

    // dir
    appDir: path.join(__dirname, '..'),
    uploadDir: path.join(__dirname, '..', '/app/public/upload'),

    // locale
    i18n: {
        defaultLocale: 'en_US',
    },

    // swig
    swig: {
        cache: 'memory',
    },

    // nodemailer
    emailer: {
        service: 'emailService',
        user: 'username',
        pass: 'password',
    },

    cookie: {
        secret: 'neveroddoreven',
    },

};
