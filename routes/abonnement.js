var express = require('express');
var mysql   = require("mysql");
var serial = require("generate-serial-key");
var router = express.Router();
var filez = require('../functions/files/files');
var tools = require('../functions/tools');

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
   var query = "INSERT INTO ?? (idEcole, isActive) VALUES (?, ?)";
   var data = ["d_abonnement", req.currUser.idEcole, req.body.typeAbo];
   query = mysql.format(query, data);

   req.mysql.query(query, function(error, results, fields) {
     if (error){
       tools.dSend(res, "NOK", "Abonnement", "subscribe", 500, error, null);
     } else {
       var query2 = "INSERT INTO d_histAchat(idAbo) VALUES (" + results.insertId + ")";

       req.mysql.query(query2, function(error, results, fields) {
         if (error){
           tools.dSend(res, "NOK", "Abonnement", "subscribe", 500, error, null);
         } else {
           tools.dSend(res, "OK", "Abonnement", "subscribe", 200, null, results);
         }
       });
     }
   });
 });

 /**
  * @api {get} /abonnement/isValid Verifying a sub
  * @apiName isValid
  * @apiGroup Abonnement
  * @apiPermission Logged
  * @apiVersion 1.0.0
  * @apiDescription Route permettant de vérifier si un abonnement est encore valide.
  * @apiHeader {String} token auth
  */
// TODO: PROBLEME DE NOTVALID ALORS QUE VALID
 router.get('/isValid', function(req, res, next) {
   var idEcole = req.currUser.idEcole;

   var query = "SELECT isActive FROM d_abonnement WHERE idEcole = " + idEcole;

   req.mysql.query(query, function(error, results, fields) {
     if (error){
       tools.dSend(res, "NOK", "Abonnement", "isValid", 500, error, null);
     } else {
       if (results.isActive == 1 || results.isActive == 2) {
         tools.dSend(res, "OK", "Abonnement", "isValid", 200, null, "OK");
       } else {
         tools.dSend(res, "OK", "Abonnement", "isValid", 200, null, "NOTVALID");
       }

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

   var query = "UPDATE d_abonnement SET isActive = 0 WHERE idEcole = " + idEcole;

   req.mysql.query(query, function(error, results, fields) {
     if (error){
       tools.dSend(res, "NOK", "Abonnement", "endSub", 500, error, null);
     } else {
       tools.dSend(res, "OK", "Abonnement", "endSub", 200, null, "Abonnement Annulé");
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

   var query = "SELECT isActive AS typeAbo FROM d_abonnement WHERE idEcole = " + idEcole;

   req.mysql.query(query, function(error, results, fields) {
     if (error){
       tools.dSend(res, "NOK", "Abonnement", "getSub", 500, error, null);
     } else {
       tools.dSend(res, "OK", "Abonnement", "getSub", 200, null, results);
     }
   });
 });
module.exports = router;
