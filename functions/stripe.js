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
