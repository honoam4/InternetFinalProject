var express = require('express');
var router = express.Router();

var controller = require('./order.controller');

router.get('/', controller.index);
router.get('/getById/:id', controller.getById);
router.get('/search/:bookName/:minDate/:maxDate/:customers', controller.search);
router.get('/search/:minDate/:maxDate/:customers', controller.search);
router.post('/addOrder/', controller.save);

module.exports = router;
