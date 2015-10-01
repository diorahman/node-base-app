
module.exports = {

    // database
    mongodb: {
        host: 'localhost',
        port: '27017',
        dbname: 'nodeapp',
        username: '',
        password: '',
        connectionUri: 'mongodb://localhost:27017/nodeapp',
    },

    // dir
    appDir: process.cwd(),
    uploadDir: process.cwd() + '/assets/upload',

    // locale
    i18n: {
        defaultLocale: 'en_US',
    },

    // swig
    swig: {
        cache: false,
    },

    // nodemailer
    emailer: {
        service: 'emailService',
        user: 'username',
        pass: 'password',
    },

    cookie: {
        secret: 'BbQqBK8HEj9OrP67hkmyE9gKhPevie3q1gkIaOoUpmjvxkg6iWTkZ9HlLh6Vg7If',
    },
};
