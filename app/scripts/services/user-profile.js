'use strict';

/**
 * @ngdoc service
 * @name resourceFinderMvpApp.userProfile
 * @description
 * # userProfile
 * Factory in the resourceFinderMvpApp.
 */
angular.module('resourceFinderMvpApp')
  .factory('userProfile', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
