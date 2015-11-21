// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'FashionGhost' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('FashionGhost', ['ionic'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true)
      }
      if (window.StatusBar) {
        StatusBar.styleDefault()
      }

      Parse.initialize('qHDj4x6Wc9qqp4kChk9u2pTURr2EQdh5aaMMYU3W', 'f5h0XtsTnEXmtPRMvTv47ndZD8xSSPuhNhjjAToc')

    })
  })
