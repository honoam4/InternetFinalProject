angular.module('BookStoreApp').controller('contactUsController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
    var initialize = function() {

        var myLatLng = {lat: 32.001120, lng: 34.764372};
        var myLatLng2 = {lat: 32.017020, lng: 34.749460};
        var myLatLng3 = {lat: 32.013658, lng: 34.749460};
        var center = {lat: 32.012016, lng: 34.753537};

        var mapCanvas = document.getElementById('map');
        var mapOptions = {
            center: center,
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(mapCanvas, mapOptions);

        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: 'The Corner Book Store'
        });

        var secMarker = new google.maps.Marker({
            position: myLatLng2,
            map: map,
            title: 'Shakespeare'
        });

        var secMarker = new google.maps.Marker({
            position: myLatLng3,
            map: map,
            title: 'Three Lives'
        });

        google.maps.event.addDomListener(window, 'load', initialize);
    };

    initialize();

}]);
