angular.module('ionicParseApp.controllers')
.controller('HomeController', function ($scope, $state, $rootScope) {

    if (!$rootScope.isLoggedIn) {
        $state.go('welcome');
    }

    $scope.posts = [];

    $scope.getPosts = function () {
        var currentUser = Parse.User.current();

        var postQuery = new Parse.Query("Post");
        postQuery.descending("createdAt");
//        postQuery.equalTo("createdBy", currentUser.id);

        postQuery.find({
            success: function (posts) {
                Parse.Promise.as().then(function () {
                    // Collect one promise for each query into an array.
                    var promises = [];
                    for (var i = 0; i < posts.length; i++) {
                        (function (i) {  //create new closure so i changes with each callback
                            var post = posts[i];
                            post.photos = [];
                            var photoQuery = new Parse.Query('Photo');
                            photoQuery.equalTo("postId", post.id);

                            promises.push(
                              photoQuery.find({
                                  success: function (results) {
                                      if (results.length > 0) {
                                          for (x in results) {
                                              results[x].url = results[x].get('url');
                                          }
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

                });
            }
        });
    };

     $scope.takePicture = function () {
                        var options = {
                          quality: 75,
                          destinationType: Camera.DestinationType.DATA_URL,
                          sourceType: Camera.PictureSourceType.CAMERA,
                          allowEdit: false,
                          encodingType: Camera.EncodingType.JPEG,
    //                      targetWidth: 300,
    //                      targetHeight: 300,
                          popoverOptions: CameraPopoverOptions,
                          saveToPhotoAlbum: false
                      };
                          $cordovaCamera.getPicture(options).then(function (imageData) {
                              $scope.imgURI = "data:image/jpeg;base64," + imageData;
                               $scope.base64string = imageData;
                          }, function (err) {
                              // An error occured. Show a message to the user
                          });
                      }


        $scope.SaveImage = function () {
                      var parseFile = new Parse.File("test.jpg", {base64:  $scope.imgURI});

                                              parseFile.save().then(function(reponse) {

                                                             var Photo = Parse.Object.extend("Photo");
                                                             var photo = new Photo();
                                                             photo.set("url", reponse.url());

                                                             photo.save(null, {
                                                                 success: function (response) {
                                                                     var alertPopup = $ionicPopup.alert({
                                                                            title: 'Don\'t eat that!',
                                                                            template: reponse.url
                                                                          });
                                                                 },
                                                                 error: function (response, error) {
                                                                     //Failed to upload file
                                                                 }
                                                             });


                                              },
                                              function(error){
                                              alert(error.message);
                                              });



    }


    $scope.getPosts();
})
