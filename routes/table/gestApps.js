let express = require('express');
let mysql   = require("mysql");
let router = express.Router();
let tools = require('../../functions/tools');

/**
 * @api {put} /table/gestApps/appInstalled When an app is installed on a table
 * @apiName appInstalled
 * @apiGroup Table
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {Int} idJeu
 * @apiHeader {String} token Token auth
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "error": null,
 *     "response": OK
 * }
 */

router.put('/appInstalled', function(req, res, next) {

	var idJeu  = req.body.idJeu;
	var idTable = req.currUser.idTable;
	let query = "INSERT INTO d_tableGames(idTable, idGame) VALUES ('" + idTable + "', '" + idJeu + "')";

	req.mysql.query(query, function (error, results, fields) {
		if(error){
			tools.dSend(res, "NOK", "Table-gestApps", "appInstalled", 500, error, null);
		} else {
			tools.dSend(res, "OK", "Table-gestApps", "appInstalled", 200, null, "OK");
		}
	});
});

/**
 * @api {get} /table/gestApps/appsOnTable Getting Games installed
 * @apiName appsOnTable
 * @apiGroup Table
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token Token auth
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

router.post('/appsOnTable', function(req, res, next) {

	var nom  = req.body.nom;

	let query = 'SELECT tg.idGame, g.idType, g.name, c.nom AS creator, g.picPath FROM d_tableGames AS tg, d_games AS g, d_creator AS c WHERE tg.idGame = g.id AND c.idCreator=g.creator AND tg.idTable = ' + req.currUser.idTable;

	if (nom !== '')
		query += " AND g.name LIKE '%" + nom + "%'";

	req.mysql.query(query, function (error, results, fields) {
		if(error){
			tools.dSend(res, "NOK", "Table-gestApps", "/appsOnTable", 500, error, null);
		} else {
			tools.dSend(res, "OK", "Table-gestApps", "/appsOnTable", 200, null, results);
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
 * @apiHeader {String} token Token auth
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
router.post('/appsNotOnTable', function(req, res, next) {

	var nom  = req.body.nom;

	let query = 'SELECT g.id AS "idGame", g.idType, g.name, c.nom AS creator, g.picPath FROM d_games as g, d_creator as c ' +
		'WHERE g.id NOT IN (SELECT idGame FROM d_tableGames WHERE idTable = ' + req.currUser.idTable + ' ) ' +
		'AND g.id IN (SELECT idGame FROM d_gamesAppEcole WHERE idEcole = ' + req.currUser.idEcole + ' ) ' +
		'AND c.idCreator=g.creator';

	if (nom !== '')
		query += " AND g.name LIKE '%" + nom + "%'";

	req.mysql.query(query, function (error, results, fields) {
		if(error){
			tools.dSend(res, "NOK", "Table-gestApps", "/appsNotOnTable", 500, error, null);
		} else {
			tools.dSend(res, "OK", "Table-gestApps", "/appsNotOnTable", 200, null, results);
		}
	});
});

module.exports = router;
