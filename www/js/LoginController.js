angular.module('FashionGhost.controllers', [])
	.controller('LoginController', ['$state', '$scope', '$stateParams', function ($state, $scope, $stateParams) {
	    $scope.login = function () {
	        alert('test');
	        Parse.User.logIn("Ghost", "ghost", {
	            success: function (user) {
	                $state.go('app.home');
	                // Do stuff after successful login.
	            },
	            error: function (user, error) {
	                // The login failed. Check error to see why.
	            }
	        });
	    };
	}]);