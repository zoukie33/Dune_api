const express = require('express');
const mysql = require('mysql2');
const router = express.Router();
const filez = require('../../functions/files/files');
var tools = require('../../functions/tools');

/**
 * @api {get} /eleves/stats/bySession/:idGP Get all students
 * @apiName bySession
 * @apiGroup ElevesStats
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token Token auth
 * @apiParam {int} idGP
 * @apiError 500 SQL Error.
 * @apiError 400 Bad request.
 *
 * @apiSuccessExample Success-Response:
 * {
 *    "status": 200,
 *    "error": null,
 *    "ascEleve": [
 *        {
 *          "idComp": 1,
 *           "libelleComp": "Reconnaître les couleurs",
 *           "notes": [
 *               {
 *                   "idEleve": 1,
 *                   "nomEleve": "Merveillau",
 *                   "prenomEleve": "Denis",
 *                   "score": 42,
 *                   "idComp": 1
 *               },
 *               {
 *                   "idEleve": 2,
 *                   "nomEleve": "Senouci",
 *                   "prenomEleve": "Elies",
 *                   "score": 12,
 *                   "idComp": 1
 *               }
 *           ]
 *        },
 *        {
 *           "idComp": 2,
 *           "libelleComp": "Resas",
 *           "notes": [
 *               {
 *                   "idEleve": 1,
 *                   "nomEleve": "Merveillau",
 *                   "prenomEleve": "Denis",
 *                   "score": 42,
 *                   "idComp": 1
 *               },
 *               {
 *                   "idEleve": 2,
 *                   "nomEleve": "Senouci",
 *                   "prenomEleve": "Elies",
 *                   "score": 12,
 *                   "idComp": 1
 *               }
 *           ]
 *        }
 *    ],
 *    "descNote": [
 *        {
 *          "idComp": 1,
 *           "libelleComp": "Reconnaître les couleurs",
 *           "notes": [
 *               {
 *                   "idEleve": 1,
 *                   "nomEleve": "Merveillau",
 *                   "prenomEleve": "Denis",
 *                   "score": 42,
 *                   "idComp": 1
 *               },
 *               {
 *                   "idEleve": 2,
 *                   "nomEleve": "Senouci",
 *                   "prenomEleve": "Elies",
 *                   "score": 12,
 *                   "idComp": 1
 *               }
 *           ]
 *        },
 *        {
 *           "idComp": 2,
 *           "libelleComp": "Resas",
 *           "notes": [
 *               {
 *                   "idEleve": 1,
 *                   "nomEleve": "Merveillau",
 *                   "prenomEleve": "Denis",
 *                   "score": 42,
 *                   "idComp": 1
 *               },
 *               {
 *                   "idEleve": 2,
 *                   "nomEleve": "Senouci",
 *                   "prenomEleve": "Elies",
 *                   "score": 12,
 *                   "idComp": 1
 *               }
 *           ]
 *        }
 *    ]
 * }
 */
