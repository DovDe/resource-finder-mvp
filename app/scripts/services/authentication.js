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
              $location.path('/main');
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
                           user.register.email,
                           user.register.password
                         ).then(function(regUser)  {
                           var regRef = ref.child('users')
                                .child(regUser.uid).set({
                                  date: firebase.database.ServerValue.TIMESTAMP,
                                  regUser: regUser.uid,
                                  firstname: user.register.firstname,
                                  lastname: user.register.lastname,
                                  email: user.register.email,
                                  password: user.register.password

                                });  //user info
                           $rootScope.message = "Hi" + user.firstname + ",Thanks for registering";
                           returnObject.login(user);
                         }).then(function(user){
                           $location.path('/main');
                           $rootScope.message='';
                         }).catch(function(error){
                           $rootScope.message = error.message;
                         }); //createUserWithEmailAndPassword
           } //register
      }; //returnObject


    // Public API here
    return returnObject;

  }); // factory
