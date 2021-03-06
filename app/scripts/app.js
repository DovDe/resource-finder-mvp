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
    .state( 'main',{
      url: '/main',
            views:{
              '':{
                templateUrl:'views/main.html',
                controller: 'MainCtrl as vm'
              }
      }
    })
    .state( 'user-profile.register',{
      url: '/register',
      templateUrl: 'views/user-profile.register.html',
      controller: 'UserProfileCtrl'
    })
    .state( 'user-profile.login',{
      url: '/login',
      templateUrl: 'views/user-profile.login.html',
      controller: 'UserProfileCtrl'
    })
    .state( 'add-a-resource',{
      url: '/add-a-resource',
      templateUrl: 'views/add-a-resource.html',
      controller: 'AddAResourceCtrl',
      resolve:{
         // Since it's not a promise, it resolves immediately.
         currentAuth:  function(authentication){
            return authentication.requireAuth();
         } // currentAuth
      }

    });



  }]);

//   $rootScope.$on('$stateChangeError',
// function(event, toState, toParams, fromState, fromParams, error){ ... })
