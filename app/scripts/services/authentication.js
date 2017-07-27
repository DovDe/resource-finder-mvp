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
          // auth.signInWithEmailAndPassword(
          //   user.email,
          //   user.password
          // ).then
           $rootScope.message = "welcome" + $rootScope.user.email;
         }, //login
         register: function(user){

                   // firebase authentication
                       auth.$createUserWithEmailAndPassword(
                         user.email,
                         user.password
                       ).then(function(regUser)  {
                         var regRef = ref.child('users')
                              .child(regUser.uid).set({
                                date: firebase.database.ServerValue.TIMESTAMP,
                                regUser: regUser.uid,
                               username:  user.username,
                                firstname: user.firstname,
                                lastname: user.lastname,
                                email: user.email,
                                password: user.password

                              });  //user info
                         $rootScope.message = "Hi" + user.firstname + ",Thanks for registering";
                       }).catch(function(error){
                         $rootScope.message = error.message;
                       }); //createUserWithEmailAndPassword
         } //register
    }; //return

  }); // factory
