'use strict';

/**
 * @ngdoc function
 * @name resourceFinderMvpApp.controller:UserProfileCtrl
 * @description
 * # UserProfileCtrl
 * Controller of the resourceFinderMvpApp
 */
angular.module('resourceFinderMvpApp')

  .controller('UserProfileCtrl', function (authentication) {
        var vm = this;

        vm.login= function(email, password){
          let user = {
            email: email,
            password: password
          }
          authentication.login(user);


        };

        vm.register= function(email, password){
          let user = {
            email: email,
            password: password
          }
          authentication.register(user);

        };


  }); //controller
