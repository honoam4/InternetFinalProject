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

		// Get all the books and create orders
		var bookNumber = 1;
		var ordersCollection = myDb.collection('orders');

		booksCollection.find(function(err, books){
			books.forEach(function(book){
				for(var i = 0; i < bookNumber; i++){
					var orderDateString = "2015-" + bookNumber + "-1";
					var orderDate = new Date(orderDateString);
					var order = {"bookId" : book._id, "bookName": book.name, "customerId" : bookNumber.toString(), "date" : orderDate};
					ordersCollection.insert(order, {w:1}, function(err,docs) {
						if (err) throw err;
					});
				}

				bookNumber++;
			})
		});


	});
};