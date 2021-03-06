angular.module('BookStoreApp').controller('statisticsController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {

    $scope.statisticsPieData = [];
    var colors = ["#3366CC", "#DC3912", "#FF9900", "#109618","#990099"];

    // Get the orders by book
    var getOrdersByBooks = function(){
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


    };

    var getordersByMonth = function(){
        $http.get('api/orders/ordersByMonth/')
            .then(function(response) {
                var vis = d3.select('#visualisation'),
                    WIDTH = 1000,
                    HEIGHT = 500,
                    MARGINS = {
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 50
                    },
                    xRange = d3.scale.ordinal().rangeRoundBands([MARGINS.left, WIDTH - MARGINS.right], 0.1).domain(response.data.map(function (d) {
                        return d.x;
                    })),


                    yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0,
                        d3.max(response.data, function (d) {
                            return d.y;
                        })
                    ]),

                    xAxis = d3.svg.axis()
                        .scale(xRange)
                        .tickSize(5)
                        .tickSubdivide(true),

                    yAxis = d3.svg.axis()
                        .scale(yRange)
                        .tickSize(5)
                        .orient("left")
                        .tickSubdivide(true);


                vis.append('svg:g')
                    .attr('class', 'x axis')
                    .attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
                    .call(xAxis);

                vis.append('svg:g')
                    .attr('class', 'y axis')
                    .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
                    .call(yAxis);

                vis.selectAll('rect')
                    .data(response.data)
                    .enter()
                    .append('rect')
                    .attr('x', function (d) {
                        return xRange(d.x);
                    })
                    .attr('y', function (d) {
                        return yRange(d.y);
                    })
                    .attr('width', xRange.rangeBand())
                    .attr('height', function (d) {
                        return ((HEIGHT - MARGINS.bottom) - yRange(d.y));
                    })
                    .attr('fill', 'grey');
            })
            .catch(function(err) {
                console.error('Repos error', err);
            });


    };

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

    getOrdersByBooks();
    getordersByMonth();
}]);
