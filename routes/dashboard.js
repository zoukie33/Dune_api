var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var tools = require('../functions/tools');

/**
 * @api {get} /dashboard/nbEleves Get nb of Students for an user
 * @apiName nbEleves
 * @apiGroup Dashboard
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiError 510 idEcole is missing.
 * @apiError 500 SQL Error.
 *
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "nbEleves": 18
 * }
 */

router.get('/nbEleves', function(req, res, next) {
  if (req.currUser.idUser) {
    if (req.currUser.typeUser == 2) {
      var query =
        'SELECT COUNT(ce.idEleve) AS nbEleves FROM ?? AS ce, d_classe AS c, d_classeEcole as cse, d_profsAppEcole AS pe WHERE pe.idEcole = cse.idEcole AND cse.idClasse = c.idClasse AND c.idClasse = ce.idClasse AND pe.idProf = ?';
    } else {
      var query =
        'SELECT COUNT(ce.idEleve) AS nbEleves FROM ?? AS ce, d_classe AS c, d_profsAppClasse AS pc, d_users AS u WHERE u.idUser = pc.idProf AND pc.idClasse = c.idClasse AND c.idClasse = ce.idClasse AND ce.idEleve AND u.idUser = ?';
    }

    var data = ['d_classeEleve', req.currUser.idUser];
    query = mysql.format(query, data);

    req.mysql.query(query, function(error, results, fields) {
      if (error) {
        tools.dSend(res, 'NOK', 'Dashboard', 'nbEleves', 500, error, null);
      } else {
        if (results.length != 0) {
          tools.dLog(
            'OK',
            'Dashboard',
            'nbEleves',
            200,
            null,
            'nbEleves:' + results[0].nbEleves
          );
          res.send(
            JSON.stringify({ status: 200, nbEleves: results[0].nbEleves })
          );
        }
      }
    });
  } else {
    tools.dSend(
      res,
      'NOK',
      'Dashboard',
      'nbEleves',
      510,
      'idUser is missing',
      null
    );
  }
});

/**
 * @api {get} /dashboard/nbClasses Get nb of Classes for an User
 * @apiName nbClasses
 * @apiGroup Dashboard
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiError 510 idEcole is missing.
 * @apiError 500 SQL Error.
 *
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "nbClasses": 18
 * }
 */

router.get('/nbClasses', function(req, res, next) {
  if (req.currUser.idUser) {
    if (req.currUser.typeUser == 2) {
      var query =
        'SELECT COUNT(idClasse) AS nbClasses FROM ?? AS ce, d_profsAppEcole AS pe WHERE ce.idEcole = pe.idEcole AND pe.idProf = ?';
      var data = ['d_classeEcole', req.currUser.idUser];
    } else {
      var query =
        'SELECT COUNT(idClasse) AS nbClasses FROM ?? WHERE idProf = ?';
      var data = ['d_profsAppClasse', req.currUser.idUser];
    }
    query = mysql.format(query, data);
    req.mysql.query(query, function(error, results, fields) {
      if (error) {
        tools.dSend(res, 'NOK', 'Dashboard', 'nbClasses', 500, error, null);
      } else {
        if (results.length != 0) {
          tools.dLog(
            'OK',
            'Dashboard',
            'nbClasses',
            200,
            null,
            'nbClasses:' + results[0].nbClasses
          );
          res.send(
            JSON.stringify({ status: 200, nbClasses: results[0].nbClasses })
          );
        }
      }
    });
  } else {
    tools.dSend(
      res,
      'NOK',
      'Dashboard',
      'nbClasses',
      510,
      'idUser is missing',
      null
    );
  }
});

/**
 * @api {get} /dashboard/nbNotifsNonL Get all notifications unRead for the popup
 * @apiName nbNotifsNonLues
 * @apiGroup Dashboard
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiDescription Route permettant la récupération des notifications.
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "nbNotifsNonL": 1
 * }
 */

router.get('/nbNotifsNonL', function(req, res, next) {
  var idUser = req.currUser.idUser;
  var query =
    'SELECT COUNT(idNotif) AS nbNotifsNonL FROM d_notifications WHERE idUser = ' +
    idUser +
    ' AND isRead = 0';

  req.mysql.query(query, function(error, results, fields) {
    if (error) {
      tools.dSend(res, 'NOK', 'Dashboard', 'nbNotifsNonLues', 500, error, null);
    } else {
      tools.dLog(
        'OK',
        'Dashboard',
        'nbNotifsNonL',
        200,
        null,
        'nbNotifsNonL:' + results[0].nbNotifsNonL
      );
      res.send(
        JSON.stringify({ status: 200, nbNotifsNonL: results[0].nbNotifsNonL })
      );
    }
  });
});

/**
 * @api {get} /dashboard/nbAppsStarted Get the number of appStarted
 * @apiName nbAppsStarted
 * @apiGroup Dashboard
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiDescription Route permettant la récupération du nombre d'applications lancées.
 * @apiParam {Token} token
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "nbAppsStarted": 1
 * }
 */

router.get('/nbAppsStarted', function(req, res, next) {
  var idUser = req.currUser.idUser;
  var query =
    'SELECT COUNT(gp.idGP) AS nbAppsStarted FROM d_gamesPlayed AS gp WHERE gp.isPlayed = 1 AND idProf = ' +
    idUser;

  req.mysql.query(query, function(error, results, fields) {
    if (error) {
      tools.dSend(res, 'NOK', 'Dashboard', 'nbAppsStarted', 500, error, null);
    } else {
      tools.dLog(
        'OK',
        'Dashboard',
        'nbAppsStarted',
        200,
        null,
        'nbAppsStarted:' + results[0].nbAppsStarted
      );
      res.send(
        JSON.stringify({ status: 200, nbAppsStarted: results[0].nbAppsStarted })
      );
    }
  });
});

/**
 * @api {get} /dashboard/nbGamesPlayed Get the number of Played games for the current month
 * @apiName nbGamesPlayed
 * @apiGroup Dashboard
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiDescription Route permettant la récupération du nombre de parties effectuées sur le mois en cours par un idProf (ou directeur)
 * @apiParam {Token} token
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "nbGamesPlayed": 16
 * }
 */

router.get('/nbGamesPlayed', function(req, res, next) {
  var idUser = req.currUser.idUser;
  var date = new Date();
  var time =
    date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  var query =
    "SELECT COUNT(gp.idGP) AS nbGamesPlayed FROM d_gamesPlayed AS gp WHERE MONTH(gp.Timestamp)=MONTH('" +
    time +
    "')";
  if (req.currUser.typeUser !== 2) {
    query += ' AND gp.idProf=' + idUser;
  }

  req.mysql.query(query, function(error, results, fields) {
    if (error) {
      tools.dSend(res, 'NOK', 'Dashboard', 'nbGamesPlayed', 500, error, null);
    } else {
      tools.dLog(
        'OK',
        'Dashboard',
        'nbGamesPlayed',
        200,
        null,
        'nbGamesPlayed:' + results[0].nbGamesPlayed
      );
      res.send(
        JSON.stringify({ status: 200, nbGamesPlayed: results[0].nbGamesPlayed })
      );
    }
  });
});

module.exports = router;
