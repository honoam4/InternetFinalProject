angular.module('BookStoreApp').controller('manageBooksController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {

    $scope.allGenres = ["Fiction", "Thriller", "Suspense", "Fantasy"];

    $('.alert .close').on('click', function(e) {
        $(this).parent().hide();
    });

    var allBooks = function() {
        $http.get('api/books/')
            .then(function(response) {
                $scope.allBooks = response.data;
            })
            .catch(function(err) {
                console.error('Repos error', err);
            });
    };

    $scope.isCheckCategory = function(book, category){
        var isFound = false;
        var genres = book.genre.split(',');
        angular.forEach(genres, function(genre){
            if (genre === category){
                isFound = true;
            }
        });

        return isFound;
    };

    $scope.saveBook = function(book){
        var selectedGenres = [];
        angular.forEach($scope.allGenres, function(genre) {
            if (document.getElementById(book._id + '-' + genre)['checked']){
                selectedGenres.push(genre);
            }
        });

        var updateBook = {
            "id" : book._id,
            "name" : document.getElementById(book._id + "-bookName").value,
            "author" : document.getElementById(book._id + "-bookAuthor").value,
            "price" : document.getElementById(book._id + "-bookPrice").value,
            "genre" : selectedGenres,
            "publisher" : document.getElementById(book._id + "-bookPublisher").value,
            "publishYear" : document.getElementById(book._id + "-publishYear").value,
            "synopsis" : document.getElementById(book._id + "-synopsis").value,
            "rating" : book.rating,
            "reviews" : book.reviews
        };

        $http.post('api/books/updateBook/', updateBook)
            .then(function(){
                $('#success-save-message').show();
            })
            .catch(function(err){
                $('#error-save-message').show();
                console.error('Error saving', err);
            });
    };

    $scope.addBook = function(){
        var selectedGenres = [];
        angular.forEach($scope.allGenres, function(genre) {
            if (document.getElementById('new-' + genre)['checked']){
                selectedGenres.push(genre);
            }
        });

        var addBook = {
            "id" : book._id,
            "name" : document.getElementById(book._id + "-bookName").value,
            "author" : document.getElementById(book._id + "-bookAuthor").value,
            "price" : document.getElementById(book._id + "-bookPrice").value,
            "genre" : selectedGenres,
            "publisher" : document.getElementById(book._id + "-bookPublisher").value,
            "publishYear" : document.getElementById(book._id + "-publishYear").value,
            "synopsis" : document.getElementById(book._id + "-synopsis").value,
            "rating" : book.rating,
            "reviews" : book.reviews
        };

        $http.post('api/books/addBook/', addBook)
            .then(function(){
                $('#success-save-message').show();
            })
            .catch(function(err){
                $('#error-save-message').show();
                console.error('Error saving', err);
            });
    };

    allBooks();
}]);

//name : req.body.name,
//    author : req.body.author,
//    picture : req.body.picture,
//    bigPic : req.body.bigPic,
//      price
//    genre : req.body.genre,
//    publisher : req.body.publisher,
//    publishYear : req.body.publishYear,
//    synopsis: req.body.rating,