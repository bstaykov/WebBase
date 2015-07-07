'use strict';

webBaseModule.controller('DataCtrl',['$scope', '$routeParams', 'sumService',
    function DataCtrl($scope, $routeParams, sumService) {
        $scope.sumBtn = function () {
            //$scope.result = sumService.sumNumbers($scope.firstNumber, $scope.secondNumber);

            $scope.sumBtn = function () {
                sumService.sumNumbers($scope.firstNumber, $scope.secondNumber)
                    .then(function (data) {
                        $scope.result = data;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }

        
        $scope.firstNumber = $routeParams.firstNumber;
        $scope.secondNumber = $routeParams.secondNumber;
        if ($scope.firstNumber && $scope.secondNumber) {
            sumService.sumNumbers($scope.firstNumber, $scope.secondNumber)
                .then(function (data) {
                    $scope.sum = data;
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
}]);