var express = require('express');
var mysql = require('mysql2');
var router = express.Router();
var md5 = require('MD5');
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
 * @apiParam {array} idEleves
 *
 * @apiError 400 Bad request.
 * @apiError 500 Bad token.
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
 *       "tokenGame": 8cee9523fbe40d8eb4ef6f336903ee4c,
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
  console.log(req.body.idEleves);
  let idGame = req.body.idGame,
    idClasse = req.body.idClasse,
    idEleves = req.body.idEleves;
  if (
    typeof idGame != 'undefined' &&
    typeof idClasse != 'undefined' &&
    typeof idEleves != 'undefined'
  ) {
    var tokenGame = md5(
      Date.now() + Math.floor(Math.random() * Math.floor(50))
    );
    var query =
      'INSERT INTO ?? (idGame, idProf, idClasse, tokenGame) VALUES (?, ?, ?, ?)';
    var data = [
      'd_gamesPlayed',
      idGame,
      req.currUser.idUser,
      idClasse,
      tokenGame
    ];
    query = mysql.format(query, data);

    if (req.currUser.idUser) {
      req.mysql.query(query, function(error, results) {
        if (error) {
          tools.dSend(res, 'NOK', 'Play', 'createGame', 500, error, null);
        } else {
          let idGP = results.insertId;

          let queryComp = `SELECT idComp FROM d_compGame WHERE idGame = ${idGame}`;
          queryComp = mysql.format(queryComp);
          req.mysql.execute(queryComp, function(error, resComp) {
            if (error) {
              tools.dSend(res, 'NOK', 'Play', 'createGame', 500, error, null);
            } else {
              console.log(idEleves);
              console.log(resComp);
              for (var i = 0; i < idEleves.length; i++) {
                for (var j = 0; j < resComp.length; j++) {
                  let query2 =
                    'INSERT INTO ?? (idGP, idEleve, idComp) VALUES (?, ?, ?)';
                  let data2 = [
                    'd_gamesScored',
                    idGP,
                    idEleves[i],
                    resComp[j].idComp
                  ];
                  query2 = mysql.format(query2, data2);
                  console.log(query2);
                  req.mysql.execute(query2, function(error, resI) {
                    if (error) {
                      tools.dLog('NOK', 'Play', 'createGame', 500, error, null);
                    }
                  });
                }
              }
              res.send(
                JSON.stringify({
                  status: 200,
                  idGP: idGP,
                  tokenGame: tokenGame,
                  response: results
                })
              );
            }
          });
        }
      });
    } else {
      tools.dSend(res, 'NOK', 'Play', 'createGame', 500, 'Bad token', null);
    }
  } else {
    tools.dSend(res, 'NOK', 'Play', 'createGame', 400, 'Bad request.', null);
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
 *            "idProf": 33,
 *            "idClasse": 1,
 *            "tokenGame": "4bf23e5d365539f6e08243705065fa82",
 *            "isPlayed": 1,
 *            "TimeStamp": "2019-03-14T18:04:51.000Z"
 *        }
 *   }
 *      ]
 * }
 */

router.get('/myGame/:idGP', function(req, res, next) {
  if (req.params.idGP != 'undefined') {
    let query = 'SELECT * FROM ?? AS gp WHERE gp.idGP = ?';
    let data = ['d_gamesPlayed', req.params.idGP];
    query = mysql.format(query, data);

    req.mysql.query(query, function(error, results, fields) {
      if (error) {
        tools.dSend(res, 'NOK', 'Play', 'myGame', 500, error, null);
      } else {
        tools.dSend(res, 'OK', 'Play', 'myGame', 200, null, results);
      }
    });
  } else {
    tools.dSend(res, 'NOK', 'Play', 'myGame', 400, 'Bad Request', null);
  }
});

/**
 * @api {get} /play/getDataForGame/:tokenGame Get game infos
 * @apiName getDataForGame
 * @apiGroup Play/Gamerq
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token Token auth
 * @apiParam {String} tokenGame
 *
 * @apiError 500 SQL Error.
 *
 * @apiSuccessExample Success-Response:
 * {
 *    "status": 200,
 *    "error": null,
 *    "response": [
 *       {
 *           "idGP": 248,
 *           "idGame": 1,
 *           "idProf": 28,
 *           "idClasse": 1,
 *           "tokenGame": "ba0e2da88b7dbc16e3b1fb949e73e756",
 *           "isPlayed": 0,
 *           "TimeStamp": "2019-12-02T19:50:35.000Z"
 *       }
 *   ],
 *   "eleves": [
 *       {
 *           "idEleve": 1,
 *           "nomEleve": "Merveillau",
 *           "prenomEleve": "Denis"
 *       },
 *       {
 *           "idEleve": 2,
 *           "nomEleve": "Senouci",
 *           "prenomEleve": "Elies"
 *       }
 *   ]
 * }
 */

