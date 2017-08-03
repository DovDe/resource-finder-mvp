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
              },
              'new-resource': {
                templateUrl: 'views/add-a-resource.html',
                controller: 'AddAResourceCtrl',
                resolve:{
                   // Since it's not a promise, it resolves immediately.
                   currentAuth:  function(authentication){
                      return authentication.requireAuth();
                   } // currentAuth
                },  //  resol
              }
      }

    })
    .state( 'main.add-a-resource',{
      url: 'main/add-a-resource',
      resolve:{
         // Since it's not a promise, it resolves immediately.
         currentAuth:  function(authentication){
            return authentication.requireAuth();
         } // currentAuth
      },  //  resolve
      views: {
          'new-resource': {
            templateUrl: 'views/add-a-resource.html',
            controller: 'AddAResourceCtrl'
          }
      }


    })
    .state( 'user-profile.register',{
      url: '/user-profile.register',
      templateUrl: 'views/user-profile.register.html',
      controller: 'UserProfileCtrl'
    })
    .state( 'user-profile.login',{
      url: '/user-profile.login',
      templateUrl: 'views/user-profile.login.html',
      controller: 'UserProfileCtrl'
    });


  }]);

//   $rootScope.$on('$stateChangeError',
// function(event, toState, toParams, fromState, fromParams, error){ ... })
