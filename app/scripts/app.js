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
  .config(['$urlRouteProvider','$stateProvider', function ($urlRouteProvider ,$stateProvider) {
      $urlRouteProvider.otherwise('/');

      $stateProvider.state('home', {
            url: '/',
            templateUrl: '/views/main.html'
          });

  }]);
