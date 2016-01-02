var Book = require('./book.model');

exports.index = function(req, res) {
    Book.find({}, function(err, books) {
        if (err) {
         return res.status(500).end();
        }

        res.json(books);
    });
};

exports.getById = function(req, res) {
    Book.findById({"_id": req.params.id}, function(err, book) {
        if (err) {
            return res.status(500).end();
        }

        res.json(book);
    });
};

exports.names = function(req, res) {

    var ids = req.params.ids.split(',');

    Book.find({
        "_id": { $in: ids}
    }, function(err, books) {
        if (err) {
            return res.status(500).end();
        }

        var result = [];
        books.forEach(function (book) {
            result.push({"id" : book._id, "name" : book.name});
        });

        res.json(result);
    });
};

exports.search = function(req, res) {
    // Search Text
    var searchText = '';
    if (req.params.name){searchText = req.params.name};

    // Genres
    var genres = req.params.genre.split(',');
    genres = JSON.parse(JSON.stringify(genres));

    Book.find({
        "name": new RegExp(searchText, "i"),
        "price": { $lte: req.params.maxprice },
        "genre": { $in: genres }
    }, function(err, books) {
        if (err) {
            return res.status(500).end();
        }

        res.json(books);
    });
};

exports.delete = function(req, res){
    var id = req.body.id;

    return Book.remove({ _id: id }, function(err) {
        if (!err) {
            return res.send("deleted");
        } else {
            console.log(err);
        }
    });
};

exports.save = function(req, res) {

    var id = req.body.id;

    var book = new Book({
        name : req.body.name,
        author : req.body.author,
        "price" : req.body.price,
        picture : req.body.picture,
        bigPic : req.body.bigPic,
        genre : req.body.genre,
        publisher : req.body.publisher,
        publishYear : req.body.publishYear,
        rating : req.body.rating,
        reviews : req.body.reviews,
        synopsis: req.body.synopsis,
    });

    var data = book.toObject();
    console.log(data.name);

    if (!id) {
        id = data._id
    }

    delete data._id;

    return Book.update({ _id: id }, {$set: data, $setOnInsert: { _id: id }}, {upsert: true}, function(err) {
        if (!err) {
            return res.send("updated");
        } else {
            console.log(err);
        }
    });
};
