
var foods = angular.module('foods', ['facebook','ngRoute','ngAnimate'])
foods.config(
  ['FacebookProvider','$routeProvider', 
    function(FacebookProvider, $routeProvider) { // , FacebookProvider
      FacebookProvider.init('785659141493231');
      $routeProvider.when('/why', {
                templateUrl : 'why.html',
                controller  : 'mainController'
            });
      $routeProvider.when('/code', {
                templateUrl : 'code.html',
                controller  : 'mainController'
            });
      $routeProvider.otherwise( {
                templateUrl : 'main.html',
                controller  : 'foodController'
            });
   }])

function mainController($scope, $http, Facebook) {

  $scope.formData = {};
  $scope.loginStatus = 'disconnected';
  $scope.facebookIsReady = false;
  $scope.user = null;
  
  $scope.login = function () {
    Facebook.login(function(response) {
      $scope.loginStatus = response.status;
      $scope.api();            
      console.log(response.status);
    });
  };
  
  $scope.api = function () {
    Facebook.api('/me', function(response) {
      console.log(response);
      $scope.user = response;
    });
  };
  
  $scope.$watch(function() {
    return Facebook.isReady();
  }, function(newVal) {
    if (newVal) {
        Facebook.getLoginStatus(function(response){
          if (response.status === 'connected') {
            var uid = response.authResponse.userID;
            var accessToken = response.authResponse.accessToken;
            $scope.loginStatus ='connected';
            $scope.api();            
          } else if (response.status === 'not_authorized') {
            // the user is logged in to Facebook, 
            // but has not authenticated your app
          } else {
            // the user isn't logged in to Facebook.
          }
        });
      $scope.facebookIsReady = true;
    }
  });

}


