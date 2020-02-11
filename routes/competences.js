const express = require('express');
const mysql = require('mysql2');
const router = express.Router();
const tools = require('../functions/tools');

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
  let query = 'SELECT * FROM ??';
  let table = ['d_competences'];
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
 *   "error": null,
 *   "response": [
 *       {
 *           "idComp": 1,
 *           "libelleComp": "Reconnaître les couleurs",
 *           "valide": 0
 *       },
 *       {
 *           "idComp": 2,
 *           "libelleComp": "Reconnaître les lettres",
 *           "valide": 1
 *       }
 *   ]
 *
 * }
 */

router.get('/getCompByStudent/:idStudent', function(req, res, next) {
  let query =
    'SELECT ce.idComp, c.libelleComp, ce.valide FROM d_competences AS c, d_compEleve AS ce WHERE ce.idComp = c.idComp AND ce.idEleve = ?';
  let table = [req.params.idStudent];
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
 * @apiIgnore Not finished
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
  let query =
    "SELECT ce.idEleve, e.nomEleve, e.prenomEleve, GROUP_CONCAT(ce.idComp, c.libelleComp, ce.valide GROUP BY ce.idEleve SEPARATOR ',') AS Competences FROM d_competences AS c, d_compEleve GROUP_CONCAT AS ce, d_classeEleve AS cce, d_eleves AS e WHERE ce.idComp = c.idComp AND ce.idEleve = cce.idEleve AND e.idEleve = ce.idEleve AND cce.idClasse = ?";
  let table = [req.params.idClasse];
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

/**
 * @api {get} /competences/getCompById/:idComp Get Competences By Id
 * @apiName getCompById
 * @apiGroup competences
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiDescription Route permettant la récupération des informations d'une compétence via son id.
 * @apiParam {Int} idComp Id de la compétence demandée.
 * @apiSuccessExample Success-Response:
 * {
 *    "status": 200,
 *    "error": null,
 *    "response": [
 *        {
 *          "idComp": 1,
 *          "libelleComp": "Comp1"
 *       },
 *       {
 *           "idComp": 2,
 *           "libelleComp": "Comp2"
 *       }
 *   ]
 * }
 */

router.get('/getCompById/:idComp', function(req, res, next) {
  let query = 'SELECT * FROM d_competences WHERE idComp = ?';
  let table = [req.params.idComp];
  query = mysql.format(query, table);

  req.mysql.query(query, function(error, results, fields) {
    if (error) {
      tools.dSend(res, 'NOK', 'competences', 'getCompById', 500, error, null);
    } else {
      tools.dSend(res, 'OK', 'competences', 'getCompById', 200, null, results);
    }
  });
});

/**
 * @api {post} /competences/validateCompStud Validating Competence for a student
 * @apiName validateCompStud
 * @apiGroup competences
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiDescription Route permettant la validation d'une compétence pour un élève.
 * @apiParam {Int} idComp Id de la compétence demandée.
 * @apiParam {Int} idEleve Id de l'élève à qui attribuer la compétence.
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *
 * }
 */

router.post('/validateCompStud/', function(req, res, next) {
  let idComp = req.body.idComp,
    idEleve = req.body.idEleve,
    errVar = 'Cette route necessite que trous les champs soient remplis.';
  if (idComp && idEleve) {
    let querVer = 'SELECT * FROM ?? WHERE idEleve = ? AND idComp = ?',
      tableVer = ['d_compEleve', idEleve, idComp],
      query = 'INSERT INTO ?? (idComp, idEleve, valide) VALUES (?,?,?)',
      table = ['d_compEleve', idComp, idEleve, 1],
      query2 = 'UPDATE ?? SET valide = ? WHERE idEleve = ? AND idComp = ?',
      table2 = ['d_compEleve', 1, idEleve, idComp];

    querVer = mysql.format(querVer, tableVer);
    query = mysql.format(query, table);
    query2 = mysql.format(query2, table2);

    req.mysql.query(querVer, function(error, resultsVer, fields) {
      if (error) {
        tools.dSend(
          res,
          'NOK',
          'competences',
          'validateCompStud',
          500,
          error,
          null
        );
      } else {
        if (resultsVer.length == 0) {
          req.mysql.query(query, function(error, results, fields) {
            if (error) {
              tools.dSend(
                res,
                'NOK',
                'competences',
                'validateCompStud',
                500,
                error,
                null
              );
            } else {
              tools.dSend(
                res,
                'OK',
                'competences',
                'validateCompStud',
                200,
                null,
                results
              );
            }
          });
        } else {
          req.mysql.query(query2, function(error, results2, fields) {
            if (error) {
              tools.dSend(
                res,
                'NOK',
                'competences',
                'validateCompStud',
                500,
                error,
                null
              );
            } else {
              tools.dSend(
                res,
                'OK',
                'competences',
                'validateCompStud',
                200,
                null,
                results2
              );
            }
          });
        }
      }
    });
  } else {
    tools.dSend(
      res,
      'NOK',
      'competences',
      'validateCompStud',
      500,
      null,
      errVar
    );
  }
});

/**
 * @api {put} /competences/unvalidateCompStud unValidating Competence for a student
 * @apiName unvalidateCompStud
 * @apiGroup competences
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiDescription Route permettant la dé-validation d'une compétence pour un élève.
 * @apiParam {Int} idComp Id de la compétence demandée.
 * @apiParam {Int} idEleve Id de l'élève à qui enlever la compétence.
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *
 * }
 */

router.put('/unvalidateCompStud/', function(req, res, next) {
  let idComp = req.body.idComp;
  let idEleve = req.body.idEleve;
  let errVar = 'Cette route necessite que trous les champs soient remplis.';
  if (idComp && idEleve) {
    let query = 'UPDATE ?? SET valide = 0 WHERE idComp = ? AND idEleve = ?';
    let table = ['d_compEleve', idComp, idEleve];
    query = mysql.format(query, table);

    req.mysql.query(query, function(error, results, fields) {
      if (error) {
        tools.dSend(
          res,
          'NOK',
          'competences',
          'unvalidateCompStud',
          500,
          error,
          null
        );
      } else {
        tools.dSend(
          res,
          'OK',
          'competences',
          'unvalidateCompStud',
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
      'competences',
      'unvalidateCompStud',
      500,
      null,
      errVar
    );
  }
});

/**
 * @api {get} /competences/getAppComps/:idApp Get Competences By Id App
 * @apiName getAppComps
 * @apiGroup competences
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiDescription Route permettant la récupération des informations d'une compétence via son id.
 * @apiParam {Int} idApp Id de l'app demandée.
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *    "error": null,
 *    "response": [
 *        {
 *          "idComp": 1,
 *          "libelleComp": "Comp1"
 *       },
 *       {
 *           "idComp": 2,
 *           "libelleComp": "Comp2"
 *       }
 *   ]
 * }
 */

router.get('/getAppComps/:idApp', function(req, res, next) {
  let query =
    'SELECT c.* FROM d_competences AS c, d_compGame AS cg WHERE c.idComp = cg.idComp AND cg.idGame = ?';
  let table = [req.params.idApp];
  query = mysql.format(query, table);

  req.mysql.query(query, function(error, results, fields) {
    if (error) {
      tools.dSend(res, 'NOK', 'competences', 'getAppComps', 500, error, null);
    } else {
      tools.dSend(res, 'OK', 'competences', 'getAppComps', 200, null, results);
    }
  });
});

module.exports = router;
