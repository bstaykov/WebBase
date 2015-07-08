'use strict';

webBaseModule.controller('AuthCtrl',
    ['$scope', '$http', '$log', '$cookieStore', '$routeParams', '$resource', '$location', 'authService', 'sha1',
    function AuthCtrl($scope, $http, $log, $cookieStore, $routeParams, $resource, $location, authService, sha1) {

        $scope.userLabel = "";

        $location.path("/");
        $scope.isLogedIn = false;
        $scope.isLogedOut = true;

        $scope.userInfo;

        $scope.authLink = 'Scripts/Angular/app/views/partials/auth.html';

        $scope.register = function (user, form) {
            if (form.$valid) {
                if (user.password != user.confirmpassword) {
                    console.log("Pass != Confirm");
                    return;
                }

                var hashedPassword = sha1.hash(user.password);
                var userInfo = {
                    "UserName": user.username,
                    "Email": user.email,
                    "Password": hashedPassword,
                    "ConfirmPassword": hashedPassword,
                }

                console.log(userInfo);

                authService.register(userInfo)
                    .then(function (data) {
                        console.log(data);
                        $location.path('/');
                    })
                    .catch($log.error);
            }
            if (form.$invalid) {
                console.log("Not valid form");
            }
        }

        $scope.login = function (user, form) {
            console.log('LOGIN');
            if (form.$valid) {

                if ($cookieStore.get('access_token')) {
                    $cookieStore.remove('access_token');
                    console.log("cookie deleted manualy");
                    $scope.isLogedIn = false;
                    $scope.isLogedOut = true;

                    return;
                }

                if ($cookieStore.get('access_token')) {
                    console.log('COOKIE ALREADY LOGED');
                    //$location.path('/logInLogOut');
                    $scope.isLogedIn = true;
                    $scope.isLogedOut = false;
                    return;
                }

                var hashedPassword = sha1.hash(user.password);

                var userInfo = {
                    "username": user.username,
                    "password": hashedPassword,
                }

                console.log(userInfo);

                authService.login(userInfo)
                    .then(function (data) {
                        logSession(data);
                        console.log("Data :");
                        $log.data;

                        //$location.path('/getPosts');
                        $scope.isLogedIn = true;
                        $scope.isLogedOut = false;
                        $scope.userLabel = data.userName;
                    })
                    .catch($log.error);
            }
            if (form.$invalid) {
                console.log("Not valid form");
            }
        }

        $scope.logout = function () {
            // test
            if (!$cookieStore.get('access_token')) {
                console.log('COOKIE NOT LOGED');
                return;
            }

            authService.logout($cookieStore.get('access_token'))
                .then(function (data) {
                    console.log(data);
                    $cookieStore.remove('access_token');
                    console.log('COOKIE LOGED OUT');
                    //$location.path('/homePage');
                    $scope.isLogedIn = false;
                    $scope.isLogedOut = true;
                    $scope.userLabel = "";
                    $scope.userInfo = {
                        "email": "",
                        "isDriver": false,
                        "car": ""
                    }
                })
                .catch($log.error);;
        }

        $scope.userInfo = function () {
            // test
            if (!$cookieStore.get('access_token')) {
                console.log('COOKIE NOT LOGED');
                return;
            }

            authService.userInfo($cookieStore.get('access_token'))
                .then(function (data) {
                    console.log(data);
                    //$location.path('/homePage');
                    $scope.userInfo = {
                        "email": data.email,
                    }
                })
                .catch($log.error);
        }

        function logSession(userSessionData) {
            //sessionStorage.setItem('sessionKey', userSessionData['sessionKey']);
            //sessionStorage.setItem('username', userSessionData['username']);

            // test
            $cookieStore.put('access_token', userSessionData['access_token']);

            console.log("After login data: " + userSessionData);
            console.log('COOKIE LOGED IN');

            console.log("Access_token" + $cookieStore.get('access_token'));
        }

        // TEST LOG WITH PARAMS
        $scope.username = $routeParams.username;
        $scope.password = $routeParams.password;
        if ($scope.username != null && $scope.password != null) {
            logParams($scope.username, $scope.password);
        }

        function logParams(username, password) {
            //test
            var user = { Name: username, Password: password };

            if ($cookieStore.get('sessionKey')) {
                console.log('COOKIE ALREADY LOGED');
            }

            if (sessionStorage.getItem('sessionKey')) {
                console.log('ALREADY LOGED');
                $location.path('/logInLogOut');
                return;
            }
            user.Password = sha1.hash(user.Password);
            authService.login(user)
                .then(function (data) {
                    logSession(data);
                    console.log("Session Key: " + data.sessionKey);
                    console.log('COOKIE LOGED IN');
                    //$location.path('/getPosts');
                    $scope.isLogedIn = true;
                    $scope.isLogedOut = false;
                })
                .catch($log.error);
        }
    }]
);