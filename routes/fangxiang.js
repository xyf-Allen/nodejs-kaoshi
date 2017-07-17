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
router.get("/fangxiangAdd",function(req,res){
      res.render("admin/fangxiangAdd.ejs");
})
router.get("/del/:id",function(req,res){
    var id=req.params.id
    connect.query("delete from fangxiang where id="+id,function(error,result){
      if(error){
          console.log("删除错误");
      }else{
          res.redirect("/fangxiang/fangxiangShow");
      }
    })
})
router.get("/edit/:id",function(req,res){
    res.render("admin/fangxiangAdd.ejs");
})
router.get("/fangxiangShow",function(req,res){
     connect.query("select * from fangxiang",function(error,result){
            if(error){
                console.log("查询错误");
            }else{
                    res.render("admin/fangxiangShow",{result:result})
            }
     })
})
router.get("/fangxiangAddCon",function(req,res){
    var name=req.query.name;
    var sql="insert into fangxiang (name) values (?)";



    connect.query(sql,[name],function(error,result){
            if(error){
                console.log("数据出错");
            }else{
               console.log(result);
               res.redirect("/fangxiang/fangxiangAdd");
            }
    })

})

module.exports = router;
