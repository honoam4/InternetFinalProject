angular.module('BookStoreApp').controller('bookController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {

    $('.alert .close').on('click', function(e) {
        $(this).parent().hide();
    });

    $scope.buyBook = function(bookId, bookName){
        var book = {
          "bookId" : bookId,
          "bookName" : bookName
        };
        $http.post('api/orders/addOrder/', book)
            .then(function(){
                $('#success-buying-message').show();
            })
            .catch(function(err){
                $('#error-buying-message').show();
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
