var express = require('express');
var md5 = require('./common/md5');
var connect = require('./common/mysql');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render("admin/login.ejs")
});
router.get("/logout",function(req, res, next){
     req.cookies=null;
     res.redirect("/login");
})
router.post("/checklogin",function (req,res) {
  var aname=req.body.aname;

  var apass=md5(req.body.apass);
    connect.query("select * from admin",function(error,result){
      if(error){
        console.log("数据库连接出错");
      }else{
         var flag=true;
        for(var i=0;i<result.length;i++){
          if(result[i].aname==aname){
            if(result[i].apass==apass){
              flag=false

              res.cookie("login","yes");
              res.cookie("aname",aname);
              res.redirect("/admin");
              break;
            }
          }
        }

        if(flag){
            res.redirect("/login");
        }
      }
    })

})



module.exports = router;
