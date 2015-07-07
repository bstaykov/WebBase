'use strict';

webBaseModule.controller('SomeCtrl', function SomeCtrl($scope, $routeParams, author) {
    $scope.author = author;
});