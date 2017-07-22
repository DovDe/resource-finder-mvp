'use strict';

/**
 * @ngdoc function
 * @name resourceFinderMvpApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the resourceFinderMvpApp
 */


angular.module('resourceFinderMvpApp')
.controller('MainCtrl', function(NgMap) {
var vm = this;
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
  });




});  //close controller
