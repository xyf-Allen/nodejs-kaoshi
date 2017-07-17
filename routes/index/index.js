var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/',function(req, res, next) {
     var data;
    if(req.cookies.indexLoginStu){
        data=("ok")
    }else{
        data=("no");
    }

    res.render("index/index",{data:data})
});

module.exports = router;
