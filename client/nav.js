angular.module("myWorld")
    .controller("NavCtrl", function($scope, NavSvc, AuthSvc){
      $scope.tabs = NavSvc.tabs;
      $scope.user = AuthSvc.user;
      $scope.logout = function(){
        AuthSvc.logout();
      };
    })
    .directive("myWorldNav", function(){
      return {
        restrict: "E",
        templateUrl: "/templates/nav.html",
        controller: "NavCtrl",
        scope: {
          showLoginButton: '@',
          fooBar: '@'
        }
      };
    })
    .factory("NavSvc", function(){
      var _tabs = [
        {
          title: "Home",
          path: "/",
          active: true
        },
        {
          title: "People",
          path: "/people"
        },
        {
          title: "Things",
          path: "/things"
        }
      ];
      return {
        tabs: _tabs,
        setTab: function(title){
          _tabs.forEach(function(tab){
            if(tab.title == title) 
              tab.active = true;
            else
              tab.active = false;
          });
        }
      };
    });