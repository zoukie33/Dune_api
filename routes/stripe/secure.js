var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var tools = require('../../functions/tools');
var md5 = require('MD5');
const stripe = require('stripe')('sk_test_x28sxZXrTkZlaoGNujXlYGNk');

/**
 * @api {post} /stripe/secure/createStripeCustomer Create customer in stripe
 * @apiName verifPassword
 * @apiGroup Facturation
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token Token auth
 * @apiParam {String} password Password de l'utilisateur.
 * @apiError 500 SQL Error.
 *
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "error": null,
 *     "response": "Password Valid"
 * }
 */
router.post('/add', function(req, res, next) {
  stripe.customers.create(
    {
      address: req.body.address,
      balance: 0,
      description: 'Account for ' + req.body.ecoleName + ' school.',
      email: req.body.email,
      source: 'tok_mastercard' // obtained with Stripe.js
    },
    function(err, customer) {
      // asynchronously called
    }
  );
});

module.exports = router;
