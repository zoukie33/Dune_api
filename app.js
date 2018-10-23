var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var verifyToken = require('./verify');
var mysql = require('mysql');

// Routes
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var profsRouter = require('./routes/profs');
var elevesRouter = require('./routes/eleves');
var ecoleRouter = require('./routes/ecole');
var tableProfRouter = require('./routes/table/tableProf');
var cProfsRouter = require('./routes/classe/classeProfs');
var classeRouter = require('./routes/classe/classe');
var cEcoleRouter = require('./routes/classe/classeEcole');
var cEleveRouter = require('./routes/classe/classeEleve');

var app = express();

var pool = mysql.createPool({
  host: 'localhost',
  user: 'admin',
  password: 'fnbxfzmxfn33',
  database: 'dune_api',
  insecureAuth: true,
});

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('development'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');

  next();
});

/*
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
*/
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
    req.mysql = pool;
    next();
});
app.use('/', indexRouter);
app.use('/api/v1/', indexRouter);
app.use('/api/v1/login', loginRouter);
app.use('/api/v1/table', tableProfRouter);
app.use(verifyToken);
app.use('/api/v1/profs', profsRouter);
app.use('/api/v1/eleves', elevesRouter);
app.use('/api/v1/ecole', ecoleRouter);
app.use('/api/v1/classe', classeRouter);
app.use('/api/v1/classe/profs', cProfsRouter);
app.use('/api/v1/classes/eleve', cEleveRouter);
app.use('/api/v1/classes/ecole', cEcoleRouter);

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
