
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.ok('Node API. Maybe');
});

module.exports = router;
