
module.exports = {

  // database
  mongodb: {
    host: 'localhost',
    port: '27017',
    dbname: 'location',
    username: 'user',
    password: 'pass',
    connectionUri: 'mongodb://localhost:27017/location'
  },

  // dir
  appDir: process.cwd(),
  photoDir: process.cwd() + '/app/public/upload',

  // locale
  i18n: {
    defaultLocale: 'en_US'
  },

  // swig
  swig : {
    cache: false
  },

  // nodemailer
  emailer: {
    service: 'emailService',
    user: 'username',
    pass: 'password'
  },

  // papertrail logger
  papertrail: {
    host: 'papertrailUrl',
    port: 'paperTrailPort'
  },

  cookie: {
    secret: 'BbQqBK8HEj9OrP67hkmyE9gKhPevie3q1gkIaOoUpmjvxkg6iWTkZ9HlLh6Vg7If',
  },

  story: {
    baseUri: 'http://localhost:8090/api',
    defaultToken: 'fYrj86nK7ahJrAo1WS0yFyywSsiSO6z3Y8f9ZCHlwfZjrSDV5WZaotR1BfqTKonU7KOTAaUT8BPTNyfawiI2vlIuTSMT5GOD8ofzGbfyZT2XdzOfZ1sI8LWi7miiSIL5'
  }

}
