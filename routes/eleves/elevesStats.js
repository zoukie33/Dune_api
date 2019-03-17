var express = require('express');
var mysql   = require("mysql");
var router = express.Router();
const fileUpload = require('express-fileupload');
var filez = require('../../functions/files/files');
var tools = require('../../functions/tools');

/**
 * @api {get} /eleves/stats/byGame/:idGame Get all students
 * @apiName byGame
 * @apiGroup ElevesStats
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {Token} token
 * @apiParam {int} idGame
 * @apiError 500 SQL Error.
 *
 * @apiSuccessExample Success-Response:
 * {
 *    "status": 200,
 *    "error": null,
 *    "ascEleve": [
 *        {
 *            "idEleve": 13,
 *            "nom": "Bozo",
 *            "prenom": "Jessico",
 *            "note": 88
 *        },
 *        {
 *            "idEleve": 14,
 *            "nom": "Couturier",
 *            "prenom": "Manon",
 *            "note": 75
 *        }
 *    ],
 *    "descNote": [
 *        {
 *            "idEleve": 13,
 *            "nom": "Bozo",
 *            "prenom": "Jessico",
 *            "note": 88
 *        },
 *        {
 *            "idEleve": 14,
 *            "nom": "Couturier",
 *            "prenom": "Manon",
 *            "note": 75
 *        }
 *    ]
 * }
 */
router.get('/byGame/:idGame', function(req, res, next) {
  var idProf = req.currUser.idUser;
  var idGame = req.params.idGame;
  if (req.currUser.typeUser == 2) {
		var query1 = 'SELECT gs.idEleve, e.nomEleve AS nom, e.prenomEleve AS prenom, gs.score AS note FROM d_profsAppEcole AS pae, d_classeEcole AS ce, d_classe AS c, d_gamesPlayed AS gp, d_gamesScored AS gs, d_eleves AS e WHERE gp.idGP = gs.idGP AND gp.idClasse = c.idClasse AND c.idClasse = ce.idClasse AND ce.idEcole = pae.idEcole AND e.idEleve = gs.idEleve AND pae.idProf = ' + idProf + ' AND gp.idGame = ' + idGame + ' ORDER BY e.nomEleve ASC';
  	var query2 = 'SELECT gs.idEleve, e.nomEleve AS nom, e.prenomEleve AS prenom, gs.score AS note FROM d_profsAppEcole AS pae, d_classeEcole AS ce, d_classe AS c, d_gamesPlayed AS gp, d_gamesScored AS gs, d_eleves AS e WHERE gp.idGP = gs.idGP AND gp.idClasse = c.idClasse AND c.idClasse = ce.idClasse AND ce.idEcole = pae.idEcole AND e.idEleve = gs.idEleve AND pae.idProf = ' + idProf + ' AND gp.idGame = ' + idGame + ' ORDER BY gs.score DESC';
	} else {
		var query1 = 'SELECT gs.idEleve, e.nomEleve AS nom, e.prenomEleve AS prenom, gs.score AS note FROM d_gamesPlayed AS gp, d_gamesScored AS gs, d_eleves AS e WHERE gp.idGP = gs.idGP AND e.idEleve = gs.idEleve AND gp.idProf = ' + idProf + ' AND gp.idGame = ' + idGame + ' ORDER BY e.nomEleve ASC';
  	var query2 = 'SELECT gs.idEleve, e.nomEleve AS nom, e.prenomEleve AS prenom, gs.score AS note FROM d_gamesPlayed AS gp, d_gamesScored AS gs, d_eleves AS e WHERE gp.idGP = gs.idGP AND e.idEleve = gs.idEleve AND gp.idProf = ' + idProf + ' AND gp.idGame = ' + idGame + ' ORDER BY gs.score DESC';
	}
	req.mysql.query(query1, function (error, results1, fields) {
	  	if(error){
        tools.dSend(res, "NOK", "ElevesStats", "byGame", 500, error, null);
	  	} else {
        req.mysql.query(query2, function (error, results2, fields) {
          if(error){
            tools.dSend(res, "NOK", "ElevesStats", "byGame", 500, error, null);
    	  	} else {
            tools.dLog("OK", "ElevesStats", "byGame", 200, null, '"ascEleve": ' + results1 + ', "descNote":' + results2);
            res.send(JSON.stringify({"status": 200, "error": null, "ascEleve": results1, "descNote": results2}));
          }
        });
	  	}
  	});
});

/**
 * @api {get} /eleves/stats/byClasse/:idClasse Get games done by class
 * @apiName byClasse
 * @apiGroup ElevesStats
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {Token} token
 * @apiParam {int} idClasse
 * @apiError 500 SQL Error.
 *
 * @apiSuccessExample Success-Response:
 * {
 *    "status": 200,
 *    "error": null,
 *    "response": [
 *        {
 *            "idGame": 1,
 *            "nameGame": "Compteclasse",
 *            "matiere": "Maths",
 *            "moyenne": 67.5,
 *            "nbJoueurs": 4,
 *            "date": "2019-03-14T18:04:51.000Z"
 *        }
 *    ]
 * }
 */
router.get('/byClasse/:idClasse', function(req, res, next) {
  var idProf = req.currUser.idUser;
  var idClasse = req.params.idClasse;
	var query = 'SELECT gp.idGame AS idGame, g.name AS nameGame, tg.labelType AS matiere, AVG(gs.score) AS moyenne, COUNT(gs.idEleve) AS nbJoueurs, gp.TimeStamp AS date FROM d_gamesPlayed AS gp, d_typeGames AS tg, d_games AS g, d_gamesScored AS gs WHERE g.id = gp.idGame AND gp.idGP = gs.idGP AND g.idType = tg.idType AND gp.idClasse = ' + idClasse + ' GROUP BY gp.idGP ORDER BY gp.TimeStamp';

	req.mysql.query(query, function (error, results, fields) {
	  	if(error){
        tools.dSend(res, "NOK", "ElevesStats", "byClasse", 500, error, null);
	  	} else {
        tools.dSend(res, "OK", "ElevesStats", "byClasse", 200, null, results);
	  	}
  	});
});

module.exports = router;
