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

//                  var parseFile = new Parse.File(name, {base64: $scope.base64string}, "image/jpg");
                                          parseFile.save().then(function(reponse) {
                                                                   //IMAGE SUCCESSFULLY UPLOADED
                                                                    var alertPopup = $ionicPopup.alert({
                                                                                                      title: 'Don\'t eat that!',
                                                                                                      template: reponse
                                                                                                    });

                                          },
                                          function(error){
                                          alert(error.message);
                                          });



}


//                  image.save(null, {
//                      success: function (response) {
//                                var alertPopup = $ionicPopup.alert({
//                                     title: 'Don\'t eat that!',
//                                     template: 'It might taste good'
//                                   });
//                      },
//                      error: function (response, error) {
//                          $scope.error.message = error;
//                      }
//                    });

//                  $scope.choosePhoto = function () {
//                    var options = {
//                      quality: 75,
//                      destinationType: Camera.DestinationType.DATA_URL,
//                      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
//                      allowEdit: true,
//                      encodingType: Camera.EncodingType.JPEG,
//                      targetWidth: 300,
//                      targetHeight: 300,
//                      popoverOptions: CameraPopoverOptions,
//                      saveToPhotoAlbum: false
//                  };

//                      $cordovaCamera.getPicture(options).then(function (imageData) {
//                          $scope.imgURI = "data:image/jpeg;base64," + imageData;
//                      }, function (err) {
//                          // An error occured. Show a message to the user
//                      });
                  // }

});
