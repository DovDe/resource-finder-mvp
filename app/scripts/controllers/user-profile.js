'use strict';

/**
 * @ngdoc function
 * @name resourceFinderMvpApp.controller:UserProfileCtrl
 * @description
 * # UserProfileCtrl
 * Controller of the resourceFinderMvpApp
 */
angular.module('resourceFinderMvpApp')

  .controller('UserProfileCtrl', function ($scope, authentication) {

        $scope.login= function(){
              authentication.login($scope.user);
        };

        $scope.logout= function(){
              authentication.logout();
        };

        $scope.register= function(){
            authentication.register($scope.user);
        };//register


  }); //controller
