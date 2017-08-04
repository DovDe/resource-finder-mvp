'use strict';

/**
 * @ngdoc function
 * @name resourceFinderMvpApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the resourceFinderMvpApp
 */


angular.module('resourceFinderMvpApp')
.controller('MainCtrl', function(NgMap, $scope, $state, $rootScope) {
            var vm = this;
            vm.addingResource = false;

            // places changed function
            vm.placeChanged = function() {
              vm.place = this.getPlace();
              // console.log('location', vm.place.geometry.location);
              vm.map.setCenter(vm.place.geometry.location);
            };  // close placeChanged



            //  get map function
              NgMap.getMap().then(function(map) {
               vm.map = map;
               vm.centerChanged = function() {
                   vm.home = vm.map.getCenter();
                   };
              }); //close getMap


              vm.placeMarker = function(e) {
                      var marker = new google.maps.Marker({position: e.latLng, map: vm.map});
                      vm.map.panTo(e.latLng);
                      vm.home = vm.map.getCenter();
                      $rootScope.lat = vm.home.lat();
                      $rootScope.lng = vm.home.lng();
                      vm.map.showInfoWindow("info-window");
          } ;   // close placeMarker

          vm.addnewresource = function() {
                  vm.addingResource = true;
                  // console.log('whatever');
          };


});  //close controller
