angular.module('BookStoreApp').controller('ordersController', ['$scope', '$http', '$routeParams',
                                          function($scope, $http, $routeParams) {
      $scope.orders = [];

      // Get all orders
      var allOrders = function() {
          $http.get('api/orders/')
              .then(function(response) {
                  var orders = response.data;

                  // Get the books ids of the books in the orders
                  var booksIds = [];
                  orders.forEach(function(order){
                      if (booksIds.indexOf(order.bookId) == -1)
                      {
                          booksIds.push(order.bookId);
                      }
                  });

                  // Get the books names from the ids
                  $http.get('api/books/booksNames/' + booksIds)
                      .then(function(response){

                          var bookNames = response.data;

                          orders.forEach(function(order){
                              // Get the book name
                              var bookName = '';
                              bookNames.forEach(function(book){
                                  if (book.id == order.bookId){
                                      bookName = book.name
                                  }
                              });

                              var orderWithName =
                              {
                                  date: order.date,
                                  bookName: bookName,
                                  customerId: order.customerId
                              };

                              $scope.orders.push(orderWithName);
                          })
                      })
                      .catch(function(err) {
                          console.error('Error', err);
                      });
              })
              .catch(function(err) {
                  console.error('Error', err);
              });
      };

      allOrders();
}]);
