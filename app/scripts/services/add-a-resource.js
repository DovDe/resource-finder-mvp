'use strict';

/**
 * @ngdoc service
 * @name resourceFinderMvpApp.addAResource
 * @description
 * # addAResource
 * Factory in the resourceFinderMvpApp.
 */
angular.module('resourceFinderMvpApp')
  .factory('addAResource', function () {
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