router.get('/getDataForGame/:tokenGame', function(req, res, next) {
  let query = 'SELECT * FROM ?? AS gp WHERE gp.tokenGame = ?';
  let data = ['d_gamesPlayed', req.params.tokenGame];
  query = mysql.format(query, data);
  let query2 = `SELECT DISTINCT gs.idEleve, e.nomEleve, e.prenomEleve FROM d_gamesPlayed AS gp, d_gamesScored AS gs, d_eleves AS e WHERE gp.idGP = gs.idGP AND gs.idEleve = e.idEleve AND gp.tokenGame = \"${req.params.tokenGame}\"`;
  query2 = mysql.format(query2);

  req.mysql.query(query, function(error, results) {
    if (error) {
      tools.dSend(
        res,
        'NOK',
        'Play/Gamerq',
        'getDataForGame',
        500,
        error,
        null
      );
    } else {
      if (results.length >= 1) {
        req.mysql.query(query2, function(error, results2) {
          if (error) {
            tools.dSend(
              res,
              'NOK',
              'Play/Gamerq',
              'getDataForGame',
              500,
              error,
              null
            );
          } else {
            tools.dLog(
              'OK',
              'Play/Gamerq',
              'getDataForGame',
              200,
              null,
              results
            );
            console.log(results2);
            res.send(
              JSON.stringify({
                status: 200,
                error: null,
                results: results,
                eleves: results2
              })
            );
          }
        });
      } else {
        tools.dSend(
          res,
          'NOK',
          'Play/Gamerq',
          'getDataForGame',
          304,
          'Ce token ne correspon à aucune game.',
          null
        );
      }
    }
  });
});

/**
 * @api {post} /play/endGameUnit/ Ending a game for unity
 * @apiName endGameUnit
 * @apiGroup Play
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token Token auth
 * @apiParam {String} tokenGame
 * @apiParam {Array} tabScores Tableau triple entrée avec en colonnes idEleve, idComp, note
 *
 * @apiError 500 SQL Error.
 *
 * @apiSuccessExample Success-Response:
 * {
 *    "status": 200
 * }
 */

router.post('/endGameUnit', function(req, res, next) {
  let tabScores = req.body.tabScores,
    tokenGame = req.body.tokenGame;
  if (typeof tabScores != 'undefined' && typeof tokenGame != 'undefined') {
    let q = `SELECT * FROM ?? WHERE tokenGame = ?`;
    let data = ['d_gamesPlayed', tokenGame];
    q = mysql.format(q, data);
    req.mysql.query(q, function(error, results, fields) {
      if (error) {
        tools.dSend(res, 'OK', 'Play', 'endGameUnit', 400, error, null);
      } else {
        if (results.length >= 1) {
          for (let i = 0; i < tabScores.length; i++) {
            let query = `UPDATE ?? SET score = ? WHERE idEleve = ? AND idComp = ?`;
            let data = [
              'd_gamesScored',
              tabScores[i][2],
              tabScores[i][0],
              tabScores[i][1]
            ];
            query = mysql.format(query, data);
            console.log(query);
            req.mysql.query(query, function(error, results, fields) {
              if (error) {
                tools.dLog('NOK', 'Play', 'endGameUnit', 500, error, null);
              }
            });
          }
          let q2 = `UPDATE ?? SET isPlayed = 1 WHERE tokenGame = ?`;
          let data = ['d_gamesPlayed', tokenGame];
          q2 = mysql.format(q2, data);
          req.mysql.query(q2, function(error, results, fields) {
            if (error) {
              tools.dLog('NOK', 'Play', 'endGameUnit', 500, error, null);
            } else {
              tools.dSend(res, 'OK', 'Play', 'endGameUnit', 200, null, results);
            }
          });
        } else {
          tools.dSend(
            res,
            'NOK',
            'Play',
            'endGameUnit',
            400,
            "La game n'existe.",
            null
          );
        }
      }
    });
  } else {
    tools.dSend(res, 'NOK', 'Play', 'endGameUnit', 400, 'Bad request.1', null);
  }
});

module.exports = router;
