var express = require('express');
var mysql = require('mysql2');
var router = express.Router();
var md5 = require('MD5');
var jwt = require('jsonwebtoken');
var config = require('../../config');
var tools = require('../../functions/tools');

/**
 * @api {post} /cnxTable/genToken Generating a token Table
 * @apiName genToken
 * @apiGroup Table
 * @apiPermission notLogged
 * @apiVersion 1.0.0
 *
 * @apiSuccess {String} tokenTable Token de connexion.
 * @apiSuccessExample Success-Response:
 * {
 *    "status": 200,
 *    "error": null,
 *    "tokenTable": "07d0cd6468bb33e519a84f5556b795c1"
 * }
 *
 * @apiError 500 SQL Error.
 * @apiError 400 Bad Request.
 * @apiParam {Int} idTable
 * @apiDescription Route permettant la génération d'un token de connexion à la table.
 */

router.post('/genToken', function(req, res, next) {
  var tokenTable = md5(Date.now());
  var idTable = req.body.idTable;
  if (typeof idTable != 'undefined') {
    var query = 'INSERT INTO ?? (tokenTable, idTable) VALUES (?, ?)';
  var data = ['d_tableProf', tokenTable, idTable];
  query = mysql.format(query, data);
  if (!isNaN(idTable)) {
    req.mysql.query(query, function(error, results, fields) {
      if (error) {
        tools.dSend(
          res,
          'NOK',
          'Table',
          '/cnxTable/genToken',
          500,
          error,
          null
        );
      } else {
        tools.dLog(
          'OK',
          'Table',
          '/cnxTable/genToken',
          200,
          null,
          '"tokenTable": tokenTable'
        );
        res.send(
          JSON.stringify({ status: 200, error: null, tokenTable: tokenTable })
        );
      }
    });
  } else {
    tools.dSend(
      res,
      'NOK',
      'Table',
      '/cnxTable/genToken',
      400,
      'Bad Request',
      null
    );
  }
  } else {
    tools.dSend(
      res,
      'NOK',
      'Table',
      '/cnxTable/genToken',
      400,
      'Bad Request',
      null
    );
  }
});

/**
 * @api {delete} /cnxTable/delToken/:tokenTable Deleting a token Table
 * @apiName delToken
 * @apiGroup Table
 * @apiPermission notLogged
 * @apiVersion 1.0.0
 *
 * @apiSuccessExample Success-Response:
 * {
 *    "status": 200,
 *    "error": null,
 *    "response": "Token deleted : 1354d30e4a461c7c67be73139e95ff61"
 * }
 * @apiError 500 SQL Error.
 * @apiError 400 Bad Request.
 * @apiParam {String} tokenTable
 */

router.delete('/delToken/:tokenTable', function(req, res, next) {
  var tokenTable = req.params.tokenTable;
  if (typeof tokenTable != 'undefined' && tokenTable.length == 32) {
    let query = 'DELETE FROM ?? WHERE tokenTable = ?';
    let data = ['d_tableProf', tokenTable];
    query = mysql.format(query, data);
    req.mysql.query(query, function(error, results, fields) {
      if (error) {
        tools.dSend(
          res,
          'NOK',
          'Table',
          '/cnxTable/delToken',
          500,
          error,
          null
        );
      } else {
        tools.dSend(
          res,
          'OK',
          'Table',
          '/cnxTable/delToken',
          200,
          null,
          'Token deleted : ' + tokenTable
        );
      }
    });
  } else {
    tools.dSend(
      res,
      'NOK',
      'Table',
      '/cnxTable/delToken',
      400,
      'Bad Request',
      null
    );
  }
});

/**
 * @api {get} /cnxTable/verifToken/:tokenTable Verifying a token Table
 * @apiName verifToken
 * @apiGroup Table
 * @apiPermission notLogged
 * @apiVersion 1.0.0
 *
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "idProf": 1,
 *     "token": letoken
 * }
 * @apiError 500 SQL Error.
 * @apiError 400 Bad Request.
 * @apiError 202 Token pas encore utilisé
 * @apiParam {String} tokenTable Token de la table à vérifier.
 */

