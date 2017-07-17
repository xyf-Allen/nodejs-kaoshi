angular.module("controll",["ngCookies"])
.controller("index",["$scope","$cookies",function($scope,$cookies){
      if(!$cookies.get("indexLoginStu")){
         location.href="#!/login"
      }
      $scope.stuName=$cookies.get("stuName");
}])
.controller("indexTeach",["$scope","$cookies",function($scope,$cookies){
     $scope.teachName=$cookies.get("teachName")
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
                   alert($scope.angularurl);
                    location.href=$scope.angularurl;
               }else{
                   $scope.name="";
                   $scope.pass="";
               }

            })
      }
}]).controller("zuti",["$scope","$http","$filter",function($scope,$http,$filter){
    $http({url:"/select/all",method:"get"}).then(function(e){
        var data=e.data;
        $scope.data=data;
    })

    $http({url:"/select/type",method:"get"}).then(function(e){
        var data=e.data;
        $scope.types=data;
    })


    /*
    *   1.  题目的内容
    *   2.  考虑分数
    *
    * */
    $scope.start=function(){
        var params={fid:$scope.fid,jid:$scope.jid,tid:$scope.tid};
        $http({url:"/select/ti",method:"get",params}).then(function(e){
           var data=e.data;
           data.forEach(function(val,index){
                 val.options=val.options.split("|");
            })

            $scope.ti=data;


        })
    }

    //选中题 以及 对应的分数
    $scope.tis={}

    $scope.selectScore=function(id,score){
        $scope.nums=0;
        $scope.tis[id]=$scope.tis[id]?$scope.tis[id]:{};
        $scope.tis[id].score=score;

        for(var i in $scope.tis){
            console.log($scope.tis[i]["score"]);
            $scope.nums+=$scope.tis[i]["score"];
        }
    }

    $scope.selectTis=function(e,id){
        $scope.nums=0;
        $scope.tis[id]=$scope.tis[id]?$scope.tis[id]:{};
        if(e.target.checked) {
            console.log($scope.tis[id].score)
            $scope.tis[id].ti = id;
            $scope.tis[id].score = $scope.tis[id].score||1;
        }else{
            delete $scope.tis[id];
        }

        for(var i in $scope.tis){
            console.log($scope.tis[i]["score"]);
            $scope.nums+=$scope.tis[i]["score"];
        }
    }

    $scope.submit=function(){
        if($scope.lock){
            alert("已然提交");
            return;
        }

        var params={tis:$scope.tis,fid:$scope.fid,jid:$scope.jid,cid:$scope.cid,begin:new Date($scope.begin).getTime(),end:new Date($scope.end).getTime()};
        $http({url:"/insert/zuti",method:"get",params}).then(function(e){
           var data=e.data;
           if(data=="ok"){
               alert("组题成功");
               $scope.lock="yes";
           }
        })
    }


}]).controller("test",["$scope","$http",function($scope,$http){
    $http({url:"/select/wait",method:"get"}).then(function(e){
        $scope.data=e.data;

    })
}]).controller("testList",["$scope","$http","$routeParams",function($scope,$http,$routeParams){
    var params={id:$routeParams.id}
    $http({url:"/select/test",method:"get",params}).then(function(e){
        var data=e.data;
        console.log(data);
        for(var i in data){
            for(var j=0;j<data[i].length;j++){
                data[i][j]["options"]=data[i][j]["options"].split("|");
            }
        }

        $scope.data=data;
        $scope.zid=$routeParams.id;
/*
        var singleDaan={};
        $scope.checkSingle=function(id,index,score){
            singleDaan[id]=singleDaan[id]||{};
            singleDaan[id].id=id;
            singleDaan[id].daan=index;
            singleDaan[id].score=score;
        }

        $scope.moreSingle=function(id,index,score){
            singleDaan[id]=singleDaan[id]||{};
            singleDaan[id].id=id;
            singleDaan[id].daan=index;
            singleDaan[id].score=score;
        }
*/



    })
}])




