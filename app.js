var createError = require('http-errors');
var express = require('express');
var session  = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//Passport.
var passport = require('passport');
var flash    = require('connect-flash');
require('./config/passport')(passport); // pass passport for configuration

// required for passport
app.use(session({
	secret: 'vidyapathaisalwaysrunning',
	resave: true,
	saveUninitialized: true
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


//Mysql database.
var mysql = require("mysql");

var con = mysql.createConnection({
	host : "localhost",
	user : "root",
	password : "12344567",
	database : "world"
});

con.connect(function(err){
	if (err){
		console.log('Connecting error : ', err);
		return;
	}
	console.log('Connecting success!');
});

app.use(function(req, res, next){
	req.con = con;
	next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// routes ======================================================================
require('./routes/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

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