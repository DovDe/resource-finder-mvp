'use strict';

/**
 * @ngdoc function
 * @name resourceFinderMvpApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the resourceFinderMvpApp
 */


angular.module('resourceFinderMvpApp')
.controller('MainCtrl', function(NgMap, $scope, $state, $rootScope, $timeout, $firebase,
   $firebaseAuth, $firebaseArray, authentication) {

      var vm = this;
      //  ---------------- setting variables to extract firebase data   ---------------------------

      var auth= $firebaseAuth();
      var ref= firebase.database().ref();
      var resourceRef = ref.child('resource');
      var resourceInfo = $firebaseArray(resourceRef);



        vm.resourceMarkers = resourceInfo;

        $rootScope.address = vm.address;
        $rootScope.resource = resourceInfo;

      vm.addingResource =false;
      vm.hideinput = false;
      vm.inProgress = false;
      vm.trueMarkerTypes=[];
      vm.markerFilters = false;
      $rootScope.homeIcon = "/images/home.png";
      $rootScope.userProfileIcon= "/images/user-profile.png";
      $rootScope.settingsIcon= "/images/settings.png";
      var geocoder = new google.maps.Geocoder;


   // ----  geocoding to get address from lat lng  --------
      var geocodeLatLng =    function(geocoder) {
                         var input = document.getElementById('latlng').value;
                         var latlngStr = input.split(',', 2);
                         var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
                         geocoder.geocode({'location': latlng}, function(results, status) {
                           if (status === 'OK') {
                             if (results[1]) {
                              //  console.log(results[1].formatted_address);
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
             };   // close geocodeLatLng

             NgMap.getMap().then(function(map) {
                        vm.map = map;

                         // updating lat lng for click function
                          vm.home = vm.map.getCenter();
                          $rootScope.currentMarkerLat = vm.home.lat();
                          $rootScope.currentMarkerLng = vm.home.lng();
                          var markerstringvalue = $rootScope.currentMarkerLat.toString()+","+$rootScope.currentMarkerLng.toString();
                          vm.currentMarkerValue = markerstringvalue;



             }); //close getMap


      // places changed function
      vm.placeChanged = function() {
              vm.place = this.getPlace();
              vm.map.setCenter(vm.place.geometry.location);
      };  // close placeChanged




      //  get map function


// this function  is what opens the custom window to enable the user to navigat to the add-a-resource state
        vm.placeMarker = function(e) {

                  if (vm.inProgress){
                      return;
                  }else {


                      vm.map.panTo(e.latLng);

                      vm.home = vm.map.getCenter();
                      $rootScope.currentMarkerLat = vm.home.lat();
                      $rootScope.currentMarkerLng = vm.home.lng();

                      var markerstringvalue = $rootScope.currentMarkerLat +","+ $rootScope.currentMarkerLng;
                      vm.currentMarkerValue = markerstringvalue;

                      // console.log(markerstringvalue);
                      //  show custom marker method
                      vm.showCustomMarker= function() {
                                vm.map.customMarkers.customthings.setVisible(true);
                                 vm.map.customMarkers.customthings.setPosition(vm.home);
                      };  // close showCustomMarker

                      vm.showCustomMarker();

                      // disable maps onclick
                      vm.inProgress = true;

                }  // close else
                $timeout(function(){
                        geocodeLatLng(geocoder);
                 },300);  // close timeout

  } ;   // close placeMarker

  // close custom marker function
  vm.closeCustomMarker= function() {
             vm.map.customMarkers.customthings.setVisible(false);
  };

  // re-enable onclick after 300mls
    vm.reAble=  function(){
        $timeout(function(){
                vm.inProgress = false;
         },1000);  // close timeout
  }; // close vm.reAble

  vm.showMarkerData = function (e, resource){
    vm.resource = resource;
    vm.map.showInfoWindow('markerdata', resource.id);
  };

        vm.showMarkerFilters = function() {
          if (vm.markerFilters === false){
            vm.markerFilters = true;
          }else{
            vm.markerFilters= false;
          }
        };

vm.logout = function() {
  authentication.logout();
}
});  //close controller
