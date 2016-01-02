angular.module('BookStoreApp').controller('statisticsController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {

    $scope.statisticsPieData = [];
    var colors = ["#3366CC", "#DC3912", "#FF9900", "#109618","#990099"];

    // Get the orders by book
    $http.get('api/orders/ordersByBooks/')
        .then(function(response) {
            var colorIndex = 0;
            var booksIds = [];

            response.data.forEach(function (order){

                // Add to the D3 model and to list of all the ids
                booksIds.push(order.bookId);
                $scope.statisticsPieData.push({label:"Basic", "bookId": order.bookId, color: colors[colorIndex], value: order.ordersCount});
                colorIndex = (colorIndex + 1) % colors.length;
            });

            // Get all the books names
            $http.get('api/books/booksNames/' + booksIds)
                .then(function(response) {
                    $scope.booksNames = response.data;
                })
                .catch(function(err) {
                    console.error('Repos error', err);
                });

            //Create the D3
            var svg = d3.select("quotesDonutDiv").append("svg").attr("width",800).attr("height",400);
            svg.append("g").attr("id","quotesDonut");
            Donut3D.draw("quotesDonut", mapData(), 450, 150, 130, 100, 30, 0);
        })
        .catch(function(err) {
            console.error('Repos error', err);
        });

    function mapData(){
        return $scope.statisticsPieData.map(function(d){
            return {label:d.label, value: d.value, color:d.color};});
    }

    $scope.bookName = function (bookId){
        var name = "error";
        $scope.booksNames.forEach(function (book){
            if (book.id === bookId){
                name = book.name;
            }
        });

        return name;
    };
}]);
