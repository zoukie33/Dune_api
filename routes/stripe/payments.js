var mysql = require('mysql');
var tools = require('../../functions/tools');
var express = require('express');
var router = express.Router();
var stripe = require('../../functions/stripe');

/**
 * @api {post} /addMethod Create a payment method for a customer
 * @apiName Stripe
 * @apiGroup Stripe
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {token} pm_id Token retourné par Stripe avant l'appel à l'API. Securise les datas de la carte.
 * @apiDescription Route permettant de créer un moyen de paiement pour un directeur
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "error": null,
 *     "response": [
 *        {
 *          "Paiement crée !"
 *        }
 *    ]
 * }
 */
router.post('/addMethod', function(req, res, next) {
  var idEcole = req.currUser.idEcole;
  var pm_id = req.body.pm_id;
  var customer = null;

  console.log(pm_id);
  var query = 'SELECT id_customer FROM d_ecole WHERE id=' + idEcole;

  req.mysql.query(query, function(error, results, fields) {
    if (error) {
      tools.dSend(res, 'NOK', 'Stripe', 'addMethod', 500, error, null);
    } else {
      customer = results[0].id_customer;
      if (
        stripe.attachPaymentMethod(req, res, {
          pm_id: pm_id,
          customer: customer
        })
      ) {
      } else {
      }
    }
  });
});

module.exports = router;
