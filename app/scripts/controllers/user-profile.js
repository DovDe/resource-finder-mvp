'use strict';

/**
 * @ngdoc function
 * @name resourceFinderMvpApp.controller:UserProfileCtrl
 * @description
 * # UserProfileCtrl
 * Controller of the resourceFinderMvpApp
 */
angular.module('resourceFinderMvpApp')

  .controller('UserProfileCtrl', function ($scope, authentication, $rootScope) {


    $rootScope.homeIcon = "/images/home.png";
    $rootScope.userProfileIcon= "/images/user-profile.png";
    $rootScope.settingsIcon= "/images/settings.png";

        $scope.login= function(){
          $rootScope.message='';
              authentication.login($scope.user);
        };

        $scope.logout= function(){
              authentication.logout();
        };

        $scope.register= function(){
            authentication.register($scope.user);
        };//register


  }); //controller
