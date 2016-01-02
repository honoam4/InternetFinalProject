angular.module('BookStoreApp').controller('manageBooksController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {

    $scope.allGenres = ["Fiction", "Thriller", "Suspense", "Fantasy", "Novel"];

    $('.alert .close').on('click', function(e) {
        $(this).parent().hide();
    });

    $(document).on('change', '.btn-file :file', function() {
        var input = $(this),
            numFiles = input.get(0).files ? input.get(0).files.length : 1,
            label = input.val().replace(/\\/g, '/').replace(/.*\//, '');

        if (numFiles > 1){
            alert('You can chose only one picture!');
        } else {
            input.trigger('fileselect', [numFiles, label]);
        }
    });

    $(document).ready( function() {
        $('.btn-file :file').on('fileselect', function(event, numFiles, label) {

            var input = $(this).parents('.input-group').find(':text'),
                log = numFiles > 1 ? numFiles + ' files selected' : label;

            if( input.length ) {
                input.val(log);
            } else {
                if( log ) alert(log);
            }

        });
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

        var pic = document.getElementById("new-picture").value;
        var picture = "";
        var bigPic = document.getElementById("new-big-picture").value;
        var bigPicture = "";

        if (pic){
            var splited = pic.split('/');
            picture = splited[splited.length -1];
        }

        if (bigPic){
            var splited = bigPic.split('/');
            bigPicture = splited[splited.length -1];
        }

        var addBook = {
            "name" : document.getElementById("new-bookName").value,
            "author" : document.getElementById("new-bookAuthor").value,
            "price" : document.getElementById("new-bookPrice").value,
            "picture" : picture,
            "bigPic" : bigPicture,
            "genre" : selectedGenres,
            "publisher" : document.getElementById("new-bookPublisher").value,
            "publishYear" : document.getElementById("new-publishYear").value,
            "synopsis" : document.getElementById("new-synopsis").value,
            "rating" : 0,
            "reviews" : []
        };

        $http.post('api/books/addBook/', addBook)
            .then(function(){
                $('#new-success-save-message').show();
            })
            .catch(function(err){
                $('#new-error-save-message').show();
                console.error('Error saving', err);
            });
    };

    $scope.deleteBook = function(book){

        var deleteBook = {"id" : book._id};
        $http.post('api/books/deleteBook/', deleteBook)
            .then(function(){
                allBooks();
            })
            .catch(function(err){
                $('#error-save-message').show();
                console.error('Error saving', err);
            });
    };

    allBooks();
}]);