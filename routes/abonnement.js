var express = require('express');
var mysql = require('mysql');
var serial = require('generate-serial-key');
var router = express.Router();
var filez = require('../functions/files/files');
var tools = require('../functions/tools');
var stripe = require('../functions/stripe');

/**
 * @api {post} /abonnement/subscribe Subscribing to an abonnement
 * @apiName subscribe
 * @apiGroup Abonnement
 * @apiPermission Logged
 * @apiVersion 1.0.0
 * @apiDescription Route permettant de souscrire à un abonnement.
 * @apiParam {Int} typeAbo Type d'abonnement (1 ou 2)
 * @apiHeader {String} token auth
 */

router.post('/subscribe', function(req, res, next) {
  var queryCustomer =
    'SELECT id_customer FROM d_ecole WHERE id=' + req.currUser.idEcole;

  req.mysql.query(queryCustomer, function(error, results, fields) {
    if (error) {
      tools.dSend(
        res,
        'NOK',
        'Abonnement',
        'subscribe',
        500,
        error,
        "Can't get id customer"
      );
    } else {
      customer = results[0].id_customer;

      let ret = stripe.createSub(req, res, { customer: customer });
    }
  });
});

/**
 * @api {get} /abonnement/endSub Deleting a Subscription
 * @apiName endSub
 * @apiGroup Abonnement
 * @apiPermission Logged
 * @apiVersion 1.0.0
 * @apiDescription Route permettant d'annuler l'abonnement d'une école.
 *
 * @apiHeader {String} token auth
 */

router.get('/endSub', function(req, res, next) {
  var idEcole = req.currUser.idEcole;

  var query = 'UPDATE d_abonnement SET isActive = 0 WHERE idEcole = ' + idEcole;

  req.mysql.query(query, function(error, results, fields) {
    if (error) {
      tools.dSend(res, 'NOK', 'Abonnement', 'endSub', 500, error, null);
    } else {
      tools.dSend(
        res,
        'OK',
        'Abonnement',
        'endSub',
        200,
        null,
        'Abonnement Annulé'
      );
    }
  });
});

/**
 * @api {get} /abonnement/getSub Getting a Subscription information
 * @apiName getSub
 * @apiGroup Abonnement
 * @apiPermission Logged
 * @apiVersion 1.0.0
 * @apiDescription Route permettant de récupérer les informations d'un abonnement.
 *
 * @apiHeader {String} token auth
 */

router.get('/getSub', function(req, res, next) {
  var idEcole = req.currUser.idEcole;

  var query =
    'SELECT typeAbo, status FROM d_abonnement WHERE idEcole = ' + idEcole;

  req.mysql.query(query, function(error, results, fields) {
    if (error) {
      tools.dSend(res, 'NOK', 'Abonnement', 'getSub', 500, error, null);
    } else {
      tools.dSend(res, 'OK', 'Abonnement', 'getSub', 200, null, results);
    }
  });
});
module.exports = router;
