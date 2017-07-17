var express = require('express');
var connect = require('../common/mysql');
var md5 = require('../common/md5');
var router = express.Router();
router.get("/all",function(req,res){
     var sql=`select fangxiang.name as fname,jieduan.name as jname,classes.name as cname,middle.fid as fid,middle.cid as cid ,middle.jid as jid from middle,fangxiang,jieduan,classes where middle.tid="${req.cookies.teachId}" and middle.fid=fangxiang.id and middle.jid=jieduan.id and middle.cid=classes.id`;
     connect.query(sql,function(err,result){
          res.send(JSON.stringify(result));
     })
})

router.get("/type",function(req,res){
    var sql="select * from types";
    connect.query(sql,function(error,result){
        if(error){
            console.log("error");
        }else{
              res.send(JSON.stringify(result))
        }
    })
})
router.get("/ti",function(req,res){
    var fid=req.query.fid;
    var jid=req.query.jid;
    var tid=req.query.tid;
     var sql=`select * from tests where fid=${fid} and jid=${jid} and tid=${tid}`;

     connect.query(sql,function(err,result){
        if(err){
            console.log("error");
        }else{
            res.send(JSON.stringify(result))
        }
     })
})

router.get("/wait",function(req,res){
     var sid=req.cookies.stuId;
     var sql=`select zuti.* from stu,zuti where stu.sid='${sid}' and stu.cid=zuti.cid and begin/1000>UNIX_TIMESTAMP(now()) and stuinfo not like '%${sid}%'`;
       console.log(sql);
     connect.query(sql,function(err,result){
            if(err){
                console.log(err);
            }else{
                res.send(JSON.stringify(result));
            }
     })

});

router.get("/test",function(req,res){
    var id=req.query.id;
    connect.query("select * from zuti where id="+id,function(err,result){

         // 选题
        var  tis=[];
        var  scores=[];
         for(var i=0;i<result.length;i++){
             var arr=result[i].ti.split("|");
              for(var j=0;j<arr.length;j++){
                  var arr1=arr[j].split(",");
                  tis.push(arr1[0]);
                  scores.push(arr1[1]);
              }
         }

         connect.query(`select * from tests where id in (${tis.join(",")}) order by field (id,${tis.join(",")})`,function(err,result){

             var data={};
             var single=[];
             var more=[];
             for(var i=0;i<result.length;i++){
                 result[i].score=scores[i];
                 if(result[i].tid==1){
                    single.push(result[i]);
                 }else{
                     more.push(result[i]);
                 }

             }
             data.single=single;
             data.more=more;

             res.send(JSON.stringify(data));



         })


    })

})

module.exports = router;