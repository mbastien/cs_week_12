//configuration
var app = angular.module("myWorld", ['ngRoute']);
app.run(function(AuthSvc){
  AuthSvc.setUser();
});

// services

//controllers

app.controller("ThingsCtrl", function($scope, NavSvc){
  NavSvc.setTab("Things");
  $scope.message = "I am the things control";
});


//directives
