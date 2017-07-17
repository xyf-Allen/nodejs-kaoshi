var express = require('express');
var md5 = require('./common/md5');
var connect = require('./common/mysql');
var router = express.Router();


router.get("/testAdd",function(req,res){

    //1.  查询所有的方向

    var result={};

    connect.query("select * from fangxiang",function(error,data){
            result.fangxiang=data;
            connect.query("select * from jieduan",function(error,data){
                    result.jieduan=data;

                    connect.query("select * from types",function(error,data){
                        result.type=data;
                        res.render("admin/test",{fangxiang:result.fangxiang,type:result.type,jieduan:result.jieduan});

                    })
            })
    })



})

router.get("/testAddCon",function(req,res){
    var fid=req.query.fid;
    var jid=req.query.jid;
    var tid=req.query.tid;
    var title=req.query.title;
    var options=req.query.options;
    var daan=req.query.daan;

    connect.query("insert into tests (fid,jid,tid,title,options,daan) values (?,?,?,?,?,?)",[fid,jid,tid,title,options,daan],function(error,result){
        if(error){
            console.log("error")
        }else {
            console.log(result);
            console.log("ok")
            res.redirect("/test/testAdd");
        }
    });


})

module.exports = router;
