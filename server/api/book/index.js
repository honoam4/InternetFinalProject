var express = require('express');
var controller = require('./book.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/getById/:id', controller.getById);
router.get('/search/:name/:maxprice/:genre', controller.search);
router.get('/search/:maxprice/:genre', controller.search);
router.post('/updateBook/', controller.save);

module.exports = router;