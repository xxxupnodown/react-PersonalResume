var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// 引入 session 模块
var session = require('express-session')

var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('secret'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:81') // 允许局部跨域
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,XFILENAME,XFILECATEGORY,XFILESIZE"); // 允许请求头 部分自定义 头
  res.header("Access-Control-Allow-Credentials", true);
  next()
})
app.use('/', indexRouter);
// 配置session
app.use(session({
  secret: "aijianli",  // 加  盐
  saveUninitialized: false, // 是否保存初始化的session
  cookie: {},
  resave: false
}));

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
