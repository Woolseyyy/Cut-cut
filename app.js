var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var spiders = require('./modules/spider/index');

var index = require('./routes/index');

var app = express();

//mongodb
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/news');
mongoose.connection.on('error',function(err){
    console.log(err);
});

var cors = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:3000");
    //res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,If-Modified-Since");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials","true");
    res.header("X-Powered-By",' 3.2.1');
    next();
};

app.all('*',cors);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//建立session，并将session存入mongodb
app.use(session({
    secret: 'SECRET_KEY',
    cookie:{maxAge: 365 * 24 * 60 * 60 * 1000, domain:'127.0.0.1'},//过期时间
    key: 'SessionID',
    resave: true,
    saveUninitialized: true,
    store : new MongoStore({
        mongooseConnection: mongoose.connection, //使用已有数据库连接
        db : mongoose.connection.db
    })
}));

app.use('/', index);
app.use(express.static(path.join(__dirname, 'public')));

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

//spider
spiders();
setInterval(spiders, 3600 * 1000);

module.exports = app;
