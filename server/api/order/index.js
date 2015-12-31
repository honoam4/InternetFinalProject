var express = require('express');
var router = express.Router();

var controller = require('./order.controller');

router.get('/', controller.index);
router.get('/getById/:id', controller.getById);
router.post('/addOrder/', controller.save);

module.exports = router;
