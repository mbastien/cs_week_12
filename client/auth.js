angular.module("myWorld")
    .controller("LoginCtrl", function($scope, $location, AuthSvc){
      if(AuthSvc.user.authenticated())
        $location.path("/");
      $scope.user = {};
      
      $scope.login = function(){
        AuthSvc.authenticate($scope.user).then(
          function(){
            $location.path("/"); 
          },
          function(error){
            $scope.token = null;
            $scope.error = error;
          }
        );
      };
    })
    .factory("AuthSvc", function($window, $q, $http){
      var _user = {
        authenticated: function(){
          return this.username != null;
        } 
      };
      return {
        authenticate: authenticate,
        setUser: setUser,
        logout: logout,
        user: _user,
        getToken: getToken
      }; 
      
      function getToken(){
        return $window.sessionStorage.getItem("token"); 
      }
      
      function logout(){
        delete _user.username;
        $window.sessionStorage.removeItem("token");
      }
      
      function setUser(){
        if(!$window.sessionStorage.getItem("token"))
          return;
        var dfd = $q.defer();
        $http.get("/api/sessions/" + $window.sessionStorage.getItem("token")).then(
          function(result){
            _user.username = result.data.username;
             dfd.resolve(result.data); 
          }
        );
        return dfd.promise;
      }
      
      function authenticate(user){
        var dfd = $q.defer();
        $http.post("/api/sessions", user).then(
          function(result){
            $window.sessionStorage.setItem("token", result.data);
            setUser().then(function(result2){
              dfd.resolve(_user); 
            });
          },
          function(result){
            dfd.reject(result.data.error);
          }
        );
        return dfd.promise;
      }
    });