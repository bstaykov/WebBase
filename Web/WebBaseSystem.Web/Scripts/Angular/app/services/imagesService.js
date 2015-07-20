'use strict';

webBaseModule.factory('imagesService', ['$http', '$q', 'baseUrl', 'localhostUrl',
    function imagesService($http, $q, baseUrl, localhostUrl) {
        var url = localhostUrl;

        function getAll(image) {
            var deferred = $q.defer();

            $http.get(url + 'api/Images/GetAll')
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }

        function add(image) {
            var deferred = $q.defer(),
                fd = new FormData();
            fd.append('image', image);
            $http.post(url + 'api/Images/Add', fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': 'multipart/form-data' }
            })
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;

            //console.log(image);
            //var deferred = $q.defer();
            //$http.post(url + 'api/Images/Add', image, {
            //    withCredentials: true,
            //    headers: { 'Content-Type': undefined },
            //    transformRequest: angular.identity
            //})
            //    .success(function (data) {
            //        deferred.resolve(data);
            //    })
            //    .error(function (error) {
            //        deferred.reject(error);
            //    });
            //return deferred.promise;
        }

        function deleteById(id) {
            var deferred = $q.defer();

            $http.post(url + 'api/Images/Delete', id)
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }

        function deleteAll() {
            var deferred = $q.defer();

            $http.post(url + 'api/Images/DeleteAll')
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }

        return {
            getAll: getAll,
            add: add,
            deleteById: deleteById,
            deleteAll: deleteAll,
        };
    }]);