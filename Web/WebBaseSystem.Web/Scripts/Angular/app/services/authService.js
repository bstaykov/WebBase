'use strict';

webBaseModule.factory('authService', ['$http', '$q', 'baseUrl',
    function authService($http, $q, baseUrl) {
        var baseUrl = baseUrl;

        function register(user) {
            var deferred = $q.defer();

            $http.post(baseUrl + 'api/account/register', user)
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }

        function login(user) {
            var deferred = $q.defer();
            $http.post(baseUrl + 'token', 'username=' + user.username + '&password=' + user.password + '&grant_type=password', { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }

        function logout(key) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: baseUrl + 'api/account/logout',
                headers: {
                    'Authorization': "Bearer " + key
                }
            })
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }

        function userInfo(key) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: baseUrl + 'api/account/userInfo',
                headers: {
                    'Authorization': "Bearer " + key
                }
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
            register: register,
            login: login,
            logout: logout,
            userInfo: userInfo,
        };
    }]);