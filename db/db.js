var books = require('./books');

var myDb = require('mongojs')('mongodb://127.0.0.1:27017/booksStore')
		, format = require('util').format;

exports.initDatabase = function (){
	console.log('Init the database');
	myDb.dropDatabase(function() {
		// Insert the books
		var booksCollection = myDb.collection('books');
		booksCollection.insert(books, {w:1}, function(err,docs) {
			if (err) throw err;
		});
	});
};