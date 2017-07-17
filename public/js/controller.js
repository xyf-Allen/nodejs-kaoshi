angular.module("controll",[])
.controller("index",["$scope",function($scope){
      if(document.querySelector("div[ng-view]").getAttribute("attr")=="no"){
         location.href="#!/login"
      }
}])
.controller("indexTeach",["$scope",function($scope){

}])
.controller("login",["$scope","$http","$routeParams",function($scope,$http,$routeParams){
      $scope.title=$routeParams.id=="stulogin"?"学生":"老师";
      $scope.url=$routeParams.id=="stulogin"?"/indexLogin/stucheck":"/indexLogin/teachcheck";

      $scope.angularurl=$routeParams.id=="stulogin"?"#!/":"#!/teach";


      $scope.submit=function(url){
            var params={name:$scope.name,pass:$scope.pass};
            $http({url:url,method:"get",params}).then(function(e){
               var data=e.data;
               if(data=="ok"){
                    location.href=$scope.angularurl;
               }else{
                   $scope.name="";
                   $scope.pass="";
               }

            })
      }
}])




