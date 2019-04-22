var express = require('express');
var mysql   = require("mysql");
var router = express.Router();
var filez = require('../../functions/files/files');
var tools = require('../../functions/tools');

/**
 * @api {get} /eleves/stats/bySession/:idGP Get all students
 * @apiName bySession
 * @apiGroup ElevesStats
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {Token} token
 * @apiParam {int} idGP
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
router.get('/bySession/:idGP', function(req, res, next) {
  var idProf = req.currUser.idUser;
  var idGP = req.params.idGP;
  if (req.currUser.typeUser == 2) {
		var query1 = 'SELECT gs.idEleve, e.nomEleve AS nom, e.prenomEleve AS prenom, gs.score AS note FROM d_profsAppEcole AS pae, d_classeEcole AS ce, d_classe AS c, d_gamesPlayed AS gp, d_gamesScored AS gs, d_eleves AS e WHERE gp.idGP = gs.idGP AND gp.idClasse = c.idClasse AND c.idClasse = ce.idClasse AND ce.idEcole = pae.idEcole AND e.idEleve = gs.idEleve AND pae.idProf = ' + idProf + ' AND gp.idGP = ' + idGP + ' ORDER BY e.nomEleve ASC';
  	var query2 = 'SELECT gs.idEleve, e.nomEleve AS nom, e.prenomEleve AS prenom, gs.score AS note FROM d_profsAppEcole AS pae, d_classeEcole AS ce, d_classe AS c, d_gamesPlayed AS gp, d_gamesScored AS gs, d_eleves AS e WHERE gp.idGP = gs.idGP AND gp.idClasse = c.idClasse AND c.idClasse = ce.idClasse AND ce.idEcole = pae.idEcole AND e.idEleve = gs.idEleve AND pae.idProf = ' + idProf + ' AND gp.idGP = ' + idGP + ' ORDER BY gs.score DESC';
	} else {
		var query1 = 'SELECT gs.idEleve, e.nomEleve AS nom, e.prenomEleve AS prenom, gs.score AS note FROM d_gamesPlayed AS gp, d_gamesScored AS gs, d_eleves AS e WHERE gp.idGP = gs.idGP AND e.idEleve = gs.idEleve AND gp.idProf = ' + idProf + ' AND gp.idGP = ' + idGP + ' ORDER BY e.nomEleve ASC';
  	var query2 = 'SELECT gs.idEleve, e.nomEleve AS nom, e.prenomEleve AS prenom, gs.score AS note FROM d_gamesPlayed AS gp, d_gamesScored AS gs, d_eleves AS e WHERE gp.idGP = gs.idGP AND e.idEleve = gs.idEleve AND gp.idProf = ' + idProf + ' AND gp.idGP = ' + idGP + ' ORDER BY gs.score DESC';
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
 *    "nbGamesPlayedBC": 1,
 *    "response": [
 *        {
 *            "idGP": 1,
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
	var query = 'SELECT gp.idGP AS idGP, g.name AS nameGame, tg.labelType AS matiere, AVG(gs.score) AS moyenne, COUNT(gs.idEleve) AS nbJoueurs, gp.TimeStamp AS date FROM d_gamesPlayed AS gp, d_typeGames AS tg, d_games AS g, d_gamesScored AS gs WHERE g.id = gp.idGame AND gp.idGP = gs.idGP AND g.idType = tg.idType AND gp.idClasse = ' + idClasse + ' GROUP BY gp.idGP ORDER BY gp.TimeStamp';

	req.mysql.query(query, function (error, results, fields) {
	  	if(error){
        tools.dSend(res, "NOK", "ElevesStats", "byClasse", 500, error, null);
	  	} else {
        tools.dLog("OK", "ElevesStats", "byClasse", 200, null, '"nbGamesPlayedBC": ' + results.length + ', "response":' + results);
        res.send(JSON.stringify({"status": 200, "error": null, "nbGamesPlayedBC": results.length, "response": results}));
	  	}
  	});
});

/**
 * @api {get} /eleves/stats/gamesPlayed/:idEleve Get games playeds by idEleve
 * @apiName gamesPlayed
 * @apiGroup ElevesStats
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {Token} token
 * @apiParam {int} idEleve
 * @apiError 500 SQL Error.
 *
 * @apiSuccessExample Success-Response:
 * {
 *    "status": 200,
 *    "error": null,
 *    "response": [
 *        {
 *            "idGP": 1,
 *            "nameGame": "Compteclasse",
 *            "matiere": "Maths",
 *            "note": 100,
 *            "date": "2019-03-14T18:04:51.000Z",
 *            "moyenne": 67.5
 *        }
 *    ]
 * }
 */
