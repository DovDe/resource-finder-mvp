'use strict';

/**
 * @ngdoc service
 * @name resourceFinderMvpApp.current
 * @description
 * # current
 * Factory in the resourceFinderMvpApp.
 */
angular.module('resourceFinderMvpApp')
//use $resource in function
  .factory('current', function () {
    // Service logic
    // ...
        //
        // // Public API here
        //  return $resource('https://crossorigin.me/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=:lat,:lng&radius=1000&keyword=homeless+shelter&key=AIzaSyD7YjbLtUlWB6hn-VeTBJEhdch7sCOJVO0', {}, {
        //    query: {
        //      method:'GET',
        //      params:{
        //         lat:'47.6062095',
        //         lng:'-122.3320708'
        //      },
        //      isArray:false
        //    }
        //  });
   });
