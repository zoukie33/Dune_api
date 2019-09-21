var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var md5 = require('MD5');
var jwt = require('jsonwebtoken');
var config = require('../../../config');
var tools = require('../../../functions/tools');

/**
 * @api {get} /table/licences/verif/:licence Verifying the licence
 * @apiName verif
 * @apiGroup Table-Licence
 * @apiPermission notLogged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token TokenTable auth
 * @apiParam {String} licence
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "error": null,
 *     "response": [
 *        {
 *            "idLicence": 20,
 *            "idEcole": 1,
 *            "serial": "7CCK-METF-SSFW-7RZ8",
 *            "used": 1,
 *            "dateExpire": "2020-04-23T15:16:20.000Z"
 *        }
 *    ]
 * }
 */

router.get('/verif/:licence', function(req, res, next) {
  var query =
    'SELECT * FROM ?? AS lt WHERE lt.serial = ? AND lt.dateExpire > NOW()';
  var data = ['d_licencesTables', req.params.licence];
  query = mysql.format(query, data);

  req.mysql.query(query, function(error, results, fields) {
    if (error) {
      tools.dSend(res, 'NOK', 'Table-Licence', 'verif', 500, error, null);
    } else {
      if (results.length == 1) {
        tools.dSend(res, 'OK', 'Table-Licence', 'verif', 200, null, results);
      } else {
        tools.dSend(
          res,
          'NOK',
          'Table-Licence',
          'verif',
          500,
          'Licence Expirée',
          null
        );
      }
    }
  });
});

/**
 * @api {post} /table/licences/validate/ Validating the licence
 * @apiName validate
 * @apiGroup Table-Licence
 * @apiPermission notLogged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token TokenTable auth
 * @apiParam {String} licence
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "error": null,
 *     "response": "Licence validated"
 * }
 */

router.post('/validate/', function(req, res, next) {
  var licence = req.body.licence;
  var idTable = req.currUser.idTable;
  var query =
    "SELECT * FROM d_licencesTables AS lt WHERE lt.serial = '" +
    licence +
    "' AND lt.dateExpire > NOW() AND lt.used = 0";
  var query1 =
    "UPDATE d_licencesTables SET used = 1 WHERE serial = '" + licence + "'";

  req.mysql.query(query, function(error, results, fields) {
    if (error) {
      tools.dSend(res, 'NOK', 'Table-Licence', 'Validate', 500, error, null);
    } else {
      if (results.length == 1) {
        req.mysql.query(
          'UPDATE d_tables SET idSerial = ' +
            results[0].idLicence +
            ' WHERE idTable = ' +
            idTable,
          function(error, results1, fields) {
            if (error) {
              tools.dSend(
                res,
                'NOK',
                'Table-Licence',
                'Validate',
                500,
                error,
                null
              );
            } else {
              req.mysql.query(query1, function(error, results, fields) {
                if (error) {
                  tools.dSend(
                    res,
                    'NOK',
                    'Table-Licence',
                    'Validate',
                    500,
                    error,
                    null
                  );
                } else {
                  tools.dSend(
                    res,
                    'OK',
                    'Table-Licence',
                    'Validate',
                    200,
                    null,
                    'Licence validated'
                  );
                }
              });
            }
          }
        );
      } else {
        tools.dSend(
          res,
          'NOK',
          'Table-Licence',
          'Validate',
          500,
          'Licence Expirée',
          null
        );
      }
    }
  });
});
module.exports = router;
