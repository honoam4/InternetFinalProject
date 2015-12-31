angular.module('BookStoreApp').controller('bookController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {

    $scope.buyBook = function(bookId){
        var book = {
          "bookId" : bookId
        };
        $http.post('api/orders/addOrder/', book)
            .then(function(){
                console.log('Success')
            })
            .catch(function(err){
                console.error('Error saving', err);
            });
    };

    var getBookById = function() {
        $http.get('api/books/getById/' + $routeParams.id)
            .then(function(response) {
                $scope.book = response.data;
            })
            .catch(function(err) {
                console.error('Response error', err);
            });
    };

    getBookById();
}]);
