var express = require('express');
var multer = require('multer');
var xlsx = require('node-xlsx');
var connect = require('./common/mysql');
var md5 = require('./common/md5');
var router = express.Router();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {


        cb(null, file.fieldname + '-' + Date.now()+file.originalname);
    }
})

var upload = multer({ storage: storage })

router.get("/teachAdd",function(req,res){
  connect.query("select * from classes",function(err,classes){
      if(err){
          console.log("错误");
      }else{

            connect.query("select * from fangxiang",function(err,fangxiang){
                if(err){

                }else{

                    connect.query("select * from jieduan",function(err,jieduan){

                        if(err){

                        }else{

                           res.render("admin/teachAdd",{jieduan:jieduan,fangxiang,fangxiang,classes:classes});
                        }
                    })
                }
            })

      }
  });

});

router.post("/upload",upload.single('file'),function(req,res){
    var data=xlsx.parse(req.file.path)[0].data;
    // teach 获取到  name  pass tid
    //  cid  jid  fid tid  status
      var arr=[];
      var middleArr=[];
      for(var i=1;i<data.length;i++){
         var arr1=[];
         var arr2=[];
         arr1.push(data[i][1]);
         arr1.push(md5("123456"));
         arr1.push(data[i][2]);
         arr.push(arr1);

         arr2.push(req.body.cid);
         arr2.push(req.body.jid);
         arr2.push(req.body.fid);
         arr2.push(data[i][2]);
         arr2.push(0);
         middleArr.push(arr2);

      }

      connect.beginTransaction(function(){
          //1.  放到老师表

           connect.query("replace into teach (name,pass,tid) values ?",[arr],function(err,result){

               if(err){
                   connect.rollback()
               }else{
                   connect.query("replace into middle (cid,jid,fid,tid,status) values ?",[middleArr],function(err,result){
                       if(err){
                           connect.rollback()
                       }else{
                           connect.commit(function(err){
               if(err){
                   connect.rollback()
               }
                           });
                       }
                   })
               }
           })
      })

    //middle  两个  事物

    res.end();
})
module.exports = router;
