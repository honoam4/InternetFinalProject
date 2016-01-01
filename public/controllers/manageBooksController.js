angular.module('BookStoreApp').controller('manageBooksController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {

    $scope.allGenres = ["Fiction", "Thriller", "Suspense", "Fantasy"];

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

    allBooks();
}]);
