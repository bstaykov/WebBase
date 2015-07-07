﻿'use strict';

var webBaseModule = angular.module('webBaseModule', ['ngSanitize', 'ngResource', 'ngRoute', 'ngCookies'])
    .config(function ($routeProvider) {
        $routeProvider
        .when('/', {
            templateUrl: 'Scripts/Angular/app/views/partials/homePage.html',
        })
        .when('/register', {
            templateUrl: 'Scripts/Angular/app/views/partials/register.html'
        })
        .when('/login', {
            templateUrl: 'Scripts/Angular/app/views/partials/login.html'
        })
        .when('/sum/:firstNumber/:secondNumber', {
            templateUrl: 'Scripts/Angular/app/views/partials/sum.html'
        })
        .when('/default', {
            templateUrl: 'Scripts/Angular/app/views/partials/default.html'
        });

        $routeProvider.otherwise({ redirectTo: '/' });
    })
    .constant('author', 'Boycho Staykov')
    .constant('email', 'boycho.staykov@gmail.com');