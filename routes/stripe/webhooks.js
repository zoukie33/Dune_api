var mysql = require('mysql2');
var tools = require('../../functions/tools');
var express = require('express');
var router = express.Router();
var stripefct = require('../../functions/stripe');

router.post('/stripeHooks', function(req, res) {

    const endpointSecret = 'whsec_m0QY3DknuGIqMI2zsoMTvT1TnfLdNn6F';
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripefct.event(req, sig, endpointSecret);
    } catch (err) {
        tools.dSend(res, "OK", "Stripe/WebHooks", "stripeHooks", 400, err, `Webhook Error: ${err.message}`);
    }

    // On gère les retours de stripe par rapport aux paiements
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;

            let query_fact = "SELECT id_app, idEcole from d_facturation WHERE pi_id_stripe='"+paymentIntent.id+"'";

            let querySub = 'UPDATE ?? SET paid=? WHERE pi_id_stripe=?';
            let data = ['d_facturation', 1, paymentIntent.id];
            const query = mysql.format(querySub, data);
            req.mysql.query(query, function(error, results) {
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
                    req.mysql.query(query_fact, function(error, results) {
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
                        } else if (results.length > 0) {
                            let idApp = results[0].id_app;
                            let idEcole = results[0].idEcole;
                            var queryApp =
                                "INSERT INTO ?? (idGame, idEcole) VALUES (?, ?)";
                            let data = ['d_gamesAppEcole', idApp, idEcole];
                            const query = mysql.format(queryApp, data);
                            req.mysql.query(query, function(error, results) {
                                        if (error) {
                                            tools.dSend(
                                                res,
                                                'NOK',
                                                'Stripe/WebHooks',
                                                'stripeHooks',
                                                500,
                                                error,
                                                null
                                            );
                                        } else {
                                                tools.dSend(res, "OK", "Stripe/WebHooks", "stripeHooks", 200, null, results);
                                        }
                                    });
                                } else {
                                    tools.dSend(res, "OK", "Stripe/WebHooks", "stripeHooks", 200, null, results);
                                }
                            });
                        }
                    });
            break;
        case 'invoice.payment_succeeded': // TODO: Gérer la validation de la facture pour un abonnement + Ajouter l'abonnement au client ici et non dans stripe.js

            break;
        default:
            // Unexpected event type
            tools.dSend(res, "OK", "Stripe/WebHooks", "stripeHooks", 400, null, `event inconnu`);
    }

});


module.exports = router;
