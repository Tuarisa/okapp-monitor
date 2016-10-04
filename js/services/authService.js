var app = angular.module('authService', [])

app.factory("AuthenticationService", function($http, $sanitize,$location, SessionService, FlashService) {

  var cacheSession   = function() {
    SessionService.set('authenticated', true);
  };

  var uncacheSession = function() {
    SessionService.unset('authenticated');
  };

  var loginError = function(response) {
    //FlashService.show(response.flash);
     $location.path('/login');
  };

  var sanitizeCredentials = function(credentials) {
    return {
      email: $sanitize(credentials.email),
      password: $sanitize(credentials.password),
    };
  };

  return {
    login: function(credentials) {
      console.log(credentials);
      FlashService.clear();
      SessionService.set('login', credentials.email);
      oktell.connect({
          debugMode: false,  
          url: 'oktell.olp.ru:4055', //your oktell IP or domain name
          expires: 14*24*60*60,
          login: credentials.email,
          password: credentials.password,
          callback: function(data) {
              console.log(data);
              if (data.result ==false){
                SessionService.unset('login');
                loginError();
                console.log('failed')
              }
              else
                cacheSession();



          }
      });
      return oktell;
    },

    /*change: function(credentials) {
      var login = $http.post("/auth/change", sanitizeCredentials(credentials));
      login.success(FlashService.clear);
      login.error(loginError);
      return login;
    },*/

    logout: function() {
      oktell.disconnect(false);
      uncacheSession();
      SessionService.unset('login');
      
      return;
    },
    isLoggedIn: function() {
      return SessionService.get('authenticated');
    },
    savedLogin: function(){
      return SessionService.get('login');
    },
    CheckisLoggedIn: function() {
      var check = oktell.getMyInfo();
      return check.userid!=undefined;
    },
    GetUserName: function() {
      var check = oktell.getMyInfo().login;
      console.log('Ask username');
      return check;
    }
  };
});

app.factory("SessionService", function() {
  return {
    get: function(key) {
      return sessionStorage.getItem(key);
    },
    set: function(key, val) {
      return sessionStorage.setItem(key, val);
    },
    unset: function(key) {
      return sessionStorage.removeItem(key);
    }
  }
});

app.factory("FlashService", function($rootScope) {
  return {
    show: function(message) {
      $rootScope.flash = message;
    },
    clear: function() {
      console.log('clear');
      $rootScope.flash = "";
      console.log($rootScope.flash);
    }
  }
});

app.controller("LoginController", function($scope, $location, AuthenticationService) {
  $scope.credentials = { email: "", password: "" };

  var response = AuthenticationService.CheckisLoggedIn();
  console.log(response);
  var login = AuthenticationService.savedLogin();
  if (response){
  	 $location.path('/home');
  	 return;
  }
  if (login){
    console.log('login find')
    oktell.on('connecting',function(){
      $location.path('/home');

    });
    AuthenticationService.login({ email: login, password: null })
  }
  	
  $scope.login = function() {
    oktell.on('connecting',function(){
      $location.path('/home');

    });
    AuthenticationService.login($scope.credentials);
  };
});

app.controller("ChangeController", function($scope, $location, AuthenticationService) {
  $scope.credentials = { email: "", password: "" };
  $scope.onlypassword = true;
  $scope.login = function() {
    AuthenticationService.change($scope.credentials).success(function() {
      $location.path('/home');
    });
  };
});