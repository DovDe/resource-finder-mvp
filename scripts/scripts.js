"use strict";angular.module("resourceFinderMvpApp",["ui.router","ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","ngMap","firebase"]).config(["$urlRouterProvider","$stateProvider",function(e,r){e.otherwise("/main"),r.state("user-profile",{url:"/user-profile",templateUrl:"views/user-profile.html",controller:"UserProfileCtrl"}).state("main",{url:"/main",views:{"":{templateUrl:"views/main.html",controller:"MainCtrl as vm"},"new-resource":{templateUrl:"views/add-a-resource.html",controller:"AddAResourceCtrl"}}}).state("user-profile.register",{url:"/user-profile.register",templateUrl:"views/user-profile.register.html",controller:"UserProfileCtrl"}).state("user-profile.login",{url:"/user-profile.login",templateUrl:"views/user-profile.login.html",controller:"UserProfileCtrl"})}]),angular.module("resourceFinderMvpApp").controller("MainCtrl",["NgMap","$scope","$state","$rootScope",function(e,r,t,n){var o=this;o.addingResource=!1,o.placeChanged=function(){o.place=this.getPlace(),o.map.setCenter(o.place.geometry.location)},e.getMap().then(function(e){o.map=e,o.centerChanged=function(){o.home=o.map.getCenter()}}),o.placeMarker=function(e){new google.maps.Marker({position:e.latLng,map:o.map});o.map.panTo(e.latLng),o.home=o.map.getCenter(),n.lat=o.home.lat(),n.lng=o.home.lng(),o.map.showInfoWindow("info-window")},o.addnewresource=function(){o.addingResource=!0}}]),angular.module("resourceFinderMvpApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("resourceFinderMvpApp").factory("addAResource",function(){var e=42;return{someMethod:function(){return e}}}),angular.module("resourceFinderMvpApp").controller("AddAResourceCtrl",["$firebase","$firebaseAuth","$firebaseArray","$firebaseObject","$scope","$rootScope","$state",function(e,r,t,n,o,a,i){var s=firebase.database().ref(),u=r();u.$onAuthStateChanged(function(e){if(e){var r=s.child("resource"),n=t(r);a.resource=n,o.addResource=function(e){n.$add({name:o.resource.name,date:firebase.database.ServerValue.TIMESTAMP,type:a.resource.type})}}})}]),angular.module("resourceFinderMvpApp").factory("userProfile",function(){var e=42;return{someMethod:function(){return e}}}),angular.module("resourceFinderMvpApp").controller("UserProfileCtrl",["$scope","authentication",function(e,r){e.login=function(){r.login(e.user)},e.logout=function(){r.logout()},e.register=function(){r.register(e.user)}}]),angular.module("resourceFinderMvpApp").factory("authentication",["$rootScope","$location","$firebaseAuth","$firebaseObject",function(e,r,t,n){var o,a=firebase.database().ref(),i=t();return i.$onAuthStateChanged(function(r){if(r){var t=a.child("users").child(r.uid),o=n(t);e.currentUser=o}else e.currentUser=""}),o={login:function(t){i.$signInWithEmailAndPassword(t.email,t.password).then(function(e){r.path("/main")})["catch"](function(r){e.message=r.message})},logout:function(){return i.$signOut()},requireAuth:function(){return i.$requireSignIn()},register:function(r){i.$createUserWithEmailAndPassword(r.email,r.password).then(function(t){a.child("users").child(t.uid).set({date:firebase.database.ServerValue.TIMESTAMP,regUser:t.uid,username:r.username,firstname:r.firstname,lastname:r.lastname,email:r.email,password:r.password});e.message="Hi"+r.firstname+",Thanks for registering",o.login(r)})["catch"](function(r){e.message=r.message})}}}]);