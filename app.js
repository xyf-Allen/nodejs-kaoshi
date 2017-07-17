var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var ejs = require('ejs');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
app.listen(8888,function(){
  console.log("server start");
});


//1.  用户的请求        用户的接收到信息


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var index = require('./routes/index/index');
var users = require('./routes/users');
var admin = require('./routes/admin');
var login = require('./routes/login');
var fangxiang = require('./routes/fangxiang');
var jieduan = require('./routes/jieduan');
var classes = require('./routes/classes');
var type = require('./routes/type');
var test = require('./routes/test');
var stu = require('./routes/stu');
var teach = require('./routes/teach');
var indexLogin = require('./routes/index/login');
var statics = require('./routes/static');
var select = require('./routes/index/select');
var insert = require('./routes/index/insert');


//模块化
app.use('/', index);
app.use('/users', users);
app.use('/admin', admin);
app.use('/login', login);
app.use('/fangxiang', fangxiang);
app.use('/jieduan', jieduan) ;
app.use('/classes', classes);
app.use('/type', type);
app.use('/test', test);
app.use('/stu', stu);
app.use('/teach', teach);
app.use('/indexLogin',indexLogin);
app.use('/tpl',statics);
app.use('/select',select);
app.use('/insert',insert);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

