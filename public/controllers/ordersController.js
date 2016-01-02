angular.module('BookStoreApp').controller('ordersController', ['$scope', '$http', '$routeParams',
                                          function($scope, $http, $routeParams) {
      $scope.orders = [
          {
              date: '1-1-2016',
              bookId: '333',
              customerId: '1'
          },
          {
              date: '1-1-2016',
              bookId: '444',
              customerId: '1'
          },
          {
              date: '1-1-2016',
              bookId: '555',
              customerId: '1'
          },
          {
              date: '1-1-2016',
              bookId: '666',
              customerId: '1'
          }
      ];

}]);
