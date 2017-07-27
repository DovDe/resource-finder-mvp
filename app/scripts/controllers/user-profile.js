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

    // console.log($scope.user);
        // var ref= firebase.database().ref();
        // var auth= $firebaseAuth();

        $scope.login= function(){
          // let user = {
          //   email: email,
          //   password: password
          // };
          authentication.login($scope.user);


        };

        $scope.register= function(){
          // let user = {
          //   email: email,
          //   password: password
          // };
          authentication.register($scope.user);

        };//register


  }); //controller
