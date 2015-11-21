angular.module('FashionGhost.controllers', []).controller('MainController', ['$scope', function ($scope) {

    Parse.initialize("qHDj4x6Wc9qqp4kChk9u2pTURr2EQdh5aaMMYU3W", "f5h0XtsTnEXmtPRMvTv47ndZD8xSSPuhNhjjAToc");

    $scope.signUp = function () {
        var user = new Parse.User();
        user.set("username", "Ghost");
        user.set("password", "ghost");
        user.set("email", "testuser@fashionghost.com");

        user.signUp(null, {
            success: function (data) {
                //Success
            },
            error: function (data, error) {
                //failed with error
            }
        });
    };

    $scope.logIn = function () {
        Parse.User.logIn("Ghost", "ghost", {
            success: function (user) {
                // Do stuff after successful login.
            },
            error: function (user, error) {
                // The login failed. Check error to see why.
            }
        });
    };

    $scope.createPost = function () {
        var currentUser = Parse.User.current();

        var Post = Parse.Object.extend("Post");
        var post = new Post();
        post.set("createdBy", currentUser.id);

        post.save(null, {
            success: function (response) {
                $scope.postid = response.id;
                return response.id;
            },
            error: function (response, error) {
            }
        });
    };

    $scope.getPosts = function () {
        var currentUser = Parse.User.current();

        var query = new Parse.Query("Post");
        query.equalTo("createdBy", currentUser.id);

        query.find({
            success: function (results) {
                // results contains all of the Post objects
                for (post in results) {
                    $scope.loadFiles(post.id);
                };
            }
        });
    };

    $scope.submitFile = function (postId) {
        var fileUploadControl = document.getElementById('sampleFile').files[0];

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

    $scope.loadFiles = function (postId) {

        var query = new Parse.Query("Photo");
        query.equalTo("postId", postId);

        query.find({
            success: function (results) {
                // results contains all of the phtots objects
                for (photo in results) {
                };
            }
        });
    };
}]);