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

router.get("/stuAdd",function(req,res){
  connect.query("select * from classes",function(err,result){
      if(err){
          console.log("错误");
      }else{
          res.render("admin/stuAdd",{result:result})
      }
  });

});

router.post("/upload",upload.single('file'),function(req,res){
    var data=xlsx.parse(req.file.path)[0].data;
    var cid=req.body.cid;

     var arr=[];
    for(var i=1;i<data.length;i++){
        var arr1=[];
        arr1.push(data[i][1]);
        arr1.push(md5("123456"));
        arr1.push(req.body.cid);
        arr1.push(data[i][2]);
        arr.push(arr1);
    }

    "php  "

    connect.query("replace into stu (sname,spass,cid,sid) values ? ",[arr],function(err,result){
        if(err){
            console.log(err);
        }else{
            console.log(result);
        }
    })

    res.end();
})
module.exports = router;
