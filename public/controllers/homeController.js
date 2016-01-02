angular.module('BookStoreApp').controller('homeController', ['$scope', '$http', function($scope, $http) {

    angular.element(document.querySelector('#searchMaxPrice')).attr('value', '100');
    $scope.allGenres = ["Fiction", "Thriller", "Suspense", "Fantasy", "Novel"];
    $scope.searchErrorMessage = "";

    $('.alert .close').on('click', function(e) {
        $(this).parent().hide();
    });


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
                $('#search-error').show();
            }

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