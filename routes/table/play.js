var express = require('express');
var mysql   = require("mysql");
var router = express.Router();
var filez = require('../../functions/files/files');
var tools = require('../../functions/tools');

/**
 * @api {post} /play/createGame/ Create a game
 * @apiName createGame
 * @apiGroup Play
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token Token auth
 * @apiParam {int} idClasse
 * @apiParam {int} idGame
 * @apiParam {int} idTypeGame
 *
 * @apiError 500 SQL Error.
 *
 * @apiSuccessExample Success-Response:
 * {
 *    "status": 200,
 *    "error": null,
 *    "response": [
 *   {
 *       "status": 200,
 *       "idGP": 11,
 *       "response": {
 *           "fieldCount": 0,
 *           "affectedRows": 1,
 *           "insertId": 11,
 *           "serverStatus": 2,
 *           "warningCount": 0,
 *           "message": "",
 *           "protocol41": true,
 *           "changedRows": 0
 *       }
 *   }
 *      ]
 * }
 */

router.post('/createGame', function(req, res, next) {
  var idProf = req.currUser.idUser;
  var idClasse = req.body.idClasse;
  var idGame = req.body.idGame;
  var idTypeGame = req.body.idTypeGame;
	var query1 = "INSERT INTO d_gamesPlayed (idGame, idTypeGame, idProf, idClasse) VALUES ('"+ idGame +"', '"+ idTypeGame +"', '"+ idProf +"', '"+ idClasse +"')";
  var good = 0;
  if (idProf) {
    req.mysql.query(query1, function (error, results, fields) {
  	  	if(error){
          tools.dSend(res, "NOK", "Play", "createGame", 500, error, null);
  	  	} else {
          var idGP = results.insertId;
          tools.dLog("OK", "Play", "createGame", 200, null, "idGP:" + idGP + ", response:" + results);
          res.send(JSON.stringify({"status": 200, "idGP": idGP, "response": results}));

  	  	}
    	});
  } else {
    tools.dSend(res, "OK", "Play", "createGame", 500, "Bad token", null);
  }
});

/**
 * @api {get} /play/myGame/:idGP Get game infos
 * @apiName myGame
 * @apiGroup Play
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token Token auth
 * @apiParam {int} idGP
 *
 * @apiError 500 SQL Error.
 *
 * @apiSuccessExample Success-Response:
 * {
 *    "status": 200,
 *    "error": null,
 *    "response": [
 *    {
 *            "idGP": 1,
 *            "idGame": 1,
 *            "idTypeGame": 2,
 *            "idProf": 33,
 *            "idClasse": 1,
 *            "isPlayed": 1,
 *            "TimeStamp": "2019-03-14T18:04:51.000Z"
 *        }
 *   }
 *      ]
 * }
 */

router.get('/myGame/:idGP', function(req, res, next) {
  var idGP = req.params.idGP;
	var query = "SELECT * FROM d_gamesPlayed AS gp WHERE gp.idGP = " + idGP;
    req.mysql.query(query, function (error, results, fields) {
  	  	if(error){
          tools.dSend(res, "NOK", "Play", "myGame", 500, error, null);
  	  	} else {
          tools.dSend(res, "OK", "Play", "myGame", 200, null, results);
  	  	}
    	});
});


/**
 * @api {post} /play/endGame/ Ending a game
 * @apiName endGame
 * @apiGroup Play
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token Token auth 
 * @apiParam {int} idGP
 * @apiParam {int} player1
 * @apiParam {int} player2
 * @apiParam {int} player3
 * @apiParam {int} player4
 * @apiParam {int} scorePlayer1
 * @apiParam {int} scorePlayer2
 * @apiParam {int} scorePlayer3
 * @apiParam {int} scorePlayer4
 *
 * @apiError 500 SQL Error.
 *
 * @apiSuccessExample Success-Response:
 * {
 *    "status": 200,
 *    "idGP": 11,
 *    "response": 4
 * }
 */


router.post('/endGame', function(req, res, next) {
  var scorePlayer1 = req.body.scorePlayer1;
  var scorePlayer2 = req.body.scorePlayer2;
  var scorePlayer3 = req.body.scorePlayer3;
  var scorePlayer4 = req.body.scorePlayer4;
  var idPlayer1 = req.body.player1;
  var idPlayer2 = req.body.player2;
  var idPlayer3 = req.body.player3;
  var idPlayer4 = req.body.player4;
  var idGP = req.body.idGP;


  if (idPlayer1) {
    req.mysql.query("INSERT INTO d_gamesScored (idGP, idEleve, score) VALUES ("+ idGP +", "+ idPlayer1 +", " + scorePlayer1 +")", function (error, results, fields) {
      if(error){
        tools.dSend(res, "NOK", "Play", "createGame", 500, error, results);
      } else {
        if (idPlayer2) {
          req.mysql.query("INSERT INTO d_gamesScored (idGP, idEleve, score) VALUES ("+ idGP +", "+ idPlayer2 +", " + scorePlayer2 +")", function (error, results, fields) {
            if(error){
              tools.dSend(res, "NOK", "Play", "createGame", 500, error, results);
            } else {
              if (idPlayer3) {
                req.mysql.query("INSERT INTO d_gamesScored (idGP, idEleve, score) VALUES ("+ idGP +", "+ idPlayer3 +", " + scorePlayer3 +")", function (error, results, fields) {
                  if(error){
                    tools.dSend(res, "NOK", "Play", "createGame", 500, error, results);
                  } else {
                    if (idPlayer4) {
                      req.mysql.query("INSERT INTO d_gamesScored (idGP, idEleve, score) VALUES ("+ idGP +", "+ idPlayer4 +", " + scorePlayer4 +")", function (error, results, fields) {
                        if(error){
                          tools.dSend(res, "NOK", "Play", "createGame", 500, error, results);
                        } else {
                          tools.dLog("OK", "Play", "endGame", 200, null, "idGP:" + idGP + ", response: 4");
                          res.send(JSON.stringify({"status": 200, "idGP": idGP, "response": 4}));
                        }
                      });
                    } else {
                      tools.dLog("OK", "Play", "endGame", 200, null, "idGP:" + idGP + ", response: 3");
                      res.send(JSON.stringify({"status": 200, "idGP": idGP, "response": 3}));
                    }
                  }
                });
              } else {
                tools.dLog("OK", "Play", "endGame", 200, null, "idGP:" + idGP + ", response: 2");
                res.send(JSON.stringify({"status": 200, "idGP": idGP, "response": 2}));
              }
            }
          });
        } else {
          tools.dLog("OK", "Play", "endGame", 200, null, "idGP:" + idGP + ", response: 1");
          res.send(JSON.stringify({"status": 200, "idGP": idGP, "response": 1}));
        }
      }
    });
  } else {
    tools.dSend(res, "NOK", "Play", "createGame", 500, "Aucun élèves", 0);
  }
});
module.exports = router;
