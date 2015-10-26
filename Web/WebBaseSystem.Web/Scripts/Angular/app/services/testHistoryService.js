'use strict';

webBaseModule.factory('testHistoryService', ['$http', '$q', 'baseUrl',
    function testHistoryService($http, $q, baseUrl) {

        function testHistory(url) {
            var deferred = $q.defer();

            $http.get(baseUrl + url)
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }

        return {
            testHistory: testHistory,
        };
    }]);