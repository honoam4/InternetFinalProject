// create the module and name it scotchApp
var BookStoreApp = angular.module('BookStoreApp', ['ngRoute', 'ngResource']);

BookStoreApp.config(function($routeProvider) {
        $routeProvider

        // route for the home page
            .when('/', {
                    templateUrl : 'views/home.html',
                    controller  : 'homeController'
            })
            .when('/book/:id', {
                templateUrl : 'views/book.html',
                controller  : 'bookController'
            })
            .when('/contactUs', {
                templateUrl : 'views/contactUs.html',
                controller  : 'contactUsController'
            });

});

