'use strict';

webBaseModule.controller('AddImagesCtrl',
    ['$scope', '$log', '$cookieStore', '$location', 'imagesService',
    function AddImagesCtrl($scope, $log, $cookieStore, $location, imagesService) {
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