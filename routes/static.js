var express=require("express");
var router=express.Router();
router.get("/:id",function(req,res){
     var file=req.params.id;
     res.sendFile("./public/tpl"+file);
})

module.exports = router;