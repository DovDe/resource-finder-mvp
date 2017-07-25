'use strict';

/**
 * @ngdoc function
 * @name resourceFinderMvpApp.controller:UserProfileCtrl
 * @description
 * # UserProfileCtrl
 * Controller of the resourceFinderMvpApp
 */
angular.module('resourceFinderMvpApp')

  .controller('UserProfileCtrl', function () {
        var vm = this;

        vm.register = function() {
        vm.message = vm.user.username;
        };
  });
