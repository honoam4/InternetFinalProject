var express = require('express');
var router = express.Router();

var controller = require('./order.controller');

router.get('/', controller.index);
router.get('/getById/:id', controller.getById);
router.get('/ordersByBooks/', controller.byBooks);
router.get('/ordersByMonth/', controller.byMonth);
router.post('/addOrder/', controller.save);

module.exports = router;
