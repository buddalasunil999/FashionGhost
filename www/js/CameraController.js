angular.module('ionicParseApp.controllers')
.controller('CameraController', function ($scope, $state, $rootScope, $stateParams, $ionicHistory,$cordovaCamera,$ionicPopup) {
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
                                                                        title: 'Done',
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

    $scope.SaveB64 = function () {
                  var parseFile = new Parse.File("image.png", {base64:  $scope.base64});

//                  var parseFile = new Parse.File(name, {base64: $scope.base64string}, "image/jpg");
                                          parseFile.save().then(function(reponse) {
                                                                   //IMAGE SUCCESSFULLY UPLOADED
                                                           console.log(reponse.url());

                                          },
                                          function(error){
                                          alert(error.message);
                                          });



}


});
