var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var verifyToken = require('./verify');
var verifyTokenAdmin = require('./verifyAdmin');
var mysql = require('mysql');
var fileUpload = require('express-fileupload');

// Routes
var loginRouter = require('./routes/auth/login');
var helpRouter = require('./routes/help');
var adminCreateRouter = require('./routes/adminPanel/create');
var adminDashboardRouter = require('./routes/adminPanel/dashboard');
var adminStatistiquesRouter = require('./routes/adminPanel/statistiques');
var adminDeleteRouter = require('./routes/adminPanel/delete');
var adminUpdateRouter = require('./routes/adminPanel/update');
var logoutRouter = require('./routes/auth/logout');
var tokensRouter = require('./routes/auth/tokens');
var usersRouter = require('./routes/users');
var dashRouter = require('./routes/dashboard');
var elevesRouter = require('./routes/eleves/eleves');
var elevesStatsRouter = require('./routes/eleves/elevesStats');
var trombiRouter = require('./routes/trombi');
var ecoleRouter = require('./routes/ecole');
var filesManagerRouter = require('./routes/filesManager/filesManager');
var storeRouter = require('./routes/store/store');
var notifsRouter = require('./routes/notifs');
var gamesRouter = require('./routes/games/games');
var playRouter = require('./routes/table/play');
var gestLicencesRouter = require('./routes/table/licences/lic');
var tablesRouter = require('./routes/table/tables');
var gestAppsRouter = require('./routes/table/gestApps');
var cnxTableRouter = require('./routes/table/cnxTable');
var cnxTableRouter2 = require('./routes/table/cnxTable2');
var cProfsRouter = require('./routes/classe/classeProfs');
var classeRouter = require('./routes/classe/classe');
var cEcoleRouter = require('./routes/classe/classeEcole');
var cEleveRouter = require('./routes/classe/classeEleve');
var gameDownload = require('./routes/gameDownload/gameDownload');
var abonnementRouter = require('./routes/abonnement');
var secureRouter = require('./routes/facturation/secure');

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
    user: 'root',
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

app.use('/', express.static(__dirname + '/public/apidoc'));
app.use('/files/apps', express.static(__dirname + '/files/apps'));
app.use('/files/eleves', express.static(__dirname + '/files/eleves'));
app.use('/files/profs', express.static(__dirname + '/files/profs'));
app.use('/files/fm', express.static(__dirname + '/files/fm'));

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
    req.mysql = pool;
    next();
});

app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/cnxTable', cnxTableRouter);
app.use('/tokens', tokensRouter);
app.use(verifyToken);
app.use('/', gameDownload);
app.use('/help', helpRouter);
app.use('/facturation/secure', secureRouter);
app.use('/cnxTable2', cnxTableRouter2);
app.use('/abonnement', abonnementRouter);
app.use('/games', gamesRouter);
app.use('/filesManager', filesManagerRouter);
app.use('/store', storeRouter);
app.use('/notifs', notifsRouter);
app.use('/trombi', trombiRouter);
app.use('/tables', tablesRouter);
app.use('/table/gestApps', gestAppsRouter);
app.use('/table/licences', gestLicencesRouter);
app.use('/play', playRouter);
app.use('/users', usersRouter);
app.use('/dashBoard', dashRouter);
app.use('/eleves/stats', elevesStatsRouter);
app.use('/eleves', elevesRouter);
app.use('/ecole', ecoleRouter);
app.use('/classe', classeRouter);
app.use('/classes/profs', cProfsRouter);
app.use('/classes/eleve', cEleveRouter);
app.use('/classes/ecole', cEcoleRouter);
app.use(verifyTokenAdmin);
app.use('/admin/create', adminCreateRouter);
app.use('/admin/dashboard', adminDashboardRouter);
app.use('/admin/statistiques', adminStatistiquesRouter);
app.use('/admin/delete', adminDeleteRouter);
app.use('/admin/update', adminUpdateRouter);



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
