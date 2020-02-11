const express = require('express');
const mysql = require('mysql2');
const router = express.Router();
const tools = require('../../functions/tools');

/**
 * @api {get} /facturation/getFactures/ Get all Bills from a school
 * @apiName getFactures
 * @apiGroup Facturation
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token Token auth
 * @apiError 500 SQL Error.
 * @apiError 400 Bad Request.
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
router.get('/getFactures', function(req, res, next) {
  let idEcole = req.currUser.idEcole;
  if (typeof idEcole != 'undefined') {
    let query =
      'SELECT f.idFacture AS id, f.entity_name AS name, ' +
      'f.prixHT AS montant_ht, f.prixTTC AS montant_ttc,' +
      '(CASE ' +
      "WHEN f.typeFacture=1 THEN 'Abonnement' " +
      "WHEN f.typeFacture=2 THEN 'Application' " +
      'END) AS type, ' +
      "DATE_FORMAT(f.date, '%d/%m/%Y')  AS date, " +
      '(CASE ' +
      "WHEN f.paid=1 THEN 'Payée' " +
      "WHEN f.paid=0 THEN 'En attente'" +
      'END) AS status, ' +
      '(CASE ' +
      'WHEN f.free_app=1 THEN "Incluse dans l\'abonnement" ' +
      'WHEN f.free_app=0 THEN "Non incluse dans l\'abonnement" ' +
      'END) AS detail ' +
      'FROM ?? AS f ' +
      'WHERE idEcole = ? ' +
      'ORDER BY f.date DESC';

    let data = ['d_facturation', idEcole];
    query = mysql.format(query, data);
    req.mysql.query(query, function(error, results, fields) {
      if (error) {
        tools.dSend(res, 'NOK', 'Facturation', 'getFactures', 500, error, null);
      } else {
        tools.dSend(
          res,
          'OK',
          'Facturation',
          'getFactures',
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
      'Facturation',
      'getFactures',
      400,
      'Bad Request',
      null
    );
  }
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
  let query = 'SELECT * FROM ?? WHERE idFacture = ?';
  let data = ['d_facturation', req.params.idFacture];
  query = mysql.format(query, data);
  req.mysql.query(query, function(error, results, fields) {
    if (error) {
      tools.dSend(res, 'NOK', 'Facturation', 'getFacture', 500, error, null);
    } else {
      if (typeof results[0] != 'undefined') {
        let query = 'SELECT * FROM ?? WHERE id = ?';
        let data = ['d_ecole', results[0].idEcole];
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
            let ret = {
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
      } else {
        tools.dSend(
          res,
          'NOK',
          'Facturation',
          'getFacture',
          400,
          'idEcole is undefined',
          null
        );
      }
    }
  });
});

module.exports = router;
