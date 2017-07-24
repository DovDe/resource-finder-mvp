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
    'ngMap'
  ])
  .config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider)  {
    $urlRouterProvider.otherwise('/');

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

  }]);
