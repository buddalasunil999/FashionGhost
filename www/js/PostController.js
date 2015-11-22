angular.module('ionicParseApp.controllers')
.controller('PostController', function ($scope, $state, $rootScope, $stateParams, $ionicHistory,$cordovaCamera,$ionicPopup) {
//    if (!$rootScope.isLoggedIn) {
//        $state.go('welcome');
//    }

    $scope.createPost = function () {
//        var currentUser = Parse.User.current();

        $scope.error = {};

        var Post = Parse.Object.extend("Post");
        var post = new Post();
        post.set("createdBy", '2BkNTQWhcw');
        post.set("description", $scope.description);

        post.save(null, {
            success: function (response) {
             $scope.SaveImage(response.id,$scope.imageDataOne);
             $scope.SaveImage(response.id,$scope.imageDataTwo);
//                $scope.submitFile(response.id, 'file1');
//                $scope.submitFile(response.id, 'file2');
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

     $scope.takePicture = function (url) {

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

                               $scope.base64string = imageData;
                               if(url==1){
                                       $scope.imageDataOneURI = "data:image/jpeg;base64," + imageData;
                                      $scope.imageDataOne = imageData;
                                    }else{
                                       $scope.imageDataTwoURI = "data:image/jpeg;base64," + imageData;
                                       $scope.imageDataTwo = imageData;
                                    }
                          }, function (err) {
                              // An error occured. Show a message to the user
                          });
                      }


        $scope.SaveImage = function (id,url) {
                      var parseFile = new Parse.File("test.jpg", {base64:  url});
                                              parseFile.save().then(function(reponse) {

                                                             var Photo = Parse.Object.extend("Photo");
                                                             var photo = new Photo();
                                                             photo.set("url", reponse.url());
                                                              photo.set("postId", id);
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

});
