var express = require('express');
var mysql   = require("mysql");
var tools = require('./tools');
var md5 = require("MD5");
const stripe = require("stripe")("sk_test_x28sxZXrTkZlaoGNujXlYGNk");

exports.addCustomer = function (req, res, datas) {
    stripe.customers.create({
        address: {line1: datas.address},
        balance: 0,
        description: 'Account for ' + datas.ecoleName + ' school.',
        email: datas.email,
        source: "tok_mastercard"
    }, function (err, customer) {
        if (err) {
            tools.dSend(res, "NOK", "Stripe/customer", "add", 500, err, "KO");
        } else {
            let _customer_id = customer.id;
            var query = "UPDATE ?? SET id_customer = ? WHERE id = ?";
            var data = ['d_ecole', _customer_id, datas.idEcole];
            query = mysql.format(query, data);
            req.mysql.query(query, function (error, results, fields) {
                if (error) {
                    console.log(results);
                    return false;
                } else {
                    console.log(results);
                    return true;
                }
            });
        }
    });
}

exports.attachPaymentMethod = function (req, res, datas){

    stripe.paymentMethods.attach(datas.pm_id, {customer: datas.customer}, function(err, paymentMethod) {
        if (err){
            tools.dSend(res, "NOK", "Stripe", "addMethod", 500, err, null);

        } else {
            tools.dSend(res, "OK", "Stripe", "addMethod", 200, null, {response: 'Paiement crée !'});
        }
    });

}

exports.createSub = function (req, res, datas){
    var query = "INSERT INTO ?? (typeAbo, idEcole, status) VALUES (?, ?, ?)";
    var data = ["d_abonnement", 1, req.currUser.idEcole, 1];
    var plan = req.body.plan === "1" ? "plan_FqV8c329keSQjW" : req.body.plan === "2" ? "plan_FqAjvHIBM8zxZY" : "";

    query = mysql.format(query, data);

    stripe.subscriptions.create({
            customer: datas.customer,
            items: [
                {
                    plan: plan,
                },
            ]
        }, function(err, subscription) {
            if (err){
                tools.dSend(res, "NOK", "Abonnement/Stripe", "subscribe", 500, error, 'Can\'t create stripe sub');
            } else {
                req.mysql.query(query, function (error, results, fields) {
                    if (error){
                        tools.dSend(res, "NOK", "Abonnement/Stripe", "subscribe", 500, error, 'Can\'t create stripe sub');
                    } else {
                        var querySub = "UPDATE ?? SET idSubStripe=? WHERE idEcole=?";
                        var data = ["d_abonnement", subscription.id, req.currUser.idEcole];
                        querySub = mysql.format(querySub, data);
                        req.mysql.query(querySub, function (error, results, fields) {
                            if (error) {
                                console.log(results);
                                return false;
                            } else {
                                console.log(results);
                                return true;
                            }
                        });
                    }
                });
            }
        });
}
