var express = require('express');
var mysql   = require("mysql");
var router = express.Router();

/**
 * @api {post} /notifs/ Get all notifications
 * @apiName Notifs
 * @apiGroup Notifs
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {Int} typeUser Type de l'utilisateur (1 ou 2).
 * @apiParam {Int} idUser Id de l'utilisateur connecté.
 * @apiParam {Int} idEcole Id de l'école de lutilisateur connecté.
 * @apiDescription Route permettant la récupération des notifications.
 */

router.post('/', function(req, res, next) {
  var typeUser = req.body.typeUser;
  var idUser = req.body.idUser;
  var idEcole = req.body.idEcole;

  if (typeUser && idUser && idEcole) {
    if (typeUser === 1) {
      var query = "SELECT * FROM d_demandeAchatGame WHERE idProf = " + idUser + " AND idEcole = " + idEcole;
    } else if (typeUser === 2) {
      var query = "SELECT * FROM d_demandeAchatGame WHERE idEcole = " + idEcole;
    } else {
      res.send(JSON.stringify({"status": 500, "response": "Erreur TypeUser"}));
    }

    req.mysql.query(query, function (error, results, fields) {
  	  	if(error){
  	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
  	  	} else {
    			res.send(JSON.stringify({"status": 200, "nbNotifsDirr": results.length, "response": results}));
  	  	}
    	});
  } else {
    res.send(JSON.stringify({"status": 500, "response": "Parametres demandées : typeUser, idUser, idEcole"}));
  }
});

/**
 * @api {post} /notifs/validating Validating an appAsk
 * @apiName Validating
 * @apiGroup Notifs
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {Int} typeUser Type de l'utilisateur (1 ou 2).
 * @apiParam {Int} idDemande Id de la demande d'achat.
 * @apiDescription Route permettant la validation d'un achat demandé par un professeur.
 */

router.post('/validating', function(req, res, next) {
  var typeUser = req.body.typeUser;
  var idDemande = req.body.idDemande;

  if (typeUser && idDemande) {
    if (typeUser == 2) {
      var query = "SELECT idGame, idEcole FROM d_demandeAchatGame WHERE idDemande = " + idDemande;
    } else {
      res.send(JSON.stringify({"status": 500, "response": "Seulement un directeur peut utiliser cette fonction."}));
    }

    req.mysql.query(query, function (error, results, fields) {
  	  	if(error){
  	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
  	  	} else {
    			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  	  	}
    	});
  } else {
    res.send(JSON.stringify({"status": 500, "response": "Parametres demandées : typeUser, idDemande"}));
  }
});

/**
 * @api {post} /notifs/getNotifsNb Getting the number of the notifications
 * @apiName getNotifsNb
 * @apiGroup Notifs
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {Int} typeUser Type de l'utilisateur (1 ou 2).
 * @apiParam {Int} idUser Id de l'utilisateur connnecté.
 * @apiParam {Int} idEcole Id de l'école de l'utilisateur connecté.
 * @apiDescription Route permettant la récupération du nombre de notifications d'un utilisateur.
 */

router.post('/getNotifsNb', function(req, res, next) {
  var typeUser = req.body.typeUser;
  var idUser = req.body.idUser;
  var idEcole = req.body.idEcole;

  if (idEcole || idUser) {
    if (typeUser == 2 && idEcole) {
      var query = "SELECT COUNT(idDemande) AS nb FROM d_demandeAchatGame WHERE idEcole = " + idEcole;
    } else {
      var query = "SELECT COUNT(idDemande) AS nb FROM d_demandeAchatGame WHERE idProf = " + idUser;
    }
      req.mysql.query(query, function (error, results, fields) {
    	  	if(error){
    	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
    	  	} else {
      			res.send(JSON.stringify({"status": 200, "error": null, "nb": results[0].nb}));
    	  	}
      	});
  } else {
    res.send(JSON.stringify({"status": 500, "response": "Parametres demandées : typeUser et/ou idEcole ou idUser"}));
  }
});
module.exports = router;
