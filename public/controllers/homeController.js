angular.module('BookStoreApp').controller('homeController', ['$scope', '$http', function($scope, $http) {
        // create a message to display in our view
        var allBooks = function() {
                $http.get('api/books/')
                    .then(function(response) {
                        $scope.allBooks = response.data;
                    })
                    .catch(function(err) {
                        console.error('Repos error', err);
                    });
        };

    $scope.getRating = function(number){
        return new Array(number);
    };

    var myCanvas = function(){
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        var img = document.getElementById("scream");
        ctx.drawImage(img,10,10);
    };

        myCanvas();
        allBooks();
}]);