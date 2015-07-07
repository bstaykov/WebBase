'use strict';

webBaseModule.controller('InfoCtrl', function InfoCtrl($scope, author, email) {
    $scope.author = author;
    $scope.email = email;
    $scope.hello = '<h1>Hello World!!!</h1>';

    $scope.customStyle = { color: 'red' };
    $scope.customClass = 'customClass';
    $scope.isDisabled = false;
    $scope.disableCar = function () {
        $scope.isDisabled = !$scope.isDisabled;
    };
    $scope.hasCar = true;
    $scope.hideMenu = function () {
        $scope.hasCar = !$scope.hasCar;
    };

    $scope.registerUser = function (user) {
        console.log(user);
    }

    $scope.filterModel = 5;

    $scope.pictures = [
        {
            id: 1,
            url: 'url1',
            text: 'random',
            status: '1'
        },
        {
            id: 2,
            url: 'url2',
            text: 'tdfrhbtr',
            status: '1'
        },
        {
            id: 3,
            url: 'url3',
            text: 'ryhtrytr',
            status: '2'
        },
        {
            id: 4,
            url: 'url7',
            text: 'ryhtrytr',
            status: '3'
        },
        {
            id: 5,
            url: 'url6',
            text: 'jhytyh',
            status: '2'
        }];
});