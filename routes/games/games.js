const express = require('express');
const mysql = require('mysql2');
const router = express.Router();
const { dirname } = require('../../config');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const filez = require('../../functions/files/files');
const tools = require('../../functions/tools');

/**
 * @api {get} /games/nbGames Get nb of Games by idEcole
 * @apiName nbGames
 * @apiGroup Games
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiError 510 idEcole is missing.
 * @apiError 500 SQL Error.
 *
 * @apiHeader {String} token Token auth
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
  if (idEcole) {
    var query =
      'SELECT COUNT(*) AS nbGames FROM d_gamesAppEcole WHERE idEcole = ' +
      idEcole;
    req.mysql.query(query, function(error, results, fields) {
      if (error) {
        tools.dSend(res, 'NOK', 'Games', 'nbGames', 500, error, null);
      } else {
        if (results.length != 0) {
          tools.dSend(res, 'OK', 'Games', 'nbGames', 200, null, results);
        }
      }
    });
  } else {
    tools.dSend(res, 'OK', 'Games', 'nbGames', 510, 'idEcole is missing', null);
  }
});

/**
 * @api {get} /games/ Getting all the games
 * @apiName games
 * @apiGroup Games
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token Token auth
 * @apiError 500 SQL Error.
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
  req.mysql.query('SELECT * from d_games', function(error, results, fields) {
    if (error) {
      tools.dSend(res, 'NOK', 'Games', 'games', 500, error, null);
    } else {
      if (req.currUser.typeUser === 4) {
        for (let i = 0; i < results.length; i++) {
          if (results[i].path == null) {
            try {
              if (
                fs.statSync(dirname + '/files/Games/' + results[i].id + '.zip')
              ) {
                results[i].path = results[i].id + '.zip';
              }
            } catch (err) {
              if (err.code === 'ENOENT') {
                results[i].path = null;
              }
            }
          }
        }
      }
      tools.dSend(res, 'OK', 'Games', 'games', 200, null, results);
    }
  });
});

/**
 * @api {get} /games/:id Getting a game
 * @apiName gamesById
 * @apiGroup Games
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token Token auth
 * @apiError 500 SQL Error.
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
  req.mysql.query('SELECT * from d_games WHERE id = ' + req.params.id, function(
    error,
    results,
    fields
  ) {
    if (error) {
      tools.dSend(res, 'NOK', 'Games', 'gamesById', 500, error, null);
    } else {
      tools.dSend(res, 'OK', 'Games', 'gamesById', 200, null, results);
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
 * @apiHeader {String} token Token auth
 * @apiParam {String} name Nom de l'application/jeu.
 * @apiParam {String} creator Nom du créateur.
 * @apiError 500 SQL Error.
 * @apiError 400 Bad request.
 */

router.post('/add', function(req, res, next) {
  let name = req.body.name;
  let creator = req.body.creator;
  if (typeof name != 'undefined' && typeof creator != 'undefined') {
    let query =
      "INSERT INTO d_games (name, creator, path) VALUES ('" +
      name +
      "', '" +
      creator +
      "', 'NULL')";

    req.mysql.query(query, function(error, results, fields) {
      if (error) {
        tools.dSend(res, 'NOK', 'Games', 'addGame', 500, error, null);
      } else {
        tools.dSend(res, 'OK', 'Games', 'addGame', 200, null, 'Game Added');
      }
      res.end(JSON.stringify(results));
    });
  } else {
    tools.dSend(res, 'NOK', 'Games', 'addGame', 400, 'Bad request.', null);
  }
});

module.exports = router;
