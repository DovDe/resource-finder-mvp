'use strict';

/**
 * @ngdoc function
 * @name resourceFinderMvpApp.controller:AddAResourceCtrl
 * @description
 * # AddAResourceCtrl
 * Controller of the resourceFinderMvpApp
 */
angular.module('resourceFinderMvpApp')
  .controller('AddAResourceCtrl', function ($firebaseAuth, $firebaseArray, $scope) {

    var ref= firebase.database().ref();
    var auth= $firebaseAuth();



      auth.$onAuthStateChanged(function(authUser){
           if (authUser){
       }  //auth user
     }); // onAuthStateChanged

  });  //controller