router.get('/bySession/:idGP', function(req, res, next) {
  let idGP = req.params.idGP;
  if (typeof idGP != 'undefined') {
    let query1 = `SELECT gs.idEleve, e.nomEleve, e.prenomEleve, gs.score, gs.idComp FROM d_gamesScored AS gs, d_eleves AS e WHERE gs.idEleve = e.idEleve AND idGP = ${idGP} ORDER BY gs.idComp ASC, e.nomEleve ASC`;
    let query2 = `SELECT gs.idEleve, e.nomEleve, e.prenomEleve, gs.score, gs.idComp FROM d_gamesScored AS gs, d_eleves AS e WHERE gs.idEleve = e.idEleve AND idGP = ${idGP} ORDER BY gs.idComp ASC, gs.score DESC`;
    let query3 = `SELECT DISTINCT gs.idComp, c.libelleComp FROM d_gamesScored AS gs, d_competences AS c WHERE c.idComp = gs.idComp AND idGP = ${idGP} ORDER BY gs.idComp ASC`;
    let query4 = `SELECT DISTINCT (SELECT COUNT(CP.idComp) As nsComp FROM d_gamesPlayed AS GP, d_compGame AS CP WHERE GP.idGame = CP.idGame AND GP.idGP = ${idGP}) AS nbComp, COUNT(gs.idEleve) AS nbEleves FROM d_gamesScored AS gs WHERE gs.idGP = ${idGP} GROUP BY gs.idComp`;
    req.mysql.query(query1, function(error, results1) {
      if (error) {
        tools.dSend(res, 'NOK', 'ElevesStats', 'byGame', 500, error, null);
      } else {
        req.mysql.query(query2, function(error, results2) {
          if (error) {
            tools.dSend(res, 'NOK', 'ElevesStats', 'byGame', 500, error, null);
          } else {
            req.mysql.query(query3, function(error, results3) {
              if (error) {
                tools.dSend(
                  res,
                  'NOK',
                  'ElevesStats',
                  'byGame',
                  500,
                  error,
                  null
                );
              } else {
                req.mysql.query(query4, function(error, results4) {
                  if (error) {
                    tools.dSend(
                      res,
                      'NOK',
                      'ElevesStats',
                      'byGame',
                      500,
                      error,
                      null
                    );
                  } else {
                    let tab1 = new Array();
                    for (var i = 0; i < results4[0].nbComp; i++) {
                      let objNotes = new Array();
                      for (var j = 0; j < results1.length; j++) {
                        if (results1[j].idComp == results3[i].idComp) {
                          objNotes.push(results1[j]);
                        }
                      }
                      let obj = {
                        idComp: results3[i].idComp,
                        libelleComp: results3[i].libelleComp,
                        notes: objNotes
                      };
                      tab1.push(obj);
                    }

                    let tab2 = new Array();
                    for (var i = 0; i < results4[0].nbComp; i++) {
                      let objNotes = new Array();
                      for (var j = 0; j < results2.length; j++) {
                        if (results2[j].idComp == results3[i].idComp) {
                          objNotes.push(results2[j]);
                        }
                      }
                      let obj = {
                        idComp: results3[i].idComp,
                        libelleComp: results3[i].libelleComp,
                        notes: objNotes
                      };
                      tab2.push(obj);
                    }

                    tools.dLog(
                      'OK',
                      'ElevesStats',
                      'byGame',
                      200,
                      null,
                      '"ascEleve": ' + results1 + ', "descNote":' + results2
                    );
                    res.send(
                      JSON.stringify({
                        status: 200,
                        error: null,
                        ascEleve: tab1,
                        descNote: tab2
                      })
                    );
                  }
                });
              }
            });
          }
        });
      }
    });
  } else {
    tools.dSend(res, 'NOK', 'ElevesStats', 'byGame', 400, 'Bad Request.', null);
  }
});

/**
 * @api {get} /eleves/stats/byClasse/:idClasse Get games done by class
 * @apiName byClasse
 * @apiGroup ElevesStats
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token Token auth
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
 *            "nbJoueurs": 4,
 *            "date": "2019-03-14T18:04:51.000Z"
 *        }
 *    ]
 * }
 */
