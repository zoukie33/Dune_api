var express = require('express');
var mysql   = require("mysql");
var router = express.Router();
const fileUpload = require('express-fileupload');
var filez = require('../../functions/files/files');
var tools = require('../../functions/tools');

/**
 * @api {get} /games/nbGames Get nb of Gaes by idEcole
 * @apiName nbGames
 * @apiGroup Games
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiError 510 idEcole is missing.
 * @apiError 500 SQL Error.
 *
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "error": null,
 *     "response": [
 * 				 {
 *             "nbGames": 3
 *        	}
 *     ]
 * }
 */

router.get('/nbGames', function(req, res, next) {
	var idEcole = req.currUser.idEcole;
	console.log("sas");
	if (idEcole) {
		var query = "SELECT COUNT(*) AS nbGames FROM d_gamesAppEcole WHERE idEcole = " + idEcole;
		req.mysql.query(query, function (error, results, fields) {
			if(error){
				tools.dSend(res, "NOK", "Games", "nbGames", 500, error, null);
			} else {
				if (results.length != 0) {
					tools.dSend(res, "OK", "Games", "nbGames", 200, null, results);
				}
			}
		});
	} else {
		tools.dSend(res, "OK", "Games", "nbGames", 510, "idEcole is missing", null);
	}
});

/**
 * @api {get} /games/ Getting all the games
 * @apiName games
 * @apiGroup Games
 * @apiPermission Logged
 * @apiVersion 1.0.0
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "error": null,
 *     "response": [
 *         {
 *             "id": 1,
 *             "idType": 1,
 *             "name": "testApp",
 *             "creator": 1,
 *             "path": "NULL",
 *             "picPath": "1-app.png"
 *         }
 *     ]
 * }
 *
 */

router.get('/', function(req, res, next) {
	req.mysql.query('SELECT * from d_games', function (error, results, fields) {
		if(error){
			tools.dSend(res, "NOK", "Games", "games", 500, error, null);
		} else {
			tools.dSend(res, "OK", "Games", "games", 200, null, results);
		}
	});
});

/**
 * @api {get} /games/:id Getting a game
 * @apiName gamesById
 * @apiGroup Games
 * @apiPermission Logged
 * @apiVersion 1.0.0
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "error": null,
 *     "response": [
 *         {
 *             "id": 1,
 *             "idType": 1,
 *             "name": "testApp",
 *             "creator": 1,
 *             "path": "NULL",
 *             "picPath": "1-app.png"
 *         }
 *     ]
 * }
 */

router.get('/:id?', function(req, res, next) {
	req.mysql.query('SELECT * from d_games WHERE id = ' + req.params.id , function (error, results, fields) {
		if(error){
			tools.dSend(res, "NOK", "Games", "gamesById", 500, error, null);
		} else {
			tools.dSend(res, "OK", "Games", "gamesById", 200, null, results);
		}
	});
});

/**
 * @api {post} /games/add Creating a game
 * @apiName addGame
 * @apiGroup Games
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {String} name Nom de l'application/jeu.
 * @apiParam {String} creator Nom du créateur.
 */

router.post('/add', function(req, res, next) {
	var name  = req.body.name;
	var creator  = req.body.creator;

	var query = "INSER INTO d_games (name, creator, path) VALUES ('"+ name +"', '"+ creator +"', 'NULL')";

	req.mysql.query(query, function(error, results, fields) {
		if (error){
			tools.dSend(res, "NOK", "Games", "addGame", 500, error, null);
		} else {
			tools.dSend(res, "OK", "Games", "addGame", 200, null, "Game Added");
		}
		res.end(JSON.stringify(results));
	});
});

/**
 * @api {put} /games/update Updating a game
 * @apiName updateGame
 * @apiGroup Games
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {Int} id Id de l'app/jeu.
 * @apiParam {String} name Nom de l'application.
 * @apiParam {String} creator Nom du créateur.
 */

router.put('/update', function(req, res, next) {
	var id  = req.body.id;
	var name  = req.body.name;
	var creator  = req.body.creator;

	var query = "UPDATE d_games SET name = '"+ name +"', creator = '"+ creator +"' WHERE id = " + id;

	req.mysql.query(query, function(error, results, fields) {
		if (error){
			tools.dSend(res, "NOK", "Games", "updateGame", 500, error, null);
		} else {
			tools.dSend(res, "OK", "Games", "updateGame", 200, null, "Game Updated");
		}
		res.end(JSON.stringify(results));
	});
});

/**
 * @api {put} /games/picGame Uploading a picture for the game
 * @apiName picGame
 * @apiGroup Games
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {Int} idGame Id de l'app/jeu.
 * @apiParam {File} picGame Image.
 */

router.put('/picGame', function(req, res, next) {
	if (Object.keys(req.files).length != 0) {
		var id  = req.body.idGame;
		let file;

		file = req.files.picGame;
		var fileName = id + "-app.png";
		if (filez.filesGest(file, "apps/", fileName)) {
			var query = "UPDATE d_games SET picPath = '" + fileName + "'  WHERE id = " + id;
			req.mysql.query(query, function(error, results, fields) {
				if (error){
					tools.dSend(res, "NOK", "Games", "picGame", 500, error, "Impossible de mettre a jour cet utilisateur.");
				} else {
					tools.dSend(res, "OK", "Games", "picGame", 200, null, "Game Updated");
				}
				res.end(JSON.stringify(results));
			});
		} else {
			tools.dSend(res, "NOK", "Games", "picGame", 500, "Directory error", null);
		}
	} else {
		tools.dSend(res, "NOK", "Games", "picGame", 500, "Error uploading File", null);
	}
});

module.exports = router;