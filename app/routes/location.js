
var express = require('express');
var router = express.Router();

router.get('/', LocationController.index);

router.post('/', LocationController.add);
router.post('/:id', LocationController.update);

router.get('/search', LocationController.search);

module.exports = router;