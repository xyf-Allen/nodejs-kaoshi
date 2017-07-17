var express = require('express');
var connect = require('../common/mysql');
var md5 = require('../common/md5');
var router = express.Router();


router.get('/stucheck',function(req,res,next){
      var name=req.query.name;
      var pass=req.query.pass;
    connect.query("select * from stu",function(err,result){
        if(err){
            console.log("err");
        }else{
            var flag=true;
            for(var i=0;i<result.length;i++){
                if(result[i].sname==name){
                    if(result[i].spass==md5(pass)){
                            flag=false;
                            res.cookie("indexLoginStu","yes");
                            res.cookie("stuName",name);
                            res.cookie("stuId",result[i].sid);
                        res.send("ok");
                            break;


                    }
                }
            }

            if(flag){
                res.send("no");
            }
        }
    })


})

router.get('/teachcheck',function(req,res,next){

    var name=req.query.name;
    var pass=req.query.pass;
    //1. 组题
    //2. 考试
    connect.query("select * from teach",function(err,result){
        if(err){
            console.log("err");
        }else{
            var flag=true;
            for(var i=0;i<result.length;i++){
                if(result[i].name==name){
                    if(result[i].pass==md5(pass)){
                        flag=false;
                        res.cookie("indexLoginTeach","yes");
                        res.cookie("teachName",name);
                        console.log(name);
                        res.cookie("teachId",result[i].tid);
                        res.send("ok");
                        break;


                    }
                }
            }

            if(flag){
                res.send("no");
            }
        }
    })
})

router.get("/stulogout",function(req,res){
    res.clearCookie("stuName");
    res.clearCookie("stuId");
    res.clearCookie("indexLoginStu");
    res.redirect("/")
})
router.get("/teachlogout",function(req,res){
    res.clearCookie("teachName");
    res.clearCookie("teachId");
    res.clearCookie("indexLoginTeach");
    res.redirect("/")
})



module.exports = router;
