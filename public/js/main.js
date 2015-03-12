
var fbprovider;
var cv = angular.module('cv', ['facebook','ngRoute','ngAnimate'])
cv.config(
  ['FacebookProvider','$routeProvider', 
    function(FacebookProvider, $routeProvider) { 

      fbprovider = FacebookProvider;
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
                controller  : 'mainController'
            });
   }])

function mainController($scope, $http, Facebook) {

  $scope.formData = {};
  $scope.loginStatus = 'disconnected';
  $scope.facebookIsReady = false;
  $scope.user = null;


  $http.get('/api/appid').success(function(data) {
    console.log('app id: ' + data);
    $scope.appid = data;
    fbprovider.init($scope.appid);
  }).error(function(data) {
    console.log('Error: ' + data);
  });



  $scope.login = function () {
    Facebook.login(
      function(response) {
        $scope.loginStatus = response.status;
        $scope.api();            
        console.log(response.status);
      },{
        scope: 'public_profile,email', 
        return_scopes: true
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


