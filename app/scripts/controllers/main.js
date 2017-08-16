'use strict';

/**
 * @ngdoc function
 * @name resourceFinderMvpApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the resourceFinderMvpApp
 */


angular.module('resourceFinderMvpApp')
.controller('MainCtrl', function(NgMap, $scope, $state, $rootScope, $timeout, $firebase, $firebaseAuth, $firebaseArray) {
      var vm = this;
      vm.addingResource =false;
      vm.hideinput = false;
      vm.inProgress = false;
      vm.trueMarkerTypes=[];
      var geocoder = new google.maps.Geocoder;

                  vm.infowindow = new google.maps.InfoWindow({
                  content: 'hello'
                  });
      // -------------- create markers function--------

      var populateMarkers = function(data){
      var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      var labelIndex = 0;
        vm.markers= [];
      for (var i=0; i< data.length; i++){

                 var lat = data[i].location.LatLng.lat;
                 var lng = data[i].location.LatLng.lng;
                 var pos = new google.maps.LatLng(lat,lng);

                 //create new markers
                vm.markers[i] =  new google.maps.Marker({position: pos,
                        id: vm.i,
                       //  label: labels[labelIndex++ % labels.length],

                      //  clickable: true,
                       animation: google.maps.Animation.DROP,
                       map: vm.map});
                       vm.markers[i].setMap(vm.map);

      }  //close for loop
    }; // close populateMarkers


     vm.position = [];


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



      // places changed function
      vm.placeChanged = function() {
              vm.place = this.getPlace();
              vm.map.setCenter(vm.place.geometry.location);
      };  // close placeChanged



      //  get map function
  NgMap.getMap().then(function(map) {
             vm.map = map;

              // updating lat lng for click function
               vm.home = vm.map.getCenter();
               $rootScope.currentMarkerLat = vm.home.lat();
               $rootScope.currentMarkerLng = vm.home.lng();
               var markerstringvalue = $rootScope.currentMarkerLat.toString()+","+$rootScope.currentMarkerLng.toString();
               vm.currentMarkerValue = markerstringvalue;

//  ---------------- setting variables to extract firebase data   ---------------------------
           var ref= firebase.database().ref();
           var resourceRef = ref.child('resource');
           var resourceInfo = $firebaseArray(resourceRef);

             vm.resourceMarkers = resourceInfo;

             $rootScope.address = vm.address;

             //  load firebase data then fire function
               resourceInfo.$loaded().then(function(data){
                });  // closer loaded.then

  }); //close getMap



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
         },500);  // close timeout
  }; // close vm.reAble

  vm.showMarkerData = function (e, resource){
    vm.resource = resource;
    vm.map.showInfoWindow('info-window', resource.id);
  };




});  //close controller
