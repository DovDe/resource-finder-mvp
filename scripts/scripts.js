"use strict";angular.module("resourceFinderMvpApp",["ui.router","ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","ngMap","firebase"]).config(["$urlRouterProvider","$stateProvider",function(e,r){e.otherwise("/main"),r.state("user-profile",{url:"/user-profile",templateUrl:"views/user-profile.html",controller:"UserProfileCtrl"}).state("main",{url:"/main",views:{"":{templateUrl:"views/main.html",controller:"MainCtrl as vm"},"new-resource":{templateUrl:"views/add-a-resource.html",controller:"AddAResourceCtrl"}}}).state("user-profile.register",{url:"/user-profile.register",templateUrl:"views/user-profile.register.html",controller:"UserProfileCtrl"}).state("user-profile.login",{url:"/user-profile.login",templateUrl:"views/user-profile.login.html",controller:"UserProfileCtrl"})}]),angular.module("resourceFinderMvpApp").controller("MainCtrl",["NgMap","$scope","$state","$rootScope",function(e,r,t,o){var n=this;n.addingResource=!1,n.placeChanged=function(){n.place=this.getPlace(),n.map.setCenter(n.place.geometry.location)},e.getMap().then(function(e){n.map=e,n.centerChanged=function(){n.home=n.map.getCenter()}}),n.placeMarker=function(e){new google.maps.Marker({position:e.latLng,map:n.map});n.map.panTo(e.latLng),n.home=n.map.getCenter(),o.lat=n.home.lat(),o.lng=n.home.lng(),n.showCustomMarker=function(e){n.map.customMarkers.customthings.setVisible(!0),console.log("whatever")},n.closeCustomMarker=function(e){this.style.display="none"},n.showCustomMarker()},n.addnewresource=function(){n.addingResource=!0,console.log("whatever")}}]),angular.module("resourceFinderMvpApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("resourceFinderMvpApp").factory("addAResource",function(){var e=42;return{someMethod:function(){return e}}}),angular.module("resourceFinderMvpApp").controller("AddAResourceCtrl",["$firebase","$firebaseAuth","$firebaseArray","$firebaseObject","$scope","$rootScope","$state",function(e,r,t,o,n,a,s){var i=firebase.database().ref(),u=r();u.$onAuthStateChanged(function(e){if(e){var r=i.child("resource"),o=t(r);a.resource=o,n.addResource=function(e){o.$add({name:n.resource.name,date:firebase.database.ServerValue.TIMESTAMP,type:a.resource.type})}}})}]),angular.module("resourceFinderMvpApp").factory("userProfile",function(){var e=42;return{someMethod:function(){return e}}}),angular.module("resourceFinderMvpApp").controller("UserProfileCtrl",["$scope","authentication",function(e,r){e.login=function(){r.login(e.user)},e.logout=function(){r.logout()},e.register=function(){r.register(e.user)}}]),angular.module("resourceFinderMvpApp").factory("authentication",["$rootScope","$location","$firebaseAuth","$firebaseObject",function(e,r,t,o){var n,a=firebase.database().ref(),s=t();return s.$onAuthStateChanged(function(r){if(r){var t=a.child("users").child(r.uid),n=o(t);e.currentUser=n}else e.currentUser=""}),n={login:function(t){s.$signInWithEmailAndPassword(t.email,t.password).then(function(e){r.path("/main")})["catch"](function(r){e.message=r.message})},logout:function(){return s.$signOut()},requireAuth:function(){return s.$requireSignIn()},register:function(r){s.$createUserWithEmailAndPassword(r.email,r.password).then(function(t){a.child("users").child(t.uid).set({date:firebase.database.ServerValue.TIMESTAMP,regUser:t.uid,username:r.username,firstname:r.firstname,lastname:r.lastname,email:r.email,password:r.password});e.message="Hi"+r.firstname+",Thanks for registering",n.login(r)})["catch"](function(r){e.message=r.message})}}}]);