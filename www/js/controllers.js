angular.module('ionicParseApp.controllers', [])
.controller('AppController', function ($scope, $state, $rootScope, $ionicHistory, $stateParams) {
    if ($stateParams.clear) {
        $ionicHistory.clearHistory();
        $ionicHistory.clearCache();
    }

    Parse.initialize("qHDj4x6Wc9qqp4kChk9u2pTURr2EQdh5aaMMYU3W", "f5h0XtsTnEXmtPRMvTv47ndZD8xSSPuhNhjjAToc");

    $scope.logout = function () {
        Parse.User.logOut();
        $rootScope.user = null;
        $rootScope.isLoggedIn = false;
        $state.go('welcome', {
            clear: true
        });
    };
})

.controller('WelcomeController', function ($scope, $state, $rootScope, $ionicHistory, $stateParams) {
    if ($stateParams.clear) {
        $ionicHistory.clearHistory();
        $ionicHistory.clearCache();
    }

    $scope.login = function () {
        $state.go('app.login');
    };

    $scope.signUp = function () {
        $state.go('app.register');
    };

    if ($rootScope.isLoggedIn) {
        $state.go('app.home');
    }
})

.controller('HomeController', function ($scope, $state, $rootScope) {

    if (!$rootScope.isLoggedIn) {
        $state.go('welcome');
    }
})

.controller('ForgotPasswordController', function ($scope, $state, $ionicLoading) {
    $scope.user = {};
    $scope.error = {};
    $scope.state = {
        success: false
    };

    $scope.reset = function () {
        $scope.loading = $ionicLoading.show({
            content: 'Sending',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });

        Parse.User.requestPasswordReset($scope.user.email, {
            success: function () {
                // TODO: show success
                $ionicLoading.hide();
                $scope.state.success = true;
                $scope.$apply();
            },
            error: function (err) {
                $ionicLoading.hide();
                if (err.code === 125) {
                    $scope.error.message = 'Email address does not exist';
                } else {
                    $scope.error.message = 'An unknown error has occurred, ' +
                        'please try again';
                }
                $scope.$apply();
            }
        });
    };

    $scope.login = function () {
        $state.go('app.login');
    };
})

.controller('RegisterController', function ($scope, $state, $ionicLoading, $rootScope) {
    $scope.user = {};
    $scope.error = {};

    $scope.register = function () {

        // TODO: add age verification step

        $scope.loading = $ionicLoading.show({
            content: 'Sending',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });

        var user = new Parse.User();
        user.set("username", $scope.user.email);
        user.set("password", $scope.user.password);
        user.set("email", $scope.user.email);

        user.signUp(null, {
            success: function (user) {
                $ionicLoading.hide();
                $rootScope.user = user;
                $rootScope.isLoggedIn = true;
                $state.go('app.home', {
                    clear: true
                });
            },
            error: function (user, error) {
                $ionicLoading.hide();
                if (error.code === 125) {
                    $scope.error.message = 'Please specify a valid email ' +
                        'address';
                } else if (error.code === 202) {
                    $scope.error.message = 'The email address is already ' +
                        'registered';
                } else {
                    $scope.error.message = error.message;
                }
                $scope.$apply();
            }
        });
    };
})

.controller('MainController', function ($scope, $state, $rootScope, $stateParams, $ionicHistory) {
    if ($stateParams.clear) {
        $ionicHistory.clearHistory();
    }

    $scope.rightButtons = [{
        type: 'button-positive',
        content: '<i class="icon ion-navicon"></i>',
        tap: function (e) {
            $scope.sideMenuController.toggleRight();
        }
    }];

    $scope.logout = function () {
        Parse.User.logOut();
        $rootScope.user = null;
        $rootScope.isLoggedIn = false;
        $state.go('welcome', {
            clear: true
        });
    };

    $scope.toggleMenu = function () {
        $scope.sideMenuController.toggleRight();
    };
})

.controller('PostController', function ($scope, $state, $rootScope, $stateParams, $ionicHistory) {
    $scope.createPost = function () {
        var currentUser = Parse.User.current();

        var Post = Parse.Object.extend("Post");
        var post = new Post();
        post.set("createdBy", currentUser.id);

        post.save(null, {
            success: function (response) {
                $scope.submitFile(response.id, 'file1');
                $scope.submitFile(response.id, 'file2');
            },
            error: function (response, error) {
            }
        });
    };

    $scope.submitFile = function (postId, fileId) {
        var fileUploadControl = document.getElementById(fileId).files[0];

        if (fileUploadControl.size > 0) {
            var file = fileUploadControl;
            var name = "photo.jpg";
            var parseFile = new Parse.File(name, file, file.type);

            parseFile.save().then(function () {
                // The file has been saved to Parse.
                var Photo = Parse.Object.extend("Photo");
                var photo = new Photo();
                photo.set("postId", postId);
                photo.set("url", parseFile.url());

                photo.save(null, {
                    success: function (response) {
                        return response.id;
                    },
                    error: function (response, error) {
                        //Failed to upload file
                    }
                });

            }, function (error) {
                // The file either could not be read, or could not be saved to Parse.
            });
        }
    };
});
