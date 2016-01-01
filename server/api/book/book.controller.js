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
            $('#success-buying-message').show();
        } else {
            $('#error-buying-message').show();
            console.log(err);
        }
    });
};

//exports.save = function(req, res) {
//
//    var id = req.params.movieId;
//
//    var movie = new Movies({
//        name : req.body.name,
//        director : req.body.director,
//        releaseDate : req.body.releaseDate,
//        genre : req.body.genre,
//        picture : req.body.picture,
//        price : req.body.price,
//        lat: req.body.lat,
//        lng: req.body.lng,
//        actors: req.body.actors
//    });
//
//    var upsertData = movie.toObject();
//
//    console.log(upsertData.lat);
//
//    if (!id) {
//        id = upsertData._id
//    }
//
//    delete upsertData._id;
//
//    return Movies.update({ _id: id }, {$set: upsertData, $setOnInsert: { _id: id }}, {upsert: true}, function(err) {
//        if (!err) {
//            return res.send("updated");
//        } else {
//            console.log(err);
//            return res.send(404, { error: "Movie was not updated." });
//        }
//    })};
//
//exports.showBook = function(req, res) {
//    res.json(req.book);
//};

