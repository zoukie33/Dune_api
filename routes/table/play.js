var express = require('express');
var mysql   = require("mysql");
var router = express.Router();
var filez = require('../../functions/files/files');
var tools = require('../../functions/tools');

/**
 * @api {post} /createGame/ Create a game
 * @apiName createGame
 * @apiGroup Play
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {Token} token
 * @apiParam {int} idGame
 * @apiParam {int} player1
 * @apiParam {int} player2
 * @apiParam {int} player3
 * @apiParam {int} player4
 *
 * @apiError 500 SQL Error.
 *
 * @apiSuccessExample Success-Response:
 * {
 *    "status": 200,
 *    "error": null,
 *    "response": [
 *        {
 *
 *        }
 *      ]
 * }
 */

router.post('/createGame', function(req, res, next) {
  var idProf = req.currUser.idUser;
  var idTable = req.currUser.idTable;
  var idClasse = req.currUser.idClasse;
  var idGame = req.body.idGame;
  //var nbPlayers = req.body.nbPlayers;
  var idPlayer1 = req.body.player1;
  var idPlayer2 = req.body.player2;
  var idPlayer3 = req.body.player3;
  var idPlayer4 = req.body.player4;
	var query1 = "INSERT INTO d_gamesPlayed (idGame, idTypeGame, idProf, idClasse) VALUES ('"+ idGame +"', '"+ idClasse +"', '"+ idProf +"', '"+ idClasse +"')"";
  var good = 0;
	req.mysql.query(query1, function (error, results, fields) {
	  	if(error){
        tools.dSend(res, "NOK", "Play", "createGame", 500, error, null);
	  	} else {
        var idGP = results.insertId;
        if (idPlayer1 != null) {
          req.mysql.query("INSERT INTO d_gamesScored (idGP, idEleve, score) VALUES ("+ idGP +", "+ idPlayer1 +", -1)", function (error, results, fields) {
            if(error){
              good = -1;
      	  	} else {
              good = 1;
            }
          });
        }
        if (good == 1 && idPlayer2 != null) {
          req.mysql.query("INSERT INTO d_gamesScored (idGP, idEleve, score) VALUES ("+ idGP +", "+ idPlayer2 +", -1)", function (error, results, fields) {
            if(error){
              good = -2;
      	  	} else {
              good = 1;
            }
          });
        }
        if (good == 1 && idPlayer3 != null) {
          req.mysql.query("INSERT INTO d_gamesScored (idGP, idEleve, score) VALUES ("+ idGP +", "+ idPlayer3 +", -1)", function (error, results, fields) {
            if(error){
              good = -3;
      	  	} else {
              good = 1;
            }
          });
        }
        if (good == 1 && idPlayer4 != null) {
          req.mysql.query("INSERT INTO d_gamesScored (idGP, idEleve, score) VALUES ("+ idGP +", "+ idPlayer4 +", -1)", function (error, results, fields) {
            if(error){
              good = -4;
      	  	} else {
              good = 1;
            }
          });
        }
        if (good == 1) {
          tools.dSend(res, "OK", "Play", "createGame", 200, null, results);
        } else {
          tools.dSend(res, "NOK", "Play", "createGame", 500, error, good);
        }
	  	}
  	});
});
