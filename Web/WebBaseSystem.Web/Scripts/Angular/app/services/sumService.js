'use strict';

webBaseModule.factory('sumService', function sumService($http, $q, $resource) {
    function sumNumbers(firstNumber, secondNumber) {
        //var deferred = $q.defer();

        //var Sum = $resource('api/Values/Sum?firstNumber=:firstNumber&secondNumber=:secondNumber',
        //    { firstNumber: '@firstNumber', secondNumber: '@secondNumber' });
        //var sum = Sum.get({ firstNumber: firstNumber, secondNumber: secondNumber },
        //    function (data) {
        //        console.log(data);
        //        deferred.resolve(data);
        //    }, 
        //    function (error) {
        //        deferred.reject(error);
        //    });
        //return deferred.promise;

        //var resObj = $resource('api/Values/Sum?firstNumber=:firstNumber&secondNumber=:secondNumber',
        //    { firstNumber: '@firstNumber', secondNumber: '@secondNumber' },
        //    {
        //        'myGet': {
        //            isArray: false,
        //            transformResponse: function (data) {
        //                console.log(data);
        //                var resutl = { result: angular.fromJson(data) };
        //                console.log(resutl);
        //                return resutl;
        //            },
        //            method: 'GET',
        //            params: { firstNumber: firstNumber, secondNumber: secondNumber },
        //        }
        //    });
        //var result = resObj.myGet();
        //return result;
        
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: 'api/Values/Sum?firstNumber=' + firstNumber + ' &secondNumber=' + secondNumber,
        })
            .success(function (data) {
                deferred.resolve(data);
            })
            .error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;

    }
    return {
        sumNumbers: sumNumbers,
    };
});