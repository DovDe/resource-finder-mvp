"use strict";angular.module("resourceFinderMvpApp",["ui.router","ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","ngMap","firebase"]).config(["$urlRouterProvider","$stateProvider",function(e,r){e.otherwise("/main"),r.state("user-profile",{url:"/user-profile",templateUrl:"views/user-profile.html",controller:"UserProfileCtrl"}).state("add-a-resource",{url:"/add-a-resource",templateUrl:"views/add-a-resource.html",controller:"AddAResourceCtrl"}).state("main",{url:"/main",templateUrl:"views/main.html",controller:"MainCtrl as vm"}).state("user-profile.register",{url:"/user-profile.regiser",templateUrl:"views/user-profile.register.html",controller:"UserProfileCtrl"}).state("user-profile.login",{url:"/user-profile.login",templateUrl:"views/user-profile.login.html",controller:"UserProfileCtrl"})}]),angular.module("resourceFinderMvpApp").controller("MainCtrl",["NgMap",function(e){var r=this;r.placeChanged=function(){r.place=this.getPlace(),r.map.setCenter(r.place.geometry.location)},e.getMap().then(function(e){r.map=e,r.centerChanged=function(){r.home=r.map.getCenter()}})}]),angular.module("resourceFinderMvpApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("resourceFinderMvpApp").factory("current",function(){}),angular.module("resourceFinderMvpApp").controller("CurrentCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("resourceFinderMvpApp").factory("addAResource",function(){var e=42;return{someMethod:function(){return e}}}),angular.module("resourceFinderMvpApp").controller("AddAResourceCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("resourceFinderMvpApp").factory("userProfile",function(){var e=42;return{someMethod:function(){return e}}}),angular.module("resourceFinderMvpApp").controller("UserProfileCtrl",["$scope","authentication",function(e,r){e.login=function(){r.login(e.user)},e.register=function(){r.register(e.user)}}]),angular.module("resourceFinderMvpApp").factory("authentication",["$rootScope","$location","$firebaseAuth",function(e,r,t){var n=firebase.database().ref(),a=t();return{login:function(t){a.$signInWithEmailAndPassword(t.email,t.password).then(function(e){r.path("/main")})["catch"](function(r){e.message=r.message})},register:function(r){a.$createUserWithEmailAndPassword(r.email,r.password).then(function(t){n.child("users").child(t.uid).set({date:firebase.database.ServerValue.TIMESTAMP,regUser:t.uid,username:r.username,firstname:r.firstname,lastname:r.lastname,email:r.email,password:r.password});e.message="Hi"+r.firstname+",Thanks for registering"})["catch"](function(r){e.message=r.message})}}}]);