var express = require('express');
var mysql = require('mysql2');
var tools = require('./tools');
var md5 = require('MD5');
const stripe = require('stripe')('sk_test_x28sxZXrTkZlaoGNujXlYGNk');
var licences = require('../functions/licences');
const licencesMail = require('../functions/mails/licences');

exports.addCustomer = function(req, res, datas) {
  stripe.customers.create(
    {
      address: { line1: datas.address },
      balance: 0,
      description: 'Account for ' + datas.ecoleName + ' school.',
      email: datas.email
    },
    function(err, customer) {
      if (err) {
        tools.dSend(res, 'NOK', 'Stripe/customer', 'add', 500, err, 'KO');
      } else {
        let _customer_id = customer.id;
        var query = 'UPDATE ?? SET id_customer = ? WHERE id = ?';
        var data = ['d_ecole', _customer_id, datas.idEcole];
        query = mysql.format(query, data);
        req.mysql.query(query, function(error, results, fields) {
          if (error) {
            return false;
          } else {
            return true;
          }
        });
      }
    }
  );
};

exports.attachPaymentMethod = function(req, res, datas) {
  stripe.paymentMethods.attach(
    datas.pm_id,
    { customer: datas.customer },
    function(err, paymentMethod) {
      if (err) {
        tools.dSend(res, 'NOK', 'Stripe', 'addMethod', 500, err, null);
      } else {
        stripe.customers.update(
            datas.customer,
            {invoice_settings: {default_payment_method:  datas.pm_id}},
            function(err, customer) {
              if (err) {
                tools.dSend(res, 'NOK', 'Stripe', 'addMethod', 500, err, null);
              } else {
                tools.dSend(res, 'OK', 'Stripe', 'addMethod', 200, null, {
                  response: 'Paiement crée !'
                });
              }
            }
        );
      }
    }
  );
};

exports.createSub = function(req, res, datas) {
  const abo =
    req.body.idAbo === 1
      ? 'plan_G8TthexRqhE6Za'
      : req.body.idAbo === 2
      ? 'plan_G8TuHPEtYqj7UL'
      : 'null';
  const quantitiy = req.body.quantity;
  let remise_id = null;

  if (quantitiy > 1 && quantitiy < 5){
      remise_id = 'VumaN8dN';
  } else if (quantitiy >= 5){
      remise_id = 'XiRgpZh4';
  }

  stripe.subscriptions.create(
    {
        customer: datas.customer,
        coupon: remise_id,
        items: [
        {
            plan: abo,
            quantity: quantitiy
        }
      ]
    },
    function(error, subscription) {
      if (error) {
          tools.dSend(res, "NOK", "Abonnement/Stripe", "subscribe", 200, error, error.code);
      } else {
        let querySub = 'INSERT INTO ?? SET id_abonnement = ?, id_abo_stripe = ?, status = ?, id_ecole = ? ON DUPLICATE KEY UPDATE id_abonnement = ?, id_abo_stripe = ?, status=1';

          let data = ['d_abonnement_ecole', req.body.idAbo, subscription.id, 1, req.currUser.idEcole, req.body.idAbo, subscription.id];
          const query = mysql.format(querySub, data);
          req.mysql.query(query, function(error, results, fields) {
              if (error) {
                tools.dSend(res, "NOK", "Abonnement/Stripe", "subscribe", 500, error, 'Can\'t create stripe sub');
              } else {
                    if (licences.generateLicences(req, quantitiy, req.currUser.idEcole)){
                        let queryLicences = 'SELECT serial FROM d_licencesTables WHERE used=0 AND idEcole='+req.currUser.idEcole;
                        req.mysql.query(queryLicences, function(error, results, fields) {
                            if (error) {
                                tools.dSend(res, "OK", "Abonnement/Stripe", "subscribe", 400, error, 'Les licences n\'ont pas pu etre récupérés. Contactez l\'équipe Dune.');
                            } else {
                                licencesMail.sendLicences(req.currUser.emailUser, results);
                                tools.dSend(res, "OK", "Abonnement/Stripe", "subscribe", 200, error, 'OK');
                            }
                        });
                    } else {
                        tools.dSend(res, "OK", "Abonnement/Stripe", "subscribe", 400, error, 'Les licences n\'ont pas pu etre générées');
                    }
            }
        });
      }
    }
  );
};

exports.checkoutSession = function(items, customer, idApp, res, idEcole, req){

    stripe.checkout.sessions.create(
        {
            customer: customer,
            success_url: 'http://dune-table.com/paiement?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'http://dune-table.com/paiement',
            payment_method_types: ['card'],
            client_reference_id: idApp,
            line_items: [
                {
                    name: items.name,
                    description: items.description,
                    amount: items.amount,
                    currency: items.currency,
                    quantity: items.quantity
                }
            ],
        },
        function(err, session) {
            if (err){
                tools.dSend(res, "NOK", "Stripe/Checkout", "createCheckoutPayment", 500, err, err.code);
            } else {
                const session_id = session.id;
                const pi_id = session.payment_intent;
                let querySub = 'INSERT INTO ?? (idEcole, id_app, id_abonnement, entity_name, typeFacture, prixHT, prixTTC, pi_id_stripe, free_app) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
                let data = ['d_facturation', idEcole, idApp, 0, items.name, 2, items.amount / 100, items.amount / 100, pi_id, 0];
                const query = mysql.format(querySub, data);

                req.mysql.query(query, function(error, results, fields) {
                    if (error) {
                        tools.dSend(
                            res,
                            'NOK',
                            'Stripe/Checkout',
                            'createCheckoutPayment',
                            500,
                            error,
                            null
                        );
                    } else {
                        tools.dSend(res, "OK", "Stripe/Checkout", "createCheckoutPayment", 200, null, {session_id: session_id});
                    }
                });

            }
        }
    );

}

exports.event = function(req, signature, secret){
    let event = stripe.webhooks.constructEvent(req.body.toString('utf8'), signature, secret);

    return event;
}
