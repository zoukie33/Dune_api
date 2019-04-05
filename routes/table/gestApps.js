var express = require('express');
var mysql   = require("mysql");
var router = express.Router();
var tools = require('../../functions/tools');


/**
 * @api {get} /table/gestApps/appsOnTable Getting Games installed
 * @apiName appsOnTable
 * @apiGroup Table
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {Token} token
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "error": null,
 *     "response": [
 *         {
 *             "idGame": 2,
 *             "idType": 1,
 *             "name": "Invacouleur",
 *             "creator": 1,
 *             "picPath": null
 *         }
 *     ]
 * }
 */

router.get('/appsOnTable', function(req, res, next) {
  var query = 'SELECT tg.idGame, g.idType, g.name, g.creator, g.picPath FROM d_tableGames AS tg, d_games AS g WHERE tg.idGame = g.id AND tg.idTable = ' + req.currUser.idTable;

	req.mysql.query(query, function (error, results, fields) {
	  	if(error){
        tools.dSend(res, "NOK", "Table-gestApps", "/", 500, error, null);
	  	} else {
        tools.dSend(res, "OK", "Table-gestApps", "/", 200, null, results);
	  	}
  	});
});

/**
 * @api {get} /table/gestApps/appsNotOnTable Getting Games not installed
 * @apiName appsNotOnTable
 * @apiGroup Table
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {Token} token
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "error": null,
 *     "response": [
 *         {
 *             "idGame": 2,
 *             "idType": 1,
 *             "name": "Invacouleur",
 *             "creator": 1,
 *             "picPath": null
 *         }
 *     ]
 * }
 */
router.get('/appsNotOnTable', function(req, res, next) {
  var query = 'SELECT g.id AS "idGame", g.idType, g.name, g.creator, g.picPath FROM d_games as g WHERE g.id NOT IN (SELECT idGame FROM d_tableGames WHERE idTable =' + req.currUser.idTable + ')';

	req.mysql.query(query, function (error, results, fields) {
	  	if(error){
        tools.dSend(res, "NOK", "Table-gestApps", "/", 500, error, null);
	  	} else {
        tools.dSend(res, "OK", "Table-gestApps", "/", 200, null, results);
	  	}
  	});
});

module.exports = router;
