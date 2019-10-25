var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var tools = require('../functions/tools');

/* 
OK getCompetences
OK getCompByStudent
OK getCompByCLasses
getCompById
validateCompStud
unvalidateCompStud 
*/

/**
 * @api {get} /competences/getCompetences Get all Competences
 * @apiName getCompetences
 * @apiGroup competences
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiDescription Route permettant la récupération de toutes les compétences existantes dans la base de donnée.
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
    "error": null,
    "response": [
        {
            "idComp": 1,
            "libelleComp": "Comp1"
        },
        {
            "idComp": 2,
            "libelleComp": "Comp2"
        }
    ]
 *
 * }
 */

router.get('/getCompetences', function(req, res, next) {
  var query = 'SELECT * FROM ??';
  var table = ['d_competences'];
  query = mysql.format(query, table);

  req.mysql.query(query, function(error, results, fields) {
    if (error) {
      tools.dSend(
        res,
        'NOK',
        'competences',
        'getCompetences',
        500,
        error,
        null
      );
    } else {
      tools.dSend(
        res,
        'OK',
        'competences',
        'getCompetences',
        200,
        null,
        results
      );
    }
  });
});

/**
 * @api {get} /competences/getCompByStudent/:idStudent Get Competences By Student
 * @apiName getCompByStudent
 * @apiGroup competences
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiDescription Route permettant la récupération des compétences attachées à un élève.
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *
 * }
 */

router.get('/getCompByStudent/:idStudent', function(req, res, next) {
  var query =
    'SELECT ce.idComp, c.libelleComp, ce.valide FROM d_competences AS c, d_compEleve AS ce WHERE ce.idComp = c.idComp AND ce.idEleve = ?';
  var table = [req.params.idStudent];
  query = mysql.format(query, table);

  req.mysql.query(query, function(error, results, fields) {
    if (error) {
      tools.dSend(
        res,
        'NOK',
        'competences',
        'getCompByStudent',
        500,
        error,
        null
      );
    } else {
      tools.dSend(
        res,
        'OK',
        'competences',
        'getCompByStudent',
        200,
        null,
        results
      );
    }
  });
});

/**
 * @api {get} /competences/getCompByCLasses/:idClasse Get Competences By Student
 * @apiName getCompByStudent
 * @apiGroup competences
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiDescription Route permettant la récupération des compétences acquises ou non de tous les élèves d'une classe.
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *
 * }
 */

router.get('/getCompByCLasses/:idClasse', function(req, res, next) {
  var query =
    "SELECT ce.idEleve, e.nomEleve, e.prenomEleve, GROUP_CONCAT(ce.idComp, c.libelleComp, ce.valide GROUP BY ce.idEleve SEPARATOR ',') AS Competences FROM d_competences AS c, d_compEleve GROUP_CONCAT AS ce, d_classeEleve AS cce, d_eleves AS e WHERE ce.idComp = c.idComp AND ce.idEleve = cce.idEleve AND e.idEleve = ce.idEleve AND cce.idClasse = ?";
  var table = [req.params.idClasse];
  query = mysql.format(query, table);

  req.mysql.query(query, function(error, results, fields) {
    if (error) {
      tools.dSend(
        res,
        'NOK',
        'competences',
        'getCompByCLasses',
        500,
        error,
        null
      );
    } else {
      tools.dSend(
        res,
        'OK',
        'competences',
        'getCompByCLasses',
        200,
        null,
        results
      );
    }
  });
});

module.exports = router;
