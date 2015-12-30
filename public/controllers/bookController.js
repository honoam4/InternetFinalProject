angular.module('BookStoreApp').controller('bookController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {

    var getBookById = function() {
        $http.get('api/books/getById/' + $routeParams.id)
            .then(function(response) {
                $scope.book = response.data;
            })
            .catch(function(err) {
                console.error('Repos error', err);
            });
    };

    getBookById();
}]);
