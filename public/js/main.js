var fbprovider;
var cv = angular.module('cv', ['facebook','ngRoute','ngAnimate'])
cv.config(
  ['FacebookProvider','$routeProvider', '$locationProvider',
    function(FacebookProvider, $routeProvider, $locationProvider) { 

      fbprovider = FacebookProvider;
      $locationProvider.html5Mode(true);
      $routeProvider.when('/why', {
                templateUrl : 'why.html',
                controller  : 'mainController'
            });
      $routeProvider.when('/portfolio', {
                templateUrl : 'portfolio.html',
                controller  : 'mainController'
            });
      $routeProvider.when('/mobile', {
                templateUrl : 'mobile.html',
                controller  : 'mainController'
            });
      $routeProvider.otherwise( {
                templateUrl : 'main.html',
                controller  : 'mainController'
            });
   }])

function mainController($scope, $http, Facebook, $location) {

  $scope.successMsg = $location.search()['success']

  $http.get('/api/isMock').success(function(data) {
    $scope.mock = JSON.parse(data);
    fbprovider.init($scope.mock ? 295250210676747 : 1435706023342923);
  }).error(function(data) {
    console.log('Error: ' + data);
  });

  $scope.addMe = function () {

    mockdata = {
        name: 'Jack'+Math.random(),
        email: 'Jack'+Math.random()+'@mailinator.com'
      };
    contact = {
        name: $scope.user.first_name,
        email: $scope.user.email
      }

    toSend = $scope.mock ? mockdata : contact;
    console.log(toSend.email);

    jump('send', 'automation', 'trigger', '5502a1c52bd0151e438b4567', toSend);

    $location.path('/why').search({success: 'true'});
  }


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


