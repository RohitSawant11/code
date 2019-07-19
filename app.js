var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//CONNECTING THE DATABASE
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;mongoose.connect("mongodb://localhost:27017/node-demo");
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.post('/registration',function(req,res){
  console.log(req);
  let name = req.body.name;
  let gender=req.body.gender;
  let phone=req.body.phone;
  let address=req.body.address;
  let password=req.body.password;

  if(!name){
      // res.sendStatus(200)
      res.json({erorCode:200,errname:"name not bprovided"});
  }
    if(!phone){
       res.json({erorCode:201,errname:"phone no not entered"});
   }
  // if(!address){
  //  res.sendStatus({erorCode:202,errname:"enter address"});
  //  }
     if(!gender){
       res.json({erorCode:203,errname:"gender not mentioned"});
     }
  //  if(!password){
  //      res.sendStatus({erorCode:204,errname:"create a password"});
  //  }
});
app.post('/registration',function(req,res){

});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;
