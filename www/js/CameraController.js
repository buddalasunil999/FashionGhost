﻿document.addEventListener("deviceready", onDeviceReady, true);
console.log('CameraController');
function onDeviceReady() {
  console.log("xxsssdfafadfa");
    console.log(navigator.camera);
}


angular.module('ionicParseApp.controllers')
.controller('CameraController', function ($scope, $state, $rootScope, $stateParams, $ionicHistory,$cordovaCamera) {

   $scope.takePicture = function () {
          console.log("asdfasdfasssss");
                    var options = {
                      quality: 75,
                      destinationType: Camera.DestinationType.DATA_URL,
                      sourceType: Camera.PictureSourceType.CAMERA,
                      allowEdit: true,
                      encodingType: Camera.EncodingType.JPEG,
                      targetWidth: 300,
                      targetHeight: 300,
                      popoverOptions: CameraPopoverOptions,
                      saveToPhotoAlbum: false
                  };

                      $cordovaCamera.getPicture(options).then(function (imageData) {
                          $scope.imgURI = "data:image/jpeg;base64," + imageData;
                      }, function (err) {
                          // An error occured. Show a message to the user
                      });
                  }

                  $scope.choosePhoto = function () {
                    var options = {
                      quality: 75,
                      destinationType: Camera.DestinationType.DATA_URL,
                      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                      allowEdit: true,
                      encodingType: Camera.EncodingType.JPEG,
                      targetWidth: 300,
                      targetHeight: 300,
                      popoverOptions: CameraPopoverOptions,
                      saveToPhotoAlbum: false
                  };

                      $cordovaCamera.getPicture(options).then(function (imageData) {
                          $scope.imgURI = "data:image/jpeg;base64," + imageData;
                      }, function (err) {
                          // An error occured. Show a message to the user
                      });
                  }

});