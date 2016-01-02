// create the module and name it scotchApp
var BookStoreApp = angular.module('BookStoreApp',
    ['ngRoute',
     'ngResource',
     'chatService',
     'btford.socket-io']);

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
            })
            .when('/manageBooks', {
                templateUrl : 'views/manageBooks.html',
                controller  : 'manageBooksController'
            })
            .when('/chat', {
                templateUrl : 'views/chat.html',
                controller  : 'chatController'
            })
            .when('/orders', {
                templateUrl : 'views/orders.html',
                controller  : 'ordersController'
            })
            .when('/statistics', {
                templateUrl : 'views/statistics.html',
                controller  : 'statisticsController'
            });
});

