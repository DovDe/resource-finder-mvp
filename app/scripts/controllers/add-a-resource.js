'use strict';

/**
 * @ngdoc function
 * @name resourceFinderMvpApp.controller:AddAResourceCtrl
 * @description
 * # AddAResourceCtrl
 * Controller of the resourceFinderMvpApp
 */
angular.module('resourceFinderMvpApp')
  .controller('AddAResourceCtrl', function ($firebase, $firebaseAuth, $firebaseArray, $firebaseObject, $scope, $rootScope) {
    // get resources
    var ref= firebase.database().ref();
    // get authentication
    var auth= $firebaseAuth();


// check to see if user is authenticated
      auth.$onAuthStateChanged(function(authUser){
           if (authUser){

                var resourceRef = ref.child('resource');
                var resourceInfo = $firebaseArray(resourceRef);
                $rootScope.resource = resourceInfo;

             $scope.addResource = function(resource) {
               resourceInfo.$add({
                 resource : {
                   name: $scope.resource.name,
                   date: firebase.database.ServerValue.TIMESTAMP,
                   type: $rootScope.resource.type

                 }
               }); //close resourceInfo

             };  //close addResource
       }  //auth user
     }); // onAuthStateChanged

  });  //controller
