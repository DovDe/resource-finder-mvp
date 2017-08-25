'use strict';

/**
 * @ngdoc function
 * @name resourceFinderMvpApp.controller:AddAResourceCtrl
 * @description
 * # AddAResourceCtrl
 * Controller of the resourceFinderMvpApp
 */
angular.module('resourceFinderMvpApp')
  .controller('AddAResourceCtrl', function ($firebase, $firebaseAuth, $firebaseArray,
     $firebaseObject, $scope, $rootScope, $state, $timeout) {
       // get resources
       var ref= firebase.database().ref();
       // get authentication
       var auth= $firebaseAuth();

   $scope.resourceaddress = $rootScope.NewResourceAddress;
   $scope.resourcelat =  $rootScope.currentMarkerLat;
   $scope.resourcelng=  $rootScope.currentMarkerLng;
   var resourceRef = ref.child('resource');
   var resourceInfo = $firebaseArray(resourceRef);
   $rootScope.resource = resourceInfo;


   $scope.resource.name = '';
   $scope.resource.hours = '';
   $scope.resource.description='';
   $scope.resource.website='';
   $scope.resource.state='';
   $scope.resource.city='';
   $scope.resource.phone='';
   $rootScope.message='';


// check to see if user is authenticated
      auth.$onAuthStateChanged(function(authUser){
           if (authUser){





             $scope.addResource = function(resource) {


               resourceInfo.$add({
                   name: $scope.resource.name,
                   date: firebase.database.ServerValue.TIMESTAMP,
                   type: $scope.resource.type,
                   hours: $scope.resource.hours,
                   description: $scope.resource.description,
                   location: {
                           LatLng: {
                             lat: $scope.currentMarkerLat,
                             lng: $scope.currentMarkerLng
                           },
                           formatted_address: $rootScope.NewResourceAddress,
                           state: $scope.resource.state,
                           city: $scope.resource.city
                   },
                   website: $scope.resource.website,
                   phone: $scope.resource.phone

               }); //close resourceInfo


                      // clear scope
                        $scope.resource.name = '';
                        $scope.resource.type = {
                          shelter: false,
                          water: false,
                          food: false,
                          electricity: false,
                          clothing: false,
                          sanitation: false
                        };
                        $scope.resource.website = '';
                        $scope.resource.hours = '';
                        $scope.resource.description = '';
                        $scope.resource.formatted_address = '';
                        $scope.resource.state = '';
                        $scope.resource.city = '';
                        $scope.resource.phone = '';

                        $scope.message = 'Thanks for adding a resource';

                        //go back to main  view
                        $timeout(function(){
                              $state.go('main');
                        },1000);  // close timeout
             };  //close addResource

            $scope.deleteResource = function(key){
                resourceInfo.$remove(key);
            }; //close deleteResource


       }  //auth user
     }); // onAuthStateChanged


    });  //controller