router.get('/byClasse/:idClasse', function(req, res, next) {
  let idClasse = req.params.idClasse;
  let query =
    'SELECT gp.idGP AS idGP, g.name AS nameGame, COUNT(DISTINCT gs.idEleve) AS nbJoueurs, gp.TimeStamp AS date FROM d_gamesPlayed AS gp, d_games AS g, d_gamesScored AS gs WHERE g.id = gp.idGame AND gp.idGP = gs.idGP AND gp.idClasse = ' +
    idClasse +
    ' AND gp.isPlayed = 1 GROUP BY gp.idGP ORDER BY gp.TimeStamp';

  req.mysql.query(query, function(error, results, fields) {
    if (error) {
      tools.dSend(res, 'NOK', 'ElevesStats', 'byClasse', 500, error, null);
    } else {
      tools.dLog(
        'OK',
        'ElevesStats',
        'byClasse',
        200,
        null,
        '"nbGamesPlayedBC": ' + results.length + ', "response":' + results
      );
      res.send(
        JSON.stringify({
          status: 200,
          error: null,
          nbGamesPlayedBC: results.length,
          response: results
        })
      );
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
 * @apiHeader {String} token Token auth
 * @apiParam {int} idEleve
 * @apiError 500 SQL Error.
 *
 * @apiSuccessExample Success-Response:
 *{
 *   "status": 200,
 *   "error": null,
 *   "response": [
 *       {
 *           "idGP": 183,
 *           "nameGame": "Invacouleur",
 *           "date": "2019-11-19T16:12:01.000Z",
 *           "notes": [
 *               {
 *                   "idComp": 1,
 *                   "libelleComp": "Reconnaître les couleurs",
 *                   "note": 33
 *               },
 *               {
 *                   "idComp": 2,
 *                   "libelleComp": "Reconnaître les lettres majuscules",
 *                   "note": 44
 *               }
 *           ]
 *       },
 *       {
 *           "idGP": 336,
 *           "nameGame": "Compteclasse",
 *           "date": "2019-12-05T00:14:25.000Z",
 *           "notes": [
 *               {
 *                   "idComp": 1,
 *                   "libelleComp": "Reconnaître les couleurs",
 *                   "note": 28
 *               },
 *               {
 *                   "idComp": 7,
 *                   "libelleComp": "Compter jusqu'à 20",
 *                   "note": 84
 *               },
 *               {
 *                   "idComp": 8,
 *                   "libelleComp": "Reconnaître des objets",
 *                   "note": 28
 *               },
 *               {
 *                   "idComp": 9,
 *                   "libelleComp": "Reconnaître des animaux",
 *                   "note": 98
 *               }
 *           ]
 *       }
 *   ]
 *}
 */

router.get('/gamesPlayed/:idEleve', async function(req, res, next) {
  let idEleve = req.params.idEleve;
  let query = `SELECT gp.idGP, g.name AS nameGame, gp.TimeStamp AS date
    FROM d_gamesPlayed AS gp, d_gamesScored AS gs, d_games AS g 
    WHERE gp.idGP = gs.idGP 
      AND gp.idGame = g.id 
      AND gs.idEleve = ${idEleve}
      AND gp.isPlayed = 1
    GROUP BY gp.idGP`;

  return req.mysql.query(query, async function(error, results, fields) {
    if (error) {
      tools.dSend(res, 'NOK', 'ElevesStats', 'gamesPlayed', 500, error, null);
    } else {
      let tab1 = new Array();
      for (let i = 0; i < results.length; i++) {
        let idGP = results[i].idGP;
        let objNotes = new Array();
        let query2 = `SELECT gs.idComp, c.libelleComp, gs.score AS note 
                          FROM d_gamesScored AS gs, d_gamesPlayed AS gp, d_competences AS c 
                          WHERE gs.idComp = c.idComp 
                            AND gs.idGP = gp.idGP 
                            AND gp.isPlayed = 1 
                            AND gs.idEleve = ${idEleve}
                            AND gs.idGP = ${idGP}`;
        const result = await req.mysql.query(query2);
        let obj = {
          idGP: results[i].idGP,
          nameGame: results[i].nameGame,
          date: results[i].date,
          notes: result[0]
        };
        tab1.push(obj);
      }
      tools.dSend(res, 'OK', 'ElevesStats', 'gamesPlayed', 200, null, tab1);
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
 * @apiHeader {String} token Token auth
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
  let idEleve = req.params.idEleve;
  let query =   `SELECT AVG(gs.score) AS moyenne, c.libelleComp AS labeltype, COUNT(gs.idGP) AS nbPlayed, 
                  (SELECT AVG(d_gamesScored.score) 
                  FROM d_gamesScored INNER JOIN d_eleves e ON e.idEleve = d_gamesScored.idEleve INNER JOIN d_elevesEcole ele ON ele.idEleve=e.idEleve 
                        WHERE ele.idEcole = ${req.currUser.idEcole} AND d_gamesScored.idComp = gs.idComp) AS moyenneClasse 
                        FROM d_gamesScored gs INNER JOIN d_competences c ON gs.idComp=c.idComp WHERE gs.idEleve = ${idEleve} AND gs.score IS NOT NULL GROUP BY gs.idComp`;

  req.mysql.query(query, function(error, results, fields) {
    if (error) {
      tools.dSend(res, 'NOK', 'ElevesStats', 'bulletin', 500, error, null);
    } else {
      let moyGen = 0;
      let moyGenClasse = 0;
      for (let k = 0 ; k < results.length ; k++) {
        let moyMat = results[k].moyenne;
        let moyClasse = results[k].moyenneClasse;
        moyGen += parseInt(moyMat);
        moyGenClasse += parseInt(moyClasse);
      }
      moyGen = moyGen / results.length;
      moyGenClasse = moyGenClasse / results.length;
      tools.dLog(
        'OK',
        'ElevesStats',
        'bulletin',
        200,
        null,
        '"response": ' +
          results +
          ', "moyenneGeneralEleve": ' +
          moyGen +
          ', "moyenneGeneraleClasse": ' +
          moyGenClasse
      );
      res.send(
        JSON.stringify({
          status: 200,
          error: null,
          response: results,
          moyenneGeneralEleve: moyGen,
          moyenneGeneraleClasse: moyGenClasse
        })
      );
    }
  });
});

/**
 * @api {get} /eleves/stats/getElevesRank Get the rank of the 10 best student of the current user
 * @apiName getElevesRank
 * @apiGroup ElevesStats
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token Token auth
 *
 * @apiSuccessExample Success-Response:
 * {
 *  "status":200,
 *  "error":null,
 *  "response":
 *    [
 *      {
 *          "score":70.3333,"idEleve":2
 *      },
 *      {
 *          "score":67.6667,"idEleve":4
 *      },
 *      {
 *          "score":57.4286,"idEleve":3
 *      },
 *      {
 *          "score":34,"idEleve":1
 *      }
 *    ]
 * }
 */

router.get('/getElevesRank', function(req, res, next) {
  if (req.currUser.typeUser === 1) {
    var query = `SELECT AVG(score) score, s.idEleve, e.nomEleve, e.prenomEleve FROM d_gamesScored s
      INNER JOIN d_eleves e ON e.idEleve=s.idEleve
      INNER JOIN d_classeEleve ce ON ce.idEleve=s.idEleve
      INNER JOIN d_profsAppClasse pc ON pc.idClasse=ce.idClasse
      WHERE pc.idProf= ${req.currUser.idUser}
      GROUP BY ce.idEleve
      ORDER BY score DESC`;
  } else if (req.currUser.typeUser === 2) {
    var query = `SELECT AVG(score) score, s.idEleve, el.nomEleve, el.prenomEleve FROM d_gamesScored s
      INNER JOIN d_eleves el ON el.idEleve=s.idEleve
      INNER JOIN d_classeEleve ce ON ce.idEleve=s.idEleve
      INNER JOIN d_classeEcole e ON e.idClasse=ce.idClasse
      WHERE e.idEcole= ${req.currUser.idEcole}
      GROUP BY ce.idEleve
      ORDER BY score DESC
      LIMIT 10`;
  }

  req.mysql.query(query, function(error, results, fields) {
    if (error) {
      tools.dSend(res, 'NOK', 'ElevesStats', 'getElevesRank', 500, error, null);
    } else {
      tools.dSend(
        res,
        'OK',
        'ElevesStats',
        'getElevesRank',
        200,
        null,
        results
      );
    }
  });
});

/**
 * @api {get} /eleves/stats/getClassesAvg Get the average of all classes of the professor
 * @apiName getClassesAvg
 * @apiGroup ElevesStats
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token Token auth
 *
 * @apiSuccessExample Success-Response:
 * {
 *      "status":200,
 *      "error":null,
 *      "response":[
 *          {
 *              "moyenne":59.3913,
 *              "level":4,
 *              "num":1
 *          },
 *          {
 *              "moyenne":100,
 *              "level":5,
 *              "num":1
 *          }
 *     ]
 * }
 */

router.get('/getClassesAvg', function(req, res, next) {
  if (req.currUser.typeUser === 1) {
    var query = `SELECT AVG(s.score) as moyenne, cl.level, cl.num FROM d_gamesScored s
      INNER JOIN d_classeEleve ce ON ce.idEleve=s.idEleve
      INNER JOIN d_classe cl ON cl.idClasse=ce.idClasse
      INNER JOIN d_profsAppClasse ap ON ap.idClasse=cl.idClasse
      WHERE ap.idProf= ${req.currUser.idUser}
      GROUP BY cl.idClasse`;
  } else if (req.currUser.typeUser === 2) {
    var query = `SELECT AVG(s.score) as moyenne, cl.level, cl.num FROM d_gamesScored s
      INNER JOIN d_classeEleve ce ON ce.idEleve=s.idEleve
      INNER JOIN d_classe cl ON cl.idClasse=ce.idClasse
      INNER JOIN d_classeEcole ceo ON ceo.idClasse=cl.idClasse
      WHERE ceo.idEcole= ${req.currUser.idEcole}
      GROUP BY cl.idClasse`;
  }

  req.mysql.query(query, function(error, results, fields) {
    if (error) {
      tools.dSend(res, 'NOK', 'ElevesStats', 'getElevesRank', 500, error, null);
    } else {
      tools.dSend(
        res,
        'OK',
        'ElevesStats',
        'getElevesRank',
        200,
        null,
        results
      );
    }
  });
});

/**
 * @api {get} /eleves/stats/getComps/:idEleve Get competences games played by a studient
 * @apiName getComps
 * @apiGroup ElevesStats
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token Token auth
 * @apiParam {int} idEleve
 * @apiError 500 SQL Error.
 *
 * @apiSuccessExample Success-Response:
 * {
 *    "status": 200,
 *    "error": null,
 *    "response": [
 *        {
 *            "idComp": 1,
 *            "libelleComp": "Logique"
 *        },
 *        {
 *            "idComp": 2,
 *            "libelleComp": "Mathématiques"
 *        }
 *    ]
 * }
 */

router.get('/getComps/:idEleve', function(req, res, next) {
  let idEleve = req.params.idEleve;
  let query = `SELECT c.idComp, c.libelleComp
  FROM d_gamesScored AS gs, d_competences AS c
  WHERE gs.idComp = c.idComp AND gs.idEleve =  ${idEleve} AND gs.score > -1 GROUP BY c.idComp`;

  req.mysql.query(query, function(error, results, fields) {
    if (error) {
      tools.dSend(res, 'NOK', 'ElevesStats', 'getComps', 500, error, null);
    } else {
      tools.dSend(res, 'OK', 'ElevesStats', 'getComps', 200, null, results);
    }
  });
});

/**
 * @api {get}  /eleves/stats/getGamesByCompEleve/:idEleve/:idComp Get games played by a student for one competence
 * @apiName getGamesByCompEleve
 * @apiGroup ElevesStats
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token Token auth
 * @apiParam {int} idEleve
 * @apiParam {int} idComp
 * @apiError 500 SQL Error.
 *
 * @apiSuccessExample Success-Response:
 *{
 *   "status": 200,
 *   "error": null,
 *   "response": [
 *       {
 *           "idGP": 183,
 *           "nameGame": "Invacouleur",
 *           "date": "2019-11-19T16:12:01.000Z",
 *           "notes": [
 *               {
 *                   "idComp": 1,
 *                   "libelleComp": "Reconnaître les couleurs",
 *                   "note": 33
 *               }
 *           ]
 *       },
 *       {
 *           "idGP": 336,
 *           "nameGame": "Compteclasse",
 *           "date": "2019-12-05T00:14:25.000Z",
 *           "notes": [
 *               {
 *                   "idComp": 1,
 *                   "libelleComp": "Reconnaître les couleurs",
 *                   "note": 28
 *               }
 *           ]
 *       }
 *   ]
 *}
 */

router.get('/getGamesByCompEleve/:idEleve/:idComp', function(req, res, next) {
  let idEleve = req.params.idEleve,
    idComp = req.params.idComp;
  let query = `SELECT gp.idGP, g.name AS nameGame, gp.TimeStamp AS date
    FROM d_gamesPlayed AS gp, d_gamesScored AS gs, d_games AS g 
    WHERE gp.idGP = gs.idGP 
      AND gp.idGame = g.id 
      AND gs.idComp = ${idComp}
      AND gs.idEleve = ${idEleve}
      AND gp.isPlayed = 1
    GROUP BY gp.idGP`;

  return req.mysql.query(query, async function(error, results, fields) {
    if (error) {
      tools.dSend(res, 'NOK', 'ElevesStats', 'gamesPlayed', 500, error, null);
    } else {
      let tab1 = new Array();
      for (let i = 0; i < results.length; i++) {
        let idGP = results[i].idGP;
        let objNotes = new Array();
        let query2 = `SELECT gs.idComp, c.libelleComp, gs.score AS note 
                          FROM d_gamesScored AS gs, d_gamesPlayed AS gp, d_competences AS c 
                          WHERE gs.idComp = c.idComp 
                            AND gs.idGP = gp.idGP 
                            AND gp.isPlayed = 1 
                            AND gs.idComp = ${idComp}
                            AND gs.idEleve = ${idEleve}
                            AND gs.idGP = ${idGP}`;
        const result = await req.mysql.query(query2);
        let obj = {
          idGP: results[i].idGP,
          nameGame: results[i].nameGame,
          date: results[i].date,
          notes: result[0]
        };
        tab1.push(obj);
      }
      tools.dSend(res, 'OK', 'ElevesStats', 'gamesPlayed', 200, null, tab1);
    }
  });
});

module.exports = router;