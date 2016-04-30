/// <reference path="c:\users\nithyanraj\documents\visual studio 2013\Projects\Angular\Angular\Scripts/angular.min.js" />
//create module
    
myNoteApp = angular.module('myNoteApp', ['ngRoute']);
myNoteApp.controller('myNoteCtrl', function ($scope, $route, $http) {
    //$scope.$route = $route;
    $http.get("https://data.cityofchicago.org/resource/6zsd-86xi.json")
    .then(function (response) {
        $scope.myData = response.data;
      
            //window.alert(option_value);
            
                
      
    });
    var vm = this;
    $scope.reloadData = function (option_value) {
        //$route.reload();
        $http.get("https://data.cityofchicago.org/resource/6zsd-86xi.json?primary_type=" + option_value)
     .success(function (response1) {
         //var content = $angular.element("#crime_table");
         //var scope=content.scope();
         //$compile(content.contents())(scope));
         //$route.reload();
             $scope.myData = response1.data;
             
         $scope.$apply();
     });
    }
});

         

      

        