router.get('/gamesPlayed/:idEleve', function(req, res, next) {
  var idEleve = req.params.idEleve;
	var query = 'SELECT gp.idGP, g.name AS nameGame, tg.labelType AS matiere, gs.score AS note, gp.TimeStamp AS date, (SELECT AVG(gs2.score) FROM d_gamesPlayed AS gp2, d_gamesScored AS gs2 WHERE gp2.idGP = gs2.idGP AND gp2.idGP = gp.idGP) AS moyenne FROM d_gamesScored AS gs, d_gamesPlayed AS gp, d_games AS g, d_typeGames AS tg WHERE gs.idGP = gp.idGP AND gp.idGame = g.id AND gp.idTypeGame = tg.idType AND gs.idEleve =' + idEleve;

	req.mysql.query(query, function (error, results, fields) {
	  	if(error){
        tools.dSend(res, "NOK", "ElevesStats", "gamesPlayed", 500, error, null);
	  	} else {
        tools.dLog("OK", "ElevesStats", "gamesPlayed", 200, null, 'response":' + results);
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	  	}
  	});
});

/**
 * @api {get} /eleves/stats/bulletin/:idEleve Generate the bulletin of a student
 * @apiName bulletin
 * @apiGroup ElevesStats
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {Token} token
 * @apiParam {int} idEleve
 * @apiError 500 SQL Error.
 *
 * @apiSuccessExample Success-Response:
 * {
 *    "status": 200,
 *    "error": null,
 *    "response": [
 *        {
 *            "labeltype": "Logique",
 *            "moyenne": 88,
 *            "moyenneClasse": 81.5,
 *            "nbPlayed": 1
 *        },
 *        {
 *            "labeltype": "Maths",
 *            "moyenne": 50,
 *            "moyenneClasse": 67.5,
 *            "nbPlayed": 1
 *        }
 *    ],
 *    "moyenneGeneralEleve": 69,
 *    "moyenneGeneraleClasse": 74.5
 * }
 */

router.get('/bulletin/:idEleve', function(req, res, next) {
  var idEleve = req.params.idEleve;
	var query = 'SELECT tg.labeltype, AVG(gs.score) AS moyenne, (SELECT AVG(gs2.score) FROM d_gamesPlayed AS gp2, d_gamesScored AS gs2 WHERE gp2.idGP = gs2.idGP AND gp.idTypeGame = gp2.idTypeGame) AS moyenneClasse, COUNT(gp.idGP) AS nbPlayed FROM d_gamesScored AS gs, d_gamesPlayed AS gp, d_typeGames AS tg WHERE gs.idGP = gp.idGP AND gp.idTypeGame = tg.idType AND gp.isPlayed = 1 AND gs.idEleve = '+ idEleve +' GROUP BY gp.idTypeGame ORDER BY gp.idTypeGame ASC';

	req.mysql.query(query, function (error, results, fields) {
	  	if(error){
        tools.dSend(res, "NOK", "ElevesStats", "bulletin", 500, error, null);
	  	} else {
        let moyGen = 0;
        let moyGenClasse = 0;
        for (const k in results) {
          let moyMat = results[k].moyenne;
          let moyClasse = results[k].moyenneClasse;
          moyGen += moyMat;
          moyGenClasse += moyClasse;
          console.log("moyGen: " + moyGen + " - moyGenClasse: " + moyGenClasse);
        }
        moyGen = moyGen / results.length;
        moyGenClasse = moyGenClasse / results.length;
        tools.dLog("OK", "ElevesStats", "bulletin", 200, null, '"response": ' + results + ', "moyenneGeneralEleve": ' + moyGen + ', "moyenneGeneraleClasse": ' + moyGenClasse);
        res.send(JSON.stringify({"status": 200, "error": null, "response": results, "moyenneGeneralEleve": moyGen, "moyenneGeneraleClasse": moyGenClasse}));
	  	}
  	});
});

