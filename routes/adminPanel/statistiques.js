var express = require('express');
var mysql   = require("mysql");
var serial = require("generate-serial-key");
var router = express.Router();
var filez = require('../../functions/files/files');
var tools = require('../../functions/tools');

/**
 * @api {get} /admin/statistiques/nbGamesPlayed Get nb of games played in total
 * @apiName nbGamesPlayed
 * @apiGroup AdminStats
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiError 500 SQL Error.
 *
 * @apiHeader {String} token AdminToken auth
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "error": null,
 *     "response": [
 * 				 {
 *             "nbGamesPlayed": 3
 *        	}
 *     ]
 * }
 */

router.get('/nbGamesPlayed', function(req, res, next) {
  req.mysql.query("SELECT COUNT(idGP) AS nbGamesPlayed FROM d_gamesPlayed", function(error, results, fields) {
    if (error){
      tools.dSend(res, "NOK", "Admin-Stats", "nbGamesPlayed", 500, error, null);
    } else {
      tools.dSend(res, "OK", "Admin-Stats", "nbGamesPlayed", 200, null, results);
    }
  });
});


/**
 * @api {get} /admin/statistiques/nbQrScanned Get nb of QrCodes scanned in total
 * @apiName nbQrScanned
 * @apiGroup AdminStats
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiError 500 SQL Error.
 *
 * @apiHeader {String} token AdminToken auth
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "error": null,
 *     "response": [
 * 				 {
 *             "nbQrScanned": 3
 *        	}
 *     ]
 * }
 */

router.get('/nbQrScanned', function(req, res, next) {
  req.mysql.query("SELECT COUNT(tokenTable) AS nbQrScanned FROM d_tableProf", function(error, results, fields) {
    if (error){
      tools.dSend(res, "NOK", "Admin-Stats", "nbQrScanned", 500, error, null);
    } else {
      tools.dSend(res, "OK", "Admin-Stats", "nbQrScanned", 200, null, results);
    }
  });
});

// router.get('/nbStudentsPlayedAGame', function(req, res, next) {
//   req.mysql.query(query, function(error, results, fields) {
//     if (error){
//       tools.dSend(res, "NOK", "Admin-Stats", "nbStudentsPlayedAGame", 500, error, null);
//     } else {
//       tools.dSend(res, "OK", "Admin-Stats", "nbStudentsPlayedAGame", 200, null, results);
//     }
//   });
// });

/**
 * @api {get} /admin/statistiques/nbFilesAddedWeb Get nb of files added on web in total
 * @apiName nbFilesAddedWeb
 * @apiGroup AdminStats
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiError 500 SQL Error.
 *
 * @apiHeader {String} token AdminToken auth
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "error": null,
 *     "response": [
 * 				 {
 *             "nbFilesAddedWeb": 3
 *        	}
 *     ]
 * }
 */

router.get('/nbFilesAddedWeb', function(req, res, next) {
  req.mysql.query("SELECT COUNT(idFile) AS nbFilesAddedWeb FROM d_files", function(error, results, fields) {
    if (error){
      tools.dSend(res, "NOK", "Admin-Stats", "nbFilesAddedWeb", 500, error, null);
    } else {
      tools.dSend(res, "OK", "Admin-Stats", "nbFilesAddedWeb", 200, null, results);
    }
  });
});
module.exports = router;
