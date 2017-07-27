'use strict';

/**
 * @ngdoc service
 * @name resourceFinderMvpApp.authentication
 * @description
 * # authentication
 * Factory in the resourceFinderMvpApp.
 */
angular.module('resourceFinderMvpApp')
  .factory('authentication', function ( $rootScope, $location, $firebaseAuth, $firebaseObject) {
    // Service logic
    // ...
    //
    var ref= firebase.database().ref();
    var auth= $firebaseAuth();

      auth.$onAuthStateChanged(function(authUser){
           if (authUser){
              var userRef = ref.child('users').child(authUser.uid);
              var userObj = $firebaseObject(userRef);
              $rootScope.currentUser = userObj;
           }else {
             $rootScope.currentUser = '';
           }
      });

    // Public API here
    return {
      login: function(user) {
          auth.$signInWithEmailAndPassword(
            user.email,
            user.password
          ).then(function(user){
            $location.path('/main');
          }).catch(function(error){
            $rootScope.message = error.message;
          }); //  signInWithEmailAndPassword
         }, //login

         logout: function(){
            return auth.$signOut();
         }, // logout
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
