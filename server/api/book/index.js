var express = require('express');
var controller = require('./book.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/getById/:id', controller.getById);
router.get('/search/:name/:maxprice/:genre', controller.search);
router.get('/search/:maxprice/:genre', controller.search);
router.get('/booksNames/:ids', controller.names);
router.post('/updateBook/', controller.save);
router.post('/addBook/', controller.save);
router.post('/deleteBook/', controller.delete);

module.exports = router;