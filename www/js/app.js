angular.module('FashionGhost', ['ionic', 'FashionGhost.controllers'])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/app.html'
      })
      .state('app.home', {
        url: '/home',
        views: {
          'menuContent': {
            templateUrl: 'templates/home.html',
            controller: 'HomeController'
          }
        }
      })

    $urlRouterProvider.otherwise('/')
  })
  .run(function($ionicPlatform, $state, $rootScope) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true)
      }
      if (window.StatusBar) {
        StatusBar.styleDefault()
      }

      Parse.initialize('qHDj4x6Wc9qqp4kChk9u2pTURr2EQdh5aaMMYU3W', 'f5h0XtsTnEXmtPRMvTv47ndZD8xSSPuhNhjjAToc')
      $state.go('app.home');
    })
  })