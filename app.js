var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var verifyToken = require('./verify');
var mysql = require('mysql');
var fileUpload = require('express-fileupload');

// Routes
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/auth/login');
var logoutRouter = require('./routes/auth/logout');
var tokensRouter = require('./routes/auth/tokens');
var usersRouter = require('./routes/users');
var elevesRouter = require('./routes/eleves');
var trombiRouter = require('./routes/trombi');
var ecoleRouter = require('./routes/ecole');
var storeRouter = require('./routes/store/store');
var storeNotifsRouter = require('./routes/store/notifis');
var gamesRouter = require('./routes/games/games');
var tablesRouter = require('./routes/table/tables');
var cnxTableRouter = require('./routes/table/cnxTable');
var cProfsRouter = require('./routes/classe/classeProfs');
var classeRouter = require('./routes/classe/classe');
var cEcoleRouter = require('./routes/classe/classeEcole');
var cEleveRouter = require('./routes/classe/classeEleve');

var app = express();

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, token');
    if ('OPTIONS' == req.method) {
    res.sendStatus(200);
    } else {
      next();
    }
  });

var pool = mysql.createPool({
  host: 'localhost',
  user: 'admin',
  password: 'fnbxfzmxfn33',
  database: 'dune_api',
  insecureAuth: true,
  queueLimit : 0,
  connectionLimit : 0,
});

app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
  preserveExtension: 2
}));

app.use(express.static('public'));
app.use('/files', express.static('files'));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('development'));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
    req.mysql = pool;
    next();
});
app.use('/', indexRouter);
app.use('/api/v1/', indexRouter);
app.use('/api/v1/login', loginRouter);
app.use('/api/v1/logout', logoutRouter);
app.use('/api/v1/cnxTable', cnxTableRouter);
app.use('/api/v1/tokens', tokensRouter);
app.use(verifyToken);
app.use('/api/v1/games', gamesRouter);
app.use('/api/v1/store', storeRouter);
app.use('/api/v1/store/notifs', storeNotifsRouter);
app.use('/api/v1/trombi', trombiRouter);
app.use('/api/v1/tables', tablesRouter);
app.use('/api/v1/users', usersRouter);
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
