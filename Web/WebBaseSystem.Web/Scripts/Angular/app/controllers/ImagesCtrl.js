'use strict';

webBaseModule.controller('ImagesCtrl',
    ['$scope', '$http', '$log', '$cookieStore', '$routeParams', '$resource', '$location', 'imagesService',
    function ImagesCtrl($scope, $http, $log, $cookieStore, $routeParams, $resource, $location, imagesService) {
        $scope.images;

        function updatePictures() {
            imagesService.getAll($cookieStore.get('access_token'))
                            .then(function (data) {
                                $scope.images = data;
                            })
                            .catch($log.error);
        }

        updatePictures();

        $scope.getAll = function () {
            updatePictures();
        }

        $scope.add = function (image, title, id, form) {
            if (form.$valid) {
                var isSizeCorrect = checkImageSize(id),
                    isCorrectFileFormat = checkFileExtension(id);
                if (isSizeCorrect && isCorrectFileFormat) {
                    var input = document.getElementById(id);
                    var image = input.files[0];
                    imagesService.add(image, title, $cookieStore.get('access_token'))
                        .then(function (data) {
                            console.log(data);
                            console.log('ADDED');
                            $location.path('/getAllImages');
                        })
                        .catch($log.error);
                } else {
                    console.log('Size or format incorrect!');
                }
            }
            if (form.$invalid) {
                console.log('Not valid form');
            }
        }

        $scope.id = $routeParams.id;
        if ($scope.id) {
            imagesService.deleteById($scope.id, $cookieStore.get('access_token'))
                    .then(function (data) {
                        console.log('DELETE');
                        $location.path('/getAllImages');
                    })
                    .catch($log.error);
        }

        $scope.delete = function (id, form) {
            console.log("Id: " + id);
            if (form.$valid) {
                imagesService.deleteById(id, $cookieStore.get('access_token'))
                    .then(function (data) {
                        updatePictures();
                        console.log('DELETE');
                    })
                    .catch($log.error);
            }
            if (form.$invalid) {
                console.log("Not valid form");
            }
        }

        $scope.deleteAll = function () {
            imagesService.deleteAll($cookieStore.get('access_token'))
                    .then(function (data) {
                        updatePictures();
                        console.log('DELETE ALL');
                        //$location.path('/getAllImages');
                    })
                    .catch($log.error);
        }

        var validFileExtensions = [".jpg", ".jpeg", ".bmp", ".gif", ".png"];

        function checkFileExtension(inputId) {
            var input = document.getElementById(inputId);
            if (input.type == "file") {
                var fileName = input.value;
                if (fileName.length > 0) {
                    var isValid = false;
                    for (var j = 0; j < validFileExtensions.length; j++) {
                        var currentExtension = validFileExtensions[j];
                        if (fileName.substr(fileName.length - currentExtension.length, currentExtension.length).toLowerCase() == currentExtension.toLowerCase()) {
                            isValid = true;
                            break;
                        }
                    }

                    if (!isValid) {
                        alert("Sorry, " + fileName + " is invalid, allowed extensions are: " + validFileExtensions.join(", "));
                        return false;
                    }
                }
            }

            return true;
        }

        function checkImageSize(inputId, maxSize) {
            maxSize = maxSize || 2048000;
            var input = document.getElementById(inputId);
            if (input.files && input.files.length == 1) {
                if (input.files[0].size > maxSize) {
                    alert("Picture must be less than 2MB.");
                    return false;
                }
            }
            return true;
        }
    }]
);