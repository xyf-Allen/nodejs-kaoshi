var express = require('express');
var connect = require('../common/mysql');
var md5 = require('../common/md5');
var router = express.Router();

router.get("/zuti",function(req,res){
    var begin=req.query.begin;
    var end=req.query.end;
    var cid=req.query.cid;
    var jid=req.query.jid;
    var fid=req.query.fid;
    var ti=JSON.parse(req.query.tis);
    var teachId=req.cookies.teachId;
    var tistr="";
    for(var i in ti){
        tistr+=ti[i].ti+","+ti[i].score+"|";
    }
    ti=tistr.slice(0,-1);
    var sql=`insert into zuti (cid,jid,fid,ti,teachId,begin,end) values (${cid},${jid},${fid},'${ti}','${teachId}','${begin}','${end}')`;
    connect.query(sql,function(error,result){
         if(error){
             console.log("error")
         }else{
             res.send("ok");
         }
    })
})

router.get("/finish",function (req,res) {
      var nums=0;
      var errors="";
      var singles=[];
      var mores=[];
    req.query.singleFile=req.query.singleFile||[];
      for(var i=0;i<req.query.singleFile.length;i++ ){
          var obj={};
          obj.val=req.query["single"+req.query.singleFile[i]];
          obj.score=req.query.singleScore[i];
          singles.push(obj);
      }
    req.query.moreFile=req.query.moreFile||[];
       for(var i=0;i<req.query.moreFile.length;i++ ){
            var obj={};
            obj.val=req.query["more"+req.query.moreFile[i]];
            obj.score=req.query.moreScore[i];
            mores.push(obj);
        }


      //单选的
var sql=`select id,tid,daan from tests where id in (${req.query.singleFile.join(',')},${req.query.moreFile.join(',')}) order by field (id,${req.query.singleFile.join(',')},${req.query.moreFile.join(',')})`;
       connect.query(sql,function(err,result){

                var singleArr=[];
                var moreArr=[];

                for(var i=0;i<result.length;i++){
                    if(result[i].tid==1){
                        singleArr.push(result[i]);
                    }else{
                        moreArr.push(result[i]);
                    }
                }

               //对比单选

            for(var i=0;i<singleArr.length;i++){
                    if(singleArr[i].daan==singles[i].val){
                        nums+=singles[i].score*1;
                    }else{
                        errors+=singleArr[i].id+","
                    }
            }

            //对比多选

            for(var i=0;i<moreArr.length;i++){
                moreArr[i].daan=moreArr[i].daan||"";
                var arr=moreArr[i].daan.split(",")
                var arr1=mores[i].val||[]
                if(sum(arr)==sum(arr1)){
                    nums+=mores[i].score*1;
                }else{
                    errors+=singleArr[i].id+","
                }
            }
            errors=errors.slice(0,-1);
            // 向 zuti表追加 考生
           var sql=`update zuti set stuinfo=concat(stuinfo,',${req.cookies.stuId}') where id=${req.query.zid}`;
            connect.query(sql,function(){
                //向成绩表添加信息

                var sql=`insert into score (zid,scores,error,sid) values (${req.query.zid},${nums},'${errors}','${req.cookies.stuId}')`

                connect.query(sql,function(){
                    res.render("index/finish",{nums:nums})
                })
            })


       })
})



function sum(arr){
    var result=0;
    for(var i=0;i<arr.length;i++){
        result+=arr[i]*1;
    }
    return result;
}
module.exports = router;