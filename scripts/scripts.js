"use strict";angular.module("resourceFinderMvpApp",["ui.router","ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","ngMap"]).config(["$stateProvider","$urlRouterProvider",function(e,r){e.state("main",{url:"/main",templateUrl:"/main.html",controller:"MainCtrl"}),r.otherwise("/main.html")}]),angular.module("resourceFinderMvpApp").controller("MainCtrl",["NgMap",function(e){var r=this;r.placeChanged=function(){r.place=this.getPlace(),r.map.setCenter(r.place.geometry.location)},e.getMap().then(function(e){r.map=e,r.centerChanged=function(){r.home=r.map.getCenter()}})}]),angular.module("resourceFinderMvpApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("resourceFinderMvpApp").factory("current",function(){}),angular.module("resourceFinderMvpApp").controller("CurrentCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("resourceFinderMvpApp").factory("addAResource",function(){var e=42;return{someMethod:function(){return e}}}),angular.module("resourceFinderMvpApp").controller("AddAResourceCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("resourceFinderMvpApp").factory("userProfile",function(){var e=42;return{someMethod:function(){return e}}}),angular.module("resourceFinderMvpApp").controller("UserProfileCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]});