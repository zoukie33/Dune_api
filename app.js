const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const verifyToken = require('./verify');
const verifyTokenAdmin = require('./verifyAdmin');
const mysql = require('mysql2');
const fileUpload = require('express-fileupload');

const loginRouter = require('./routes/auth/login');
const helpRouter = require('./routes/help');
const adminLoginRouter = require('./routes/adminPanel/login');
const adminCreateRouter = require('./routes/adminPanel/create');
const adminCreatorsRouter = require('./routes/adminPanel/creators');
const adminDashboardRouter = require('./routes/adminPanel/dashboard');
const adminStatistiquesRouter = require('./routes/adminPanel/statistiques');
const adminDeleteRouter = require('./routes/adminPanel/delete');
const adminUpdateRouter = require('./routes/adminPanel/update');
const tokensRouter = require('./routes/auth/tokens');
const usersRouter = require('./routes/users');
const dashRouter = require('./routes/dashboard');
const compRouter = require('./routes/competences');
const elevesRouter = require('./routes/eleves/eleves');
const elevesStatsRouter = require('./routes/eleves/elevesStats');
const trombiRouter = require('./routes/trombi');
const ecoleRouter = require('./routes/ecole');
const filesManagerRouter = require('./routes/filesManager/filesManager');
const storeRouter = require('./routes/store/store');
const notifsRouter = require('./routes/notifs');
const gamesRouter = require('./routes/games/games');
const playRouter = require('./routes/table/play');
const gestLicencesRouter = require('./routes/table/licences/lic');
const tablesRouter = require('./routes/table/tables');
const gestAppsRouter = require('./routes/table/gestApps');
const cnxTableRouter = require('./routes/table/cnxTable');
const cnxTableRouter2 = require('./routes/table/cnxTable2');
const cProfsRouter = require('./routes/classe/classeProfs');
const classeRouter = require('./routes/classe/classe');
const cEcoleRouter = require('./routes/classe/classeEcole');
const cEleveRouter = require('./routes/classe/classeEleve');
const gameDownload = require('./routes/gameDownload/gameDownload');
const abonnementRouter = require('./routes/abonnement');
const secureRouter = require('./routes/facturation/secure');
const facturationRouter = require('./routes/facturation/gestFact');
const stripeRouter = require('./routes/stripe/payments');
const stripeHooksRouter = require('./routes/stripe/webhooks');

const app = express();

const {
  mysqlHost,
  mysqlUser,
  mysqlPassword,
  mysqlDatabase,
  mysqlQLimit,
  mysqlCoLimit,
  debugLogging,
  dirname
} = require('./config');

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, token'
  );
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});

var pool1 = mysql.createPool({
  host: mysqlHost,
  user: mysqlUser,
  password: mysqlPassword,
  database: mysqlDatabase,
  insecureAuth: true,
  queueLimit: mysqlQLimit,
  connectionLimit: mysqlCoLimit
});
const pool = pool1.promise();
if (debugLogging === true) {
  console.log(pool);
}

app.use(logger('dev'));
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    preserveExtension: 2
  })
);

app.use('/', express.static(dirname + '/public/apidoc'));
app.use('/files/apps', express.static(dirname + '/files/apps'));
app.use('/files/eleves', express.static(dirname + '/files/eleves'));
app.use('/files/profs', express.static(dirname + '/files/profs'));
app.use('/files/fm', express.static(dirname + '/files/fm'));

app.use('/hooks/stripeHooks', bodyParser.raw({ type: '*/*' }));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.set('views', path.join(dirname, 'views'));
app.set('view engine', 'pug');

app.use(cookieParser());
app.use(express.static(path.join(dirname, 'public')));

app.use(function(req, res, next) {
  req.mysql = pool;
  next();
});

app.use('/login', loginRouter);
app.use('/admin/login', adminLoginRouter);
app.use('/cnxTable', cnxTableRouter);
app.use('/tokens', tokensRouter);
app.use('/hooks', stripeHooksRouter);
app.use(verifyToken);
app.use('/', gameDownload);
app.use('/help', helpRouter);
app.use('/facturation/secure', secureRouter);
app.use('/facturation/', facturationRouter);
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
app.use('/competences', compRouter);
app.use('/eleves/stats', elevesStatsRouter);
app.use('/eleves', elevesRouter);
app.use('/ecole', ecoleRouter);
app.use('/classe', classeRouter);
app.use('/classes/profs', cProfsRouter);
app.use('/classes/eleve', cEleveRouter);
app.use('/classes/ecole', cEcoleRouter);
app.use('/stripe/payments', stripeRouter);
app.use(verifyTokenAdmin);
app.use('/admin/create', adminCreateRouter);
app.use('/admin/creators', adminCreatorsRouter);
app.use('/admin/dashboard', adminDashboardRouter);
app.use('/admin/statistiques', adminStatistiquesRouter);
app.use('/admin/delete', adminDeleteRouter);
app.use('/admin/update', adminUpdateRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
