var myDb = require('./db/db.js');
myDb.initDatabase();

var express = require('express');
var http = require('http');
var path = require('path');
var consolidate = require('consolidate');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/booksStore');
// Init the models
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'public/views'));

// assign the template engine to .html files
app.engine('html', consolidate['swig']);

// set .html as the default extension
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

// Init the Routes
require('./routes')(app);

// Start the server
var port = 3000;

http.createServer(app).listen(port, function() {
    console.log("Express server listening on port %s", port);
});

module.exports = app;


