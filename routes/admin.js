var express = require('express');
var md5 = require('./common/md5');
var connect = require('./common/mysql');
var router = express.Router();


router.get('/',function(req,res,next){
  console.log(req.cookies.login);
  if(!req.cookies.login){
      res.redirect("/login");
  }else {
      next()
  }
}, function(req, res, next) {
  res.render('admin/admin.ejs',{aname:req.cookies.aname});
});
router.get("/adminAdd",function(req,res){
      res.render("admin/adminAdd.ejs");
})
router.get("/adminAddCon",function(req,res){
    var aname=req.query.aname;
    var apass=md5(req.query.apass);
    var aid=req.query.aid;
    var sql="insert into admin (aname,apass,aid) values ('"+aname+"','"+apass+"','"+aid+"')";

    console.log()

    connect.query(sql,function(error,result){
            if(error){
                console.log("数据出错");
            }else{
               console.log(result);
               res.redirect("/admin/adminAdd");
            }
    })

})

module.exports = router;
