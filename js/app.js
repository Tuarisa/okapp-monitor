var commentApp = angular.module('commentApp', ['mainCtrl', 'commentService', 'authService','ngRoute', 'ngSanitize','taskService','userService', 'lineService','cacheService']);

commentApp.config(function($routeProvider) {

  $routeProvider.when('/login', {
    templateUrl: 'templates/login.html',
    controller: 'LoginController'
  });

  $routeProvider.when('/change', {
    templateUrl: 'templates/login.html',
    controller: 'ChangeController'
  });

  $routeProvider.when('/home', {
    templateUrl: 'templates/index.html',
    controller: 'mainController'
  });

    $routeProvider.when('/comment/:id', {
    templateUrl: 'templates/edit.html',
    controller: 'EditOneCommentController'
  });

 

  $routeProvider.otherwise({ redirectTo: '/login' });

});
