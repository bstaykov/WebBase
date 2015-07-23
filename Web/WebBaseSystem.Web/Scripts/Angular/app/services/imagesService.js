'use strict';

webBaseModule.factory('imagesService', ['$http', '$q', 'baseUrl', 'localhostUrl',
    function imagesService($http, $q, baseUrl, localhostUrl) {
        var url = localhostUrl;

        function getAll(key) {
            var deferred = $q.defer();

            $http.get(url + 'api/Images/GetAll', { headers: { 'Authorization': "Bearer " + key }})
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }

        function add(image, title, key) {
            var deferred = $q.defer(),
                fd = new FormData();
            fd.append('image', image);
            fd.append('title', title);
            $http.post(url + 'api/Images/Add', fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined, 'Authorization': "Bearer " + key }
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

        function deleteById(id, key) {
            var deferred = $q.defer();

            $http.delete(url + 'api/Images/Delete',
                {
                    //data: id,
                    params: { id: id },
                    headers: { 'Authorization': "Bearer " + key }
                })
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }

        function deleteAll(key) {
            var deferred = $q.defer();

            $http.delete(url + 'api/Images/DeleteAll',
                {
                    headers: { 'Authorization': "Bearer " + key }
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
            getAll: getAll,
            add: add,
            deleteById: deleteById,
            deleteAll: deleteAll,
        };
    }]);