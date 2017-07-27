'use strict';

/**
 * @ngdoc overview
 * @name resourceFinderMvpApp
 * @description
 * # resourceFinderMvpApp
 *
 * Main module of the application.
 */
angular
  .module('resourceFinderMvpApp', [
    'ui.router',
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMap',
    'firebase'
  ])
  .config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider)  {
      $urlRouterProvider.otherwise('/main');
    $stateProvider
    .state( 'user-profile',{
      url: '/user-profile',
      templateUrl: 'views/user-profile.html',
      controller: 'UserProfileCtrl'
    })
    .state( 'add-a-resource',{
      url: '/add-a-resource',
      templateUrl: 'views/add-a-resource.html',
      controller: 'AddAResourceCtrl'
    })
    .state( 'main',{
      url: '/main',
      templateUrl: 'views/main.html',
      controller: 'MainCtrl as vm'
    })
    .state( 'user-profile.register',{
      url: '/user-profile.regiser',
      templateUrl: 'views/user-profile.register.html',
      controller: 'UserProfileCtrl'
    })
    .state( 'user-profile.login',{
      url: '/user-profile.login',
      templateUrl: 'views/user-profile.login.html',
      controller: 'UserProfileCtrl'
    });
  }]);
