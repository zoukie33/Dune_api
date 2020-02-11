let express = require('express');
const mysql = require('mysql2');
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
 * @apiError 400 Bad Request.
 * @apiHeader {String} token Token auth
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "error": null,
 *     "response": OK
 * }
 */

router.put('/appInstalled', function(req, res, next) {
  let idJeu = req.body.idJeu;
  let idTable = req.currUser.idTable;

  if (typeof idJeu != 'undefined') {
    let query =
      "INSERT INTO d_tableGames(idTable, idGame) VALUES ('" +
      idTable +
      "', '" +
      idJeu +
      "')";

    req.mysql.query(query, function(error, results, fields) {
      if (error) {
        tools.dSend(
          res,
          'NOK',
          'Table-gestApps',
          'appInstalled',
          500,
          error,
          null
        );
      } else {
        tools.dSend(
          res,
          'OK',
          'Table-gestApps',
          'appInstalled',
          200,
          null,
          'OK'
        );
      }
    });
  } else {
    tools.dSend(
      res,
      'NOK',
      'Table-gestApps',
      'appInstalled',
      400,
      'Bad request.',
      null
    );
  }
});

/**
 * @api {post} /table/gestApps/appsOnTable Getting Games installed
 * @apiName appsOnTable
 * @apiGroup Table
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token Token auth
 * @apiParam {String} [nom] Affiner la recherche.
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "error": null,
 *     "response": [
 *         {
 *             "idGame": 2,
 *             "name": "Invacouleur",
 *             "path": NULL,
 *             "creator": 1,
 *             "picPath": null
 *         }
 *     ]
 * }
 */

router.post('/appsOnTable', function(req, res, next) {
  let nom = req.body.nom;

  let query =
    'SELECT tg.idGame, g.name, g.path, c.nom AS creator, g.picPath FROM d_tableGames AS tg, d_games AS g, d_creator AS c WHERE tg.idGame = g.id AND c.idCreator=g.creator AND tg.idTable = ' +
    req.currUser.idTable;

  if (typeof nom != 'undefined' && nom !== '')
    query += " AND g.name LIKE '%" + nom + "%'";

  req.mysql.query(query, function(error, results, fields) {
    if (error) {
      tools.dSend(
        res,
        'NOK',
        'Table-gestApps',
        '/appsOnTable',
        500,
        error,
        null
      );
    } else {
      tools.dSend(
        res,
        'OK',
        'Table-gestApps',
        '/appsOnTable',
        200,
        null,
        results
      );
    }
  });
});

/**
 * @api {post} /table/gestApps/appsNotOnTable Getting Games not installed
 * @apiName appsNotOnTable
 * @apiGroup Table
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token Token auth
 * @apiParam {String} [nom] Affiner la recherche.
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "error": null,
 *     "response": [
 *         {
 *             "idGame": 2,
 *             "name": "Invacouleur",
 *             "path": NULL,
 *             "creator": 1,
 *             "picPath": null
 *         }
 *     ]
 * }
 */
router.post('/appsNotOnTable', function(req, res, next) {
  let nom = req.body.nom;

  let query =
    'SELECT g.id AS "idGame",  g.name, g.path, c.nom AS creator, g.picPath FROM d_games as g, d_creator as c ' +
    'WHERE g.id NOT IN (SELECT idGame FROM d_tableGames WHERE idTable = ' +
    req.currUser.idTable +
    ' ) ' +
    'AND g.id IN (SELECT idGame FROM d_gamesAppEcole WHERE idEcole = ' +
    req.currUser.idEcole +
    ' ) ' +
    'AND c.idCreator=g.creator';

  if (typeof nom != 'undefined' && nom !== '')
    query += " AND g.name LIKE '%" + nom + "%'";

  req.mysql.query(query, function(error, results, fields) {
    if (error) {
      tools.dSend(
        res,
        'NOK',
        'Table-gestApps',
        '/appsNotOnTable',
        500,
        error,
        null
      );
    } else {
      tools.dSend(
        res,
        'OK',
        'Table-gestApps',
        '/appsNotOnTable',
        200,
        null,
        results
      );
    }
  });
});

/*
 * @api {delete} /table/gestApps/appRemoved When an app is removed from a table
 * @apiName appRemoved
 * @apiGroup Table
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {Int} idJeu
 * @apiError 400 Bad Request.
 * @apiHeader {String} token Token auth
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "error": null,
 *     "response": OK
 * }
 */

router.delete('/appRemoved', function(req, res, next) {
  let idJeu = req.body.idJeu;
  let idTable = req.currUser.idTable;
  if (typeof idJeu != 'undefined') {
    let query =
      'DELETE from d_tableGames WHERE idTable = ' +
      idTable +
      ' AND idGame = ' +
      idJeu;

    req.mysql.query(query, function(error, results, fields) {
      if (error) {
        tools.dSend(
          res,
          'NOK',
          'Table-gestApps',
          'appRemoved',
          500,
          error,
          null
        );
      } else {
        tools.dSend(
          res,
          'OK',
          'Table-gestApps',
          'appRemoved',
          200,
          null,
          results
        );
      }
    });
  } else {
    tools.dSend(
      res,
      'NOK',
      'Table-gestApps',
      'appRemoved',
      400,
      'Bad request.',
      null
    );
  }
});

module.exports = router;
