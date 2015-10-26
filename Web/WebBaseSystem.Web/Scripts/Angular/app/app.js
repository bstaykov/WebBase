'use strict';

var webBaseModule = angular.module('webBaseModule', ['ngSanitize', 'ngResource', 'ngRoute', 'ngCookies'])
    .config(["$routeProvider", function ($routeProvider) {
        $routeProvider
        .when('/', {
            templateUrl: 'Scripts/Angular/app/views/partials/homePage.html',
        })
        .when('/home', {
            templateUrl: 'Scripts/Angular/app/views/partials/homePage.html',
        })
        .when('/testHistory/:controllerName/:actionName', {
            templateUrl: 'Scripts/Angular/app/views/partials/testHistoryPage.html',
        })
        .when('/register', {
            templateUrl: 'Scripts/Angular/app/views/partials/register.html'
        })
        .when('/login', {
            templateUrl: 'Scripts/Angular/app/views/partials/login.html'
        })
        .when('/logout', {
            templateUrl: 'Scripts/Angular/app/views/partials/homePage.html',
        })
        .when('/addImage', {
            templateUrl: 'Scripts/Angular/app/views/partials/addImage.html'
        })
        .when('/getAllImages', {
            templateUrl: 'Scripts/Angular/app/views/partials/getAllImages.html'
        })
        .when('/sum/:firstNumber/:secondNumber', {
            templateUrl: 'Scripts/Angular/app/views/partials/sum.html'
        })
        .when('/default', {
            templateUrl: 'Scripts/Angular/app/views/partials/default.html'
        });

        $routeProvider.otherwise({ redirectTo: '/' });
    }])
    //.constant('baseUrl', 'http://localhost:50930/')
    .constant('baseUrl', 'http://webbase.apphb.com/')
    .constant('author', 'Boycho Staykov')
    .constant('email', 'boycho.staykov@gmail.com');
