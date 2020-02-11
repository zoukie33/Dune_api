const express = require('express');
const mysql = require('mysql2');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { secret } = require('../../config');
const tools = require('../../functions/tools');

/**
 * @api {get} /admin/creators/ Getting all creators
 * @apiName getCreators
 * @apiGroup AdminCreators
 * @apiPermission Public
 * @apiVersion 1.0.0
 *
 * @apiError 500 SQL Error
 * @apiError 400 Bad Request.
 * @apiSuccessExample {json} Success-Response:
 *   {
 *       "status": 200,
 *       "error": null,
 *       "response": [
 *           {
 *               "idCreator": 1,
 *               "nom": "VictorH",
 *               "api_key": "null"
 *           },
 *           {
 *               "idCreator": 2,
 *               "nom": "MvCaster",
 *               "api_key": null
 *           },
 *           {
 *               "idCreator": 3,
 *               "nom": "Corentin Bordes",
 *               "api_key": null
 *           }
 *       ]
 *   }
 * @apiDescription Route permettant de récupérer tous les créateurs
 */

router.get('/', function(req, res, next) {
  let query = 'SELECT * FROM ??';
  let data = ['d_creator'];
  query = mysql.format(query, data);
  req.mysql.query(query, function(error, results, fields) {
    if (error) {
      tools.dSend(
        res,
        'NOK',
        'AdminCreator',
        'GettingCreators',
        500,
        error,
        null
      );
    } else {
      tools.dSend(
        res,
        'NOK',
        'AdminCreator',
        'GettingCreators',
        200,
        null,
        results
      );
    }
  });
});

/**
 * @api {get} /admin/creators/genApiKey/:idCreator Generating ApiKey for a creator
 * @apiName genApiKey
 * @apiGroup AdminCreators
 * @apiPermission Public
 * @apiVersion 1.0.0
 *
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *    "status": 200,
 *    "error": null,
 *       "response": eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.*****.******
 * }
 *
 * @apiErrorExample {json} Error-Response:
 * {
 *   {
 *      "status": 400,
 *      "error": "Ce creator dispose déjà d'une clé api",
 *      "response": null
 *   }
 * }
 * @apiError 502 Aucun utilisateur ne correspond à ces identifiants.
 * @apiError 500 SQL Error
 * @apiError 500 Erreur d'ajout de token dans la base User.
 * @apiParam {String} email Email de l'utilisateur
 * @apiParam {String} password Mot de passe de l'utilisateur
 * @apiDescription Route permettant à un utilisateur de se connecter.
 */

router.get('/genApiKey/:idCreator', function(req, res, next) {
  let idCreator = req.params.idCreator;
  if (typeof idCreator != 'undefined') {
    let query = 'SELECT idCreator, api_key FROM ?? WHERE idCreator = ?';
    let data = ['d_creator', idCreator];
    query = mysql.format(query, data);
    req.mysql.query(query, function(error, results, fields) {
      if (error) {
        tools.dSend(res, 'NOK', 'AdminCreator', 'genApiKey', 500, error, null);
      } else {
        if (results[0].api_key == null) {
          let api_key = jwt.sign({ idCreator: idCreator }, secret);
          let q = 'UPDATE ?? SET api_key = ? WHERE idCreator = ?';
          let datas = ['d_creator', api_key, idCreator];
          q = mysql.format(q, datas);
          req.mysql.query(q, function(error, results, fields) {
            if (error) {
              tools.dSend(
                res,
                'NOK',
                'AdminCreator',
                'genApiKey',
                500,
                error,
                null
              );
            } else {
              tools.dSend(
                res,
                'OK',
                'AdminCreator',
                'genApiKey',
                200,
                null,
                api_key
              );
            }
          });
        } else {
          tools.dSend(
            res,
            'NOK',
            'AdminCreator',
            'genApiKey',
            400,
            "Ce creator dispose déjà d'une clé api",
            null
          );
        }
      }
    });
  } else {
    tools.dSend(
      res,
      'NOK',
      'AdminCreator',
      'genApiKey',
      400,
      'Bad Request',
      null
    );
  }
});

module.exports = router;
