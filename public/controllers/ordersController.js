angular.module('BookStoreApp').controller('ordersController', ['$scope', '$http', '$routeParams',
                                          function($scope, $http, $routeParams) {
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

                          // Set the customers
                          setCustomers();
                      })
                      .catch(function(err) {
                          console.error('Error', err);
                      });
              })
              .catch(function(err) {
                  console.error('Error', err);
              });
      };

      var setCustomers = function(){
          $scope.customers = [];
          $scope.orders.forEach(function(order){
              if ($scope.customers.indexOf(order.customerId) == -1)
              {
                  $scope.customers.push(order.customerId);
              }
          });
      };

      $scope.search = function() {
          // Check what are the selected genres
          var selectedGenres = [];
          angular.forEach($scope.allGenres, function(genre) {
              if (document.getElementById(genre)['checked']){
                  selectedGenres.push(genre);
              }
          });

          if (selectedGenres.length === 0) {
              $scope.searchErrorMessage = 'you must chose at least one category';
              $('#search-error').show();
          } else{
              var maxPrice = document.getElementById('searchMaxPrice').value;
              if (maxPrice && isNaN(maxPrice) === false && maxPrice > 0){

                  // Check if enter free text search
                  var searchText = document.getElementById('search-text').value;
                  var prom;
                  if (searchText){
                      prom = $http.get('api/books/search/' + searchText + '/' + maxPrice + '/' + selectedGenres);
                  } else {
                      prom = $http.get('api/books/search/' + maxPrice + '/' + selectedGenres);
                  }

                  prom.then(function(response) {
                          $scope.allBooks = response.data;
                      })
                      .catch(function(err) {
                          console.error('Response error', err);
                      });

              }else {
                  $scope.searchErrorMessage = 'You must insert a valid max price';
                  $('#login-error').show();
              }
          };
      };

      $scope.orders = [];

      // Get all the orders
      allOrders();

      $scope.fromDate = '';
      $scope.untilDate = '';
}]);
