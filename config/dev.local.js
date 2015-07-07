
module.exports = {

  local: true,
  port: process.env.PORT || 8000,

  // database
  mongodb: {
    host: 'localhost',
    port: '27017',
    dbname: 'nodeapp',
    username: '',
    password: '',
  },

  // swig
  swig : {
    cache: false
  },

}
