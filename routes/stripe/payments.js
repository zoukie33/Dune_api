var mysql = require('mysql2');
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
  if (req.currUser.typeUser !== 2){
    tools.dSend(
        res,
        'NOK',
        'Abonnement',
        'subscribe',
        403,
        'Unauthorized',
        'Vous n\'avez pas les droits nécéssairec pour effectuer cette action.'
    );
  } else {
    var idEcole = req.currUser.idEcole;
    var pm_id = req.body.pm_id;
    var customer = null;

    var query = 'SELECT id_customer FROM d_ecole WHERE id=' + idEcole;

    req.mysql.query(query, function (error, results, fields) {
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
  }
});

/**
 * @api {post} /store/buyAppCheckout Create checkout session for buying an app
 * @apiName buyAppCheckout
 * @apiGroup Store
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {Int} idApp Id de l'application demandée.
 * @apiParam {Array} items note donnée par l'utilisateur.
 *
 * @apiDescription Route permettant la création d'une session d'achat pour une app.

 */

router.post('/buyAppCheckout', function(req, res, next) {

  if (req.currUser.typeUser !== 2){
    tools.dSend(
        res,
        'NOK',
        'Abonnement',
        'subscribe',
        403,
        'Unauthorized',
        'Vous n\'avez pas les droits nécéssairec pour effectuer cette action.'
    );
  } else {
    let idApp = req.body.idApp;
    let items = req.body.items;
    const idEcole = req.currUser.idEcole;
    var queryCustomer =
        'SELECT id_customer FROM d_ecole WHERE id=' + req.currUser.idEcole;

    req.mysql.query(queryCustomer, function (error, results, fields) {
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

        stripe.checkoutSession(items, customer, idApp, res, idEcole, req);
      }
    });
  }
});

module.exports = router;
