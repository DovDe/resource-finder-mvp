'use strict';

/**
 * @ngdoc service
 * @name resourceFinderMvpApp.authentication
 * @description
 * # authentication
 * Factory in the resourceFinderMvpApp.
 */
angular.module('resourceFinderMvpApp')
  .factory('authentication', function ( $rootScope, $firebaseAuth) {
    // Service logic
    // ...
    //
    var ref= firebase.database().ref();
    var auth= $firebaseAuth();

    // Public API here
    return {
      login: function(user) {
           $rootScope.message = "welcome" + $rootScope.user.email;
         }, //login
         register: function(user){
                   // firebase authentication
                       auth.$createUserWithEmailAndPassword(
                         user.email,
                         user.password
                       ).then(function(regUser)  {
                         $rootScope.message = user.username +
                         ", Thanks for registering";
                       }).catch(function(error){
                         $rootScope.message = error.message;
                       }); //createUserWithEmailAndPassword
         } //register
    }; //return
  });