router.get('/verifToken/:tokenTable', function(req, res, next) {
  var token = req.params.tokenTable;
  if (typeof token != 'undefined' && token.length === 32) {
    let query = 'SELECT idProf, idTable FROM ?? WHERE tokenTable = ?';
    let data = ['d_tableProf', token];
    query = mysql.format(query, data);
    req.mysql.query(query, function(error, results, fields) {
      if (error) {
        tools.dSend(
          res,
          'NOK',
          'Table',
          '/cnxTable/verifToken',
          500,
          error,
          null
        );
      } else {
        if (results.length > 0) {
          let idProf = results[0].idProf;
          if (idProf == 0) {
            tools.dSend(
              res,
              'NOK',
              'Table',
              '/cnxTable/verifToken',
              202,
              'Token pas encore utilisé : ' + token,
              null
            );
          } else if (idProf > 0) {
            let query2 = 'SELECT * FROM ?? WHERE idUser = ?';
            let data = ['d_users', idProf];
            query2 = mysql.format(query2, data);
            let idTable = results[0].idTable;
            req.mysql.query(query2, function(error, prof, fields) {
              if (error) {
                tools.dSend(
                  res,
                  'NOK',
                  'Table',
                  '/cnxTable/verifToken',
                  500,
                  error,
                  'Récupération des informations du prof'
                );
              } else {
                let query3 = 'SELECT idEcole FROM ?? as a WHERE a.idProf = ?';
                let data = ['d_profsAppEcole', idProf];
                query3 = mysql.format(query3, data);
                req.mysql.query(query3, function(error, resu) {
                  if (error) {
                    tools.dSend(
                      res,
                      'NOK',
                      'Table',
                      '/cnxTable/verifToken',
                      500,
                      error,
                      'Récupération des informations du prof2'
                    );
                  } else {
                    idEcole = resu[0].idEcole;
                    let authToken = jwt.sign(
                      {
                        idUser: idProf,
                        typeUser: prof[0].typeUser,
                        emailUser: prof[0].emailUser,
                        idEcole: idEcole,
                        idTable: idTable,
                        perm: 4
                      },
                      config.secret,
                      { expiresIn: '7d' }
                    );
                    let query4 =
                      'UPDATE ?? SET access_token = ? WHERE idTable = ?';
                    let data = ['d_tables', authToken, idTable];
                    query4 = mysql.format(query4, data);
                    req.mysql.query(query4, function(error, resu) {
                      if (error) {
                        tools.dSend(
                          res,
                          'NOK',
                          'Table',
                          '/cnxTable/verifToken',
                          500,
                          error,
                          'Envoi du token dans la bdd'
                        );
                      } else {
                        res.send(
                          JSON.stringify({
                            status: 200,
                            idProf: idProf,
                            token: authToken
                          })
                        );
                        tools.dLog(
                          'OK',
                          'Table',
                          '/cnxTable/verifToken',
                          200,
                          null,
                          '"idProf":' + idProf + '"token": ' + authToken
                        );
                      }
                    });
                  }
                });
              }
            });
          }
        }
      }
    });
  } else {
    tools.dSend(
      res,
      'NOK',
      'Table',
      '/cnxTable/verifToken',
      400,
      'Bad Request',
      null
    );
  }
});

/**
 * @api {post} /cnxTable/install Installing a new Table
 * @apiName install
 * @apiGroup Table
 * @apiPermission notLogged
 * @apiVersion 1.0.0
 *
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "idTable": 1,
 *     "response": "Table Installed"
 * }
 * @apiError 500 SQL Error.
 * @apiError 400 Bad Request.
 * @apiParam {String} licence Licence à attribuer à la table.
 * @apiParam {String} nom Nom de la table à installer.
 */

router.post('/install', function(req, res, next) {
  var licenceEcole = req.body.licence;
  var nomTable = req.body.nom;
  if (
    typeof licenceEcole != 'undefined' &&
    typeof nomTable != 'undefined' &&
    licenceEcole.length === 19
  ) {
    let query = 'SELECT * FROM ?? AS l WHERE l.serial = ?';
    let query2 = 'UPDATE ?? SET used = 1 WHERE serial = ?';
    let data = ['d_licencesTables', licenceEcole];
    query = mysql.format(query, data);
    query2 = mysql.format(query2, data);

    req.mysql.query(query, function(error, results, fields) {
      if (error) {
        tools.dSend(res, 'NOK', 'Table', '/cnxTable/install', 500, error, null);
      } else {
        if (results.length != 0) {
          if (results[0].used != 1) {
            req.mysql.query(
              "INSERT INTO d_tables (nomTable, access_token, idSerial) VALUES ('" +
                nomTable +
                "', 'NULL', " +
                results[0].idLicence +
                ')',
              function(error, results2, fields) {
                if (error) {
                  tools.dSend(
                    res,
                    'NOK',
                    'Table',
                    '/cnxTable/install',
                    500,
                    error,
                    null
                  );
                } else {
                  let idTable = results2.insertId;
                  req.mysql.query(query2, function(error, results, fields) {
                    if (error) {
                      tools.dSend(
                        res,
                        'NOK',
                        'Table',
                        '/cnxTable/install',
                        500,
                        error,
                        null
                      );
                    } else {
                      
                      res
                      .status(200)
                      .send(JSON.stringify({ status: 200, error: null, idTable: idTable }));
                    }
                  });
                }
              }
            );
          } else {
            tools.dSend(
              res,
              'NOK',
              'Table',
              '/cnxTable/install',
              401,
              'Licence déjà utilisée.',
              null
            );
          }
        } else {
          tools.dSend(
            res,
            'NOK',
            'Table',
            '/cnxTable/install',
            401,
            'Licence Not found.',
            null
          );
        }
      }
    });
  } else {
    tools.dSend(
      res,
      'NOK',
      'Table',
      '/cnxTable/install',
      400,
      'Bad Request',
      null
    );
  }
});
module.exports = router;
