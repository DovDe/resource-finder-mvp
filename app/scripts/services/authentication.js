'use strict';

/**
 * @ngdoc service
 * @name resourceFinderMvpApp.authentication
 * @description
 * # authentication
 * Factory in the resourceFinderMvpApp.
 */
angular.module('resourceFinderMvpApp')
  .factory('authentication', function ( $rootScope, $location, $firebaseAuth, $firebaseObject, $state, $timeout) {
    // Service logic
    // ...
    //
    var ref= firebase.database().ref();
    var auth= $firebaseAuth();
    var returnObject;


      auth.$onAuthStateChanged(function(authUser){
           if (authUser){
              var userRef = ref.child('users').child(authUser.uid);
              var userObj = $firebaseObject(userRef);
              $rootScope.currentUser = userObj;
           }else {
             $rootScope.currentUser = '';
           }
      });

      returnObject = {
        login: function(user) {
            auth.$signInWithEmailAndPassword(
              user.email,
              user.password
            ).then(function(user){
              //go back to main  view
              $timeout(function(){
                    $state.go('main');
                    $rootScope.message = '';
              },500);  // close timeout
            }).catch(function(error){
              $rootScope.message = error.message;
            }); //  signInWithEmailAndPassword
           }, //login

           logout: function(){
              return auth.$signOut();
           }, // logout

           requireAuth: function(){
             return auth.$requireSignIn();
           }, // requireAuth



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
                                  firstname: user.firstname,
                                  lastname: user.lastname,
                                  email: user.email,
                                  password: user.password

                                });  //user info

                           $rootScope.message = "Hi" + user.firstname + ",Thanks for registering";
                           returnObject.login(user);
                         }).catch(function(error){
                           $rootScope.message = error.message;
                         }); //createUserWithEmailAndPassword
           } //register
      }; //returnObject


    // Public API here
    return returnObject;

  }); // factory
