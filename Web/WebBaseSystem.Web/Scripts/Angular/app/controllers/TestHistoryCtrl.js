'use strict';

webBaseModule.controller('TestHistoryCtrl',
    ['$scope', '$routeParams', 'testHistoryService', '$log',
    function TestHistoryCtrl($scope, $routeParams, testHistoryService, $log) {
        
        function testJQuery(url) {
            $('#testId').load(url);
        }
        $scope.testJQuery = function (url) {
            testJQuery(url);
        }


        function testHistory(url) {
            testHistoryService.testHistory(url)
                            .then(function (data) {
                                $('#testId').html(data);
                            })
                            .catch($log.error);
        }

        $scope.testHistory = function (url) {
            testHistory(url);
        }

        $scope.url;
        $scope.controllerName = $routeParams.controllerName;
        $scope.actionName = $routeParams.actionName;
        if ($scope.controllerName && $scope.actionName) {
            $scope.url = $scope.controllerName + '/' + $scope.actionName;
            testHistory($scope.url);
        }
    }]
);