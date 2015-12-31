var express = require('express');
var controller = require('./order.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/getById/:id', controller.getById);
router.put('/order/:bookId', controller.save);

module.exports = router;
