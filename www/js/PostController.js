angular.module('ionicParseApp.controllers')
.controller('PostController', function ($scope, $state, $rootScope, $stateParams, $ionicHistory) {
    if (!$rootScope.isLoggedIn) {
        $state.go('welcome');
    }

    $scope.createPost = function () {
        var currentUser = Parse.User.current();

        $scope.error = {};

        var Post = Parse.Object.extend("Post");
        var post = new Post();
        post.set("createdBy", currentUser.id);
        post.set("description", $scope.description);

        post.save(null, {
            success: function (response) {
                $scope.submitFile(response.id, 'file1');
                $scope.submitFile(response.id, 'file2');
                $state.go('app.home', {
                    clear: true
                });
            },
            error: function (response, error) {
                $scope.error.message = error;
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