/**
 * @api {get} /eleves/stats/getMat/:idEleve Get games type played by a student
 * @apiName getMat
 * @apiGroup ElevesStats
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {Token} token
 * @apiParam {int} idEleve
 * @apiError 500 SQL Error.
 *
 * @apiSuccessExample Success-Response:
 * {
 *    "status": 200,
 *    "error": null,
 *    "response": [
 *        {
 *            "idTypeGame": 1,
 *            "labelType": "Logique"
 *        },
 *        {
 *            "idTypeGame": 2,
 *            "labelType": "Mathématiques"
 *        }
 *    ]
 * }
 */

router.get('/getMat/:idEleve', function(req, res, next) {
  var idEleve = req.params.idEleve;
  var query = "SELECT gp.idTypeGame, tg.labelType FROM d_gamesPlayed AS gp, d_gamesScored AS gs, d_typeGames AS tg WHERE gp.idGP = gs.idGP AND gp.idTypeGame = tg.idType AND gs.idEleve = " + idEleve + " GROUP BY gp.idTypeGame";

  req.mysql.query(query, function (error, results, fields) {
    if(error){
      tools.dSend(res, "NOK", "ElevesStats", "getMat", 500, error, null);
    } else {
      tools.dSend(res, "OK", "ElevesStats", "getMat", 200, null, results);
    }
  });
});


/**
 * @api {get} /eleves/stats/getGamesByMatEleve/:idEleve/:idMat Get games played by a student for one gametype
 * @apiName getGamesByMatEleve
 * @apiGroup ElevesStats
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {Token} token
 * @apiParam {int} idEleve
 * @apiParam {int} idMat
 * @apiError 500 SQL Error.
 *
 * @apiSuccessExample Success-Response:
 * {
 *    "status": 200,
 *    "error": null,
 *    "response": [
 *        {
 *            "idGP": 1,
 *            "nameGame": "Compteclasse",
 *            "matiere": "Maths",
 *            "note": 100,
 *            "date": "2019-03-14T18:04:51.000Z",
 *            "moyenne": 67.5
 *        }
 *    ]
 * }
 */

router.get('/getGamesByMatEleve/:idEleve/:idMat', function(req, res, next) {
  var idEleve = req.params.idEleve;
  var idMat = req.params.idMat;
  var query = 'SELECT gp.idGP, g.name AS nameGame, tg.labelType AS matiere, gs.score AS note, gp.TimeStamp AS date, (SELECT AVG(gs2.score) FROM d_gamesPlayed AS gp2, d_gamesScored AS gs2 WHERE gp2.idGP = gs2.idGP AND gp2.idGP = gp.idGP) AS moyenne FROM d_gamesScored AS gs, d_gamesPlayed AS gp, d_games AS g, d_typeGames AS tg WHERE gs.idGP = gp.idGP AND gp.idGame = g.id AND gp.idTypeGame = tg.idType AND gs.idEleve =' + idEleve + ' AND gp.idTypeGame = ' + idMat;

  req.mysql.query(query, function (error, results, fields) {
    if(error){
      tools.dSend(res, "NOK", "ElevesStats", "getGamesByMatEleve", 500, error, null);
    } else {
      tools.dSend(res, "OK", "ElevesStats", "getGamesByMatEleve", 200, null, results);
    }
  });
});
module.exports = router;
