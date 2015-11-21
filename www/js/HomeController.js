angular.module('ionicParseApp.controllers')
.controller('HomeController', function ($scope, $state, $rootScope) {

    if (!$rootScope.isLoggedIn) {
        $state.go('welcome');
    }

    $scope.posts = [];

    $scope.getPosts = function () {
        var currentUser = Parse.User.current();

        var postQuery = new Parse.Query("Post");
        postQuery.equalTo("createdBy", currentUser.id);

        postQuery.find().then(function (posts) {

            Parse.Promise.as().then(function () {
                // Collect one promise for each query into an array.
                var promises = [];

                for (var i = 0; i < posts.length; i++) {
                    (function (j) {  //create new closure so i changes with each callback
                        var post = posts[j];
                        post.photos = [];
                        var photoQuery = new Parse.Query('Photo');
                        photoQuery.equalTo("postId", post.id);

                        promises.push(
                          photoQuery.find({
                              success: function (results) {
                                  if (results.length > 0) {
                                      post.photos = results;
                                  }

                                  $scope.posts.push(post);
                              }
                          })
                        );
                    })(i);
                }
                // Return a new promise that is resolved when all of the queries are finished.
                return Parse.Promise.when(promises);

            }).then(function () {
            });
        });
    };

    $scope.loadFiles = function (post) {

    };

    $scope.getPosts();
})