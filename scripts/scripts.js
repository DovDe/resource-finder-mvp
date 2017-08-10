"use strict";angular.module("resourceFinderMvpApp",["ui.router","ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","ngMap","firebase"]).config(["$urlRouterProvider","$stateProvider",function(e,r){e.otherwise("/main"),r.state("user-profile",{url:"/user-profile",templateUrl:"views/user-profile.html",controller:"UserProfileCtrl"}).state("main",{url:"/main",views:{"":{templateUrl:"views/main.html",controller:"MainCtrl as vm"},"new-resource":{templateUrl:"views/add-a-resource.html",controller:"AddAResourceCtrl",resolve:{currentAuth:["authentication",function(e){return e.requireAuth()}]}}}}).state("user-profile.register",{url:"/user-profile.register",templateUrl:"views/user-profile.register.html",controller:"UserProfileCtrl"}).state("user-profile.login",{url:"/user-profile.login",templateUrl:"views/user-profile.login.html",controller:"UserProfileCtrl"}).state("add-a-resource",{url:"/add-a-resource",resolve:{currentAuth:["authentication",function(e){return e.requireAuth()}]},views:{"":{templateUrl:"views/add-a-resource.html",controller:"AddAResourceCtrl"}}})}]),angular.module("resourceFinderMvpApp").controller("MainCtrl",["NgMap","$scope","$state","$rootScope","$timeout","$firebase","$firebaseAuth","$firebaseArray",function(e,r,t,o,n,a,s,i){var u=this;u.addingResource=!1,u.hideinput=!1,u.inProgress=!1;var l=new google.maps.Geocoder,c=function(e){u.markers=[];for(var r=0;r<e.length;r++){var t=e[r].location.LatLng.lat,o=e[r].location.LatLng.lng,n=new google.maps.LatLng(t,o);u.markers[r]=new google.maps.Marker({position:n,id:r,clickable:!0,animation:google.maps.Animation.DROP,map:u.map}),u.markers[r].setMap(u.map)}},d=function(e){var r=document.getElementById("latlng").value,t=r.split(",",2),n={lat:parseFloat(t[0]),lng:parseFloat(t[1])};e.geocode({location:n},function(e,r){"OK"===r?e[1]?(console.log(e[1].formatted_address),o.NewResourceAddress=e[1].formatted_address,console.log(o.NewResourceAddress)):window.alert("No results found"):window.alert("Geocoder failed due to: "+r)})};u.placeChanged=function(){u.place=this.getPlace(),u.map.setCenter(u.place.geometry.location)},e.getMap().then(function(e){u.map=e,u.home=u.map.getCenter(),o.currentMarkerLat=u.home.lat(),o.currentMarkerLng=u.home.lng();var r=o.currentMarkerLat.toString()+","+o.currentMarkerLng.toString();u.currentMarkerValue=r;var t=firebase.database().ref(),n=t.child("resource"),a=i(n);u.resourceMarkers=a,a.$loaded().then(function(e){c(e)})}),u.placeMarker=function(e){if(!u.inProgress){u.map.panTo(e.latLng),u.home=u.map.getCenter(),o.currentMarkerLat=u.home.lat(),o.currentMarkerLng=u.home.lng();var r=o.currentMarkerLat+","+o.currentMarkerLng;u.currentMarkerValue=r,u.showCustomMarker=function(){u.map.customMarkers.customthings.setVisible(!0),u.map.customMarkers.customthings.setPosition(u.home)},u.showCustomMarker(),u.inProgress=!0,n(function(){d(l)},300)}},u.closeCustomMarker=function(){u.map.customMarkers.customthings.setVisible(!1)},u.reAble=function(){n(function(){u.inProgress=!1},500)}}]),angular.module("resourceFinderMvpApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("resourceFinderMvpApp").factory("addAResource",function(){var e=42;return{someMethod:function(){return e}}}),angular.module("resourceFinderMvpApp").controller("AddAResourceCtrl",["$firebase","$firebaseAuth","$firebaseArray","$firebaseObject","$scope","$rootScope","$state","$timeout",function(e,r,t,o,n,a,s,i){var u=firebase.database().ref(),l=r();n.resourceaddress=a.NewResourceAddress,n.resourcelat=a.currentMarkerLat,n.resourcelng=a.currentMarkerLng,l.$onAuthStateChanged(function(e){if(e){var r=u.child("resource"),o=t(r);a.resource=o,o.$loaded().then(function(e){a.numberOfResources=o.length}),n.addResource=function(e){o.$add({name:n.resource.name,date:firebase.database.ServerValue.TIMESTAMP,type:a.resource.type,hours:n.resource.hours,description:n.resource.description,location:{LatLng:{lat:a.currentMarkerLat,lng:a.currentMarkerLng},formatted_address:a.NewResourceAddress}}),n.resource.name="",n.resource.type={shelter:!1,water:!1,food:!1,electricity:!1,clothings:!1,cleanup:!1},n.resource.website="",n.resource.hours="",n.resource.description="",n.message="Thank for adding a resource",i(function(){s.go("main")},1e3)},n.deleteResource=function(e){o.$remove(e)}}})}]),angular.module("resourceFinderMvpApp").factory("userProfile",function(){var e=42;return{someMethod:function(){return e}}}),angular.module("resourceFinderMvpApp").controller("UserProfileCtrl",["$scope","authentication",function(e,r){e.login=function(){r.login(e.user)},e.logout=function(){r.logout()},e.register=function(){r.register(e.user)}}]),angular.module("resourceFinderMvpApp").factory("authentication",["$rootScope","$location","$firebaseAuth","$firebaseObject",function(e,r,t,o){var n,a=firebase.database().ref(),s=t();return s.$onAuthStateChanged(function(r){if(r){var t=a.child("users").child(r.uid),n=o(t);e.currentUser=n}else e.currentUser=""}),n={login:function(t){s.$signInWithEmailAndPassword(t.email,t.password).then(function(e){r.path("/main")})["catch"](function(r){e.message=r.message})},logout:function(){return s.$signOut()},requireAuth:function(){return s.$requireSignIn()},register:function(r){s.$createUserWithEmailAndPassword(r.email,r.password).then(function(t){a.child("users").child(t.uid).set({date:firebase.database.ServerValue.TIMESTAMP,regUser:t.uid,username:r.username,firstname:r.firstname,lastname:r.lastname,email:r.email,password:r.password});e.message="Hi"+r.firstname+",Thanks for registering",n.login(r)})["catch"](function(r){e.message="error.message"})}}}]);