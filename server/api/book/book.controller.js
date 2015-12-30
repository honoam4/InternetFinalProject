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
//exports.book = function(req, res, next, id) {
//    req.id = id;
//    Books.findById(id, function(err, book) {
//        if (err) return next(err);
//        if (!book) return next(new Error('Failed to load book ' + id));
//        req.book = book;
//        next();
//    });
//};

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

