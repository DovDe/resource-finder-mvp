"use strict";angular.module("resourceFinderMvpApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","ngMap"]).config(["$routeProvider",function(e){e.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).otherwise({redirectTo:"/"})}]),angular.module("resourceFinderMvpApp").controller("MainCtrl",["NgMap",function(e){var n=this;n.placeChanged=function(){n.place=this.getPlace(),n.map.setCenter(n.place.geometry.location)},e.getMap().then(function(e){n.map=e}),n.centerChanged=function(e){n.pauseLoading=!0,$timeout(function(){n.pauseLoading=!1,n.home=n.map.getCenter()},1e3)}}]),angular.module("resourceFinderMvpApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("resourceFinderMvpApp").factory("current",function(){});