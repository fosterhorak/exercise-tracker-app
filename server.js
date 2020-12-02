var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//express session
//passport
//method override
var methodOverride = require('method-override');

// process the .env file 
require('dotenv').config();

//connect to mongodb with mongoose
require('./config/database');

//run passport config code...

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//add additonal routers here...

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//add method override
app.use(methodOverride('_method'));

//add app.use(session..)

//add app.use(passport..)

//connect res.locals.user to req.user...


app.use('/', indexRouter);
app.use('/users', usersRouter);
//add other routers and paths

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
