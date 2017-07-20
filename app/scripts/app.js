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
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/add-a-resource', {
        templateUrl: 'views/add-a-resource.html',
        controller: 'resourceCtrl',
        controllerAs: 'about'
      })
      .when('/user-profile', {
        templateUrl: 'views/user-profile.html',
        controller: 'userCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
