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
  .config(function ($stateProvider, $urlRouterProvider) {
 $stateProvider
 .state('main',{
            url: '/main',
            templateUrl: '/main.html',
            controller: 'MainCtrl'
          })
$urlRouterProvider.otherwise('/main.html');
  })
