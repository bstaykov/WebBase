'use strict';

webBaseModule.controller('SomeCtrl', ['$scope', '$routeParams', 'author',
    function SomeCtrl($scope, $routeParams, author) {
        $scope.author = author;
    }]);