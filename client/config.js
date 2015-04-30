angular.module("myWorld").config(function($routeProvider, $locationProvider){
  $routeProvider
    .when("/", {
      controller: "HomeCtrl",
      templateUrl: "/templates/home.html"
    })
    .when("/people", {
      controller: "PeopleCtrl",
      templateUrl: "/templates/people.html"
    })
    .when("/people/:id", {
      controller: "PersonCtrl",
      templateUrl: "/templates/person.html"
    })
    .when("/things", {
      controller: "ThingsCtrl",
      templateUrl: "/templates/things.html"
    })
    .when("/login", {
      controller: "LoginCtrl",
      templateUrl: "/templates/login.html"
    });
    
    $locationProvider.html5Mode(true);
});