angular.module("myWorld")
.factory("PeopleSvc", function($q, $http, AuthSvc ){
  return {
    user: AuthSvc.user,
    deletePerson: function(person){
      var dfd = $q.defer();
      $http.delete("/api/people/" + person._id +"/" + AuthSvc.getToken()).then(
        function(result){
          dfd.resolve(result.data); 
        },
        function(result){
          dfd.reject(result.data); 
        }
      );
      return dfd.promise;
    },
    getPeople: function(){
      var dfd = $q.defer();
      $http.get("/api/people").then(function(result){
        dfd.resolve(result.data);
      });
      return dfd.promise;
    },
    getPerson: function(id){
      var dfd = $q.defer();
      $http.get("/api/people/" + id).then(function(result){
        dfd.resolve(result.data);
      });
      return dfd.promise;
    },
    insertPerson: function(person){
      var dfd = $q.defer();  
      $http.post("/api/people/" + AuthSvc.getToken(), person).then(
        function(result){
          console.log(result);
          dfd.resolve(result.data);
        },
        function(result){
          dfd.reject(result.data);
        }
      );
      return dfd.promise;
    },
    updatePerson: function(person){
      var dfd = $q.defer();  
      $http.post("/api/people/" + person._id + "/" + AuthSvc.getToken(), person).then(
        function(result){
          dfd.resolve(result.data);
        },
        function(result){
          dfd.reject(result.data);
        }
      );
      return dfd.promise;
    }
  };
})

.controller("PeopleCtrl", function($scope, $location, NavSvc, PeopleSvc){
  NavSvc.setTab("People");
  $scope.message = "I am the people control";
  $scope.user = PeopleSvc.user;
  $scope.delete = function(person){
    PeopleSvc.deletePerson(person).then(
      function(){
        $scope.error = null;
        $scope.success = "User has been deleted";
        activate();
      },
      function(error){
        $scope.error = error;
      }
    );
  };
  $scope.edit = function(person){
    $location.path("/people/" + person._id);
  };
  $scope.insert = function(){
    PeopleSvc.insertPerson($scope.inserting).then(
      function(person){
        $scope.success = "Insert successful for " + person.name;
        $scope.error = null;
        activate();
      },
      function(error){
        $scope.error = error;
        $scope.success = null;
      }
    );
  };
  function activate(){
    $scope.inserting = {
      active: false
    };
    PeopleSvc.getPeople().then(function(people){
      $scope.people = people;
    });
  }
  activate();
})

.controller("PersonCtrl", function($scope, $location, $routeParams, NavSvc, PeopleSvc){
  NavSvc.setTab("People");
  $scope.save = function(){
    PeopleSvc.updatePerson($scope.person).then(
      function(person){
        $location.path("/people");
      },
      function(error){
        $scope.error = error; 
      }
    );
  };
  function activate(){
    PeopleSvc.getPerson($routeParams.id).then(function(person){
      $scope.person = person;
    });
  }
  activate();
});