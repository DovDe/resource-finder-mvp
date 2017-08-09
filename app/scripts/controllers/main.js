'use strict';

/**
 * @ngdoc function
 * @name resourceFinderMvpApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the resourceFinderMvpApp
 */


angular.module('resourceFinderMvpApp')
.controller('MainCtrl', function(NgMap, $scope, $state, $rootScope, $timeout, $firebase, $firebaseAuth, $firebaseArray, $firebaseObject) {
      var vm = this;
      vm.addingResource =false;
      vm.hideinput = false;
      vm.inProgress = false;


   //   geocoding to get address from lat lng
            var geocoder = new google.maps.Geocoder;
             function geocodeLatLng(geocoder, map) {
                         var input = document.getElementById('latlng').value;
                         var latlngStr = input.split(',', 2);
                         var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
                         geocoder.geocode({'location': latlng}, function(results, status) {
                           if (status === 'OK') {
                             if (results[1]) {
                               console.log(results[1].formatted_address);
                                 $rootScope.NewResourceAddress= results[1].formatted_address;
                                 console.log($rootScope.NewResourceAddress);
                               // map.setZoom(11);
                               // var marker = new google.maps.Marker({
                               //   position: latlng,
                               //   map: map
                               // });
                               // infowindow.setContent(results[1].formatted_address);
                               // infowindow.open(map, marker);
                             } else {
                               window.alert('No results found');
                             }
                           } else {
                             window.alert('Geocoder failed due to: ' + status);
                           }
                         });
             }   // close geocodeLatLng




      // places changed function
      vm.placeChanged = function() {
              vm.place = this.getPlace();
              vm.map.setCenter(vm.place.geometry.location);
      };  // close placeChanged



      //  get map function
        NgMap.getMap().then(function(map) {
                 vm.map = map;
                 vm.home = vm.map.getCenter();
                 $rootScope.currentMarkerLat = vm.home.lat();
                 $rootScope.currentMarkerLng = vm.home.lng();
                 var markerstringvalue = $rootScope.currentMarkerLat.toString()+","+$rootScope.currentMarkerLng.toString();
                 vm.currentMarkerValue = markerstringvalue;





         vm.centerChanged = function() {
             vm.home = vm.map.getCenter();
             };
        }); //close getMap


        vm.placeMarker = function(e) {

                if (vm.inProgress){
                    return;
                }else {

                    var marker = new google.maps.Marker({position: e.latLng, map: vm.map});
                    vm.map.panTo(e.latLng);

                    vm.home = vm.map.getCenter();
                    $rootScope.currentMarkerLat = vm.home.lat();
                    $rootScope.currentMarkerLng = vm.home.lng();

                    var markerstringvalue = $rootScope.currentMarkerLat +","+ $rootScope.currentMarkerLng;
                    vm.currentMarkerValue = markerstringvalue;

                    // console.log(markerstringvalue);
                    //  show custom marker method
                    vm.showCustomMarker= function(evt) {
                              vm.map.customMarkers.customthings.setVisible(true);
                               vm.map.customMarkers.customthings.setPosition(vm.home);
                    };  // close showCustomMarker

                    vm.showCustomMarker();

                    // disable maps onclick
                    vm.inProgress = true;

              }  // close else
              $timeout(function(){
                      geocodeLatLng(geocoder, map);
               },300);  // close timeout

        } ;   // close placeMarker



        vm.addnewresource = function() {
                vm.addingResource = true;
        };





        // close custom marker function
        vm.closeCustomMarker= function(evt) {
                   vm.map.customMarkers.customthings.setVisible(false);
        };

        // re-enable onclick after 300mls
          vm.reAble=  function(){
              $timeout(function(){
                      vm.inProgress = false;
               },500);  // close timeout
        }; // close vm.reAble


          var ref= firebase.database().ref();
        var resourceRef = ref.child('resource');
        var resourceInfo = $firebaseArray(resourceRef);

        $rootScope.resource = resourceInfo;


        resourceInfo.$loaded().then(function(data){
          $rootScope.numberOfResources = resourceInfo.length;


      });  // closer loaded.then

});  //close controller
