angular.module('BookStoreApp').controller('homeController', ['$scope', '$http', function($scope, $http) {

    angular.element(document.querySelector('#searchMaxPrice')).attr('value', '10');
    $scope.allGenres = ["Fiction", "Thriller", "Suspense", "Fantasy"];
    //$scope.allGenresValus = [{"Fiction", }, "Thriller", "Suspense", "Fantasy"];

    var allBooks = function() {
                $http.get('api/books/')
                    .then(function(response) {
                        $scope.allBooks = response.data;
                    })
                    .catch(function(err) {
                        console.error('Repos error', err);
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
            alert('you must chose at least one genre');
        } else{
            //var ddddddd = document.getElementById('search-text');
            var searchName = "e";
            $http.get('api/books/search/' + searchName + '/12/' + ['Thriller'])
                .then(function(response) {
                    $scope.sheker = response.data;
                })
                .catch(function(err) {
                    console.error('Repos error', err);
                });
        };
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