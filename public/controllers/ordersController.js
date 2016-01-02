angular.module('BookStoreApp').controller('ordersController', ['$scope', '$http',
                                          function($scope, $http) {
      $('.alert .close').on('click', function(e) {
          $(this).parent().hide();
      });

      // Get all orders
      var allOrders = function() {
          $http.get('api/orders/')
              .then(function(response) {
                  var orders = response.data;

                  // Get book names
                  getBookNames(orders);

                  // Set the customers
                  setCustomers(orders);
              })
              .catch(function(err) {
                  console.error('Error', err);
              });
      };

      var getBookNames = function(orders){
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
                  });
              })
              .catch(function(err) {
                  console.error('Error', err);
              });
      };
      var setCustomers = function(orders){
          $scope.customers = [];
          orders.forEach(function(order){
              if ($scope.customers.indexOf(order.customerId) == -1)
              {
                  $scope.customers.push(order.customerId);
              }
          });
      };

      $scope.search = function() {
          // Check what are the selected customers
          var selectedCustomers = [];
          angular.forEach($scope.customers, function(customer) {
              if (document.getElementById(customer)['checked']){
                  selectedCustomers.push(customer);
              }
          });

          if (selectedCustomers.length === 0) {
              $scope.searchErrorMessage = 'you must choose at least one customer';
              $('#search-error').show();
          } else{
              var minDate = document.getElementById('minDate').value;
              var maxDate = document.getElementById('maxDate').value;
              if (minDate < maxDate && minDate && maxDate){

                  // Check if enter free text search
                  var searchText = document.getElementById('book-name-text').value;
                  var prom;
                  if (searchText){
                      prom = $http.get('api/orders/search/' + searchText + '/' + minDate + '/' + maxDate + '/' + selectedCustomers);
                  } else {
                      prom = $http.get('api/orders/search/' + minDate + '/' + maxDate + '/' + selectedCustomers);
                  }

                  prom.then(function(response) {
                          $scope.orders = [];
                          getBookNames(response.data);
                      })
                      .catch(function(err) {
                          console.error('Response error', err);
                      });

              }else {
                  $scope.searchErrorMessage = 'You must insert valid dates';
                  $('#search-error').show();
              }
          };
      };

      $scope.orders = [];

      // Get all the orders
      allOrders();

      $scope.fromDate = '';
      $scope.untilDate = '';
}]);
