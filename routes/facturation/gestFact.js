var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var tools = require('../../functions/tools');
var md5 = require('MD5');

/**
 * @api {get} /facturation/getFactures/:idEcole Get all Bills from a school
 * @apiName getFactures
 * @apiGroup Facturation
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token Token auth
 * @apiParam {Int} idEcole Id de l'école en question
 * @apiError 500 SQL Error.
 *
 * @apiSuccessExample Success-Response:
 * {
 *  "status": 200,
 *    "error": null,
 *    "response": [
 *        {
 *            "idFacture": 1,
 *            "idEcole": 1,
 *            "typeFacture": 2,
 *            "date": "2019-08-24T20:40:37.000Z",
 *            "prixHT": 80,
 *            "prixTTC": 100,
 *            "paid": 0
 *        }
 *    ]
 * }
 */
router.get('/getFactures/:idEcole', function(req, res, next) {
  var query = 'SELECT * FROM ?? WHERE idEcole = ?';
  var data = ['d_facturation', req.params.idEcole];
  query = mysql.format(query, data);

  req.mysql.query(query, function(error, results, fields) {
    if (error) {
      tools.dSend(res, 'NOK', 'Facturation', 'getFactures', 500, error, null);
    } else {
      tools.dSend(res, 'OK', 'Facturation', 'getFactures', 200, null, results);
    }
  });
});

/**
 * @api {get} /facturation/getFacture/:idFacture Get precises data from a facture
 * @apiName getFacure
 * @apiGroup Facturation
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token Token auth
 * @apiParam {Int} idFacture Id de la facture voulue
 * @apiError 500 SQL Error.
 *
 * @apiSuccessExample Success-Response:
 * {
 *  "status": 200,
 *    "error": null,
 *    "response": {
 *        "idFacture": 1,
 *        "typeFacture": 2,
 *        "dateFacture": "2019-08-24T20:40:37.000Z",
 *        "prixHT": 80,
 *        "prixTTC": 100,
 *        "paid": 0,
 *        "nomEcole": "Sainte-Marie: Grand Lebrun",
 *        "rueEcole": "Rue de l'école normale",
 *        "numRueEcole": 4,
 *        "villeEcole": "Bordeaux",
 *        "departementEcole": "Aquitaine",
 *        "telEcole": "0603874206"
 *    }
 * }
 */

router.get('/getFacture/:idFacture', function(req, res, next) {
  var query = 'SELECT * FROM ?? WHERE idFacture = ?';
  var data = ['d_facturation', req.params.idFacture];
  query = mysql.format(query, data);

  req.mysql.query(query, function(error, results, fields) {
    if (error) {
      tools.dSend(res, 'NOK', 'Facturation', 'getFacture', 500, error, null);
    } else {
      var query = 'SELECT * FROM ?? WHERE id = ?';
      var data = ['d_ecole', results[0].idEcole];
      query = mysql.format(query, data);

      req.mysql.query(query, function(error, results2, fields) {
        if (error) {
          tools.dSend(
            res,
            'NOK',
            'Facturation',
            'getFacture',
            500,
            error,
            null
          );
        } else {
          var ret = {
            idFacture: results[0].idFacture,
            typeFacture: results[0].typeFacture,
            dateFacture: results[0].date,
            prixHT: results[0].prixHT,
            prixTTC: results[0].prixTTC,
            paid: results[0].paid,
            nomEcole: results2[0].nomEcole,
            rueEcole: results2[0].rue,
            numRueEcole: results2[0].numRue,
            villeEcole: results2[0].ville,
            departementEcole: results2[0].departement,
            mailEcole: results2[0].mail,
            telEcole: results2[0].tel
          };
          tools.dSend(res, 'OK', 'Facturation', 'getFacture', 200, null, ret);
        }
      });
    }
  });
});

module.exports = router;
