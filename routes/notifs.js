var express = require('express');
var mysql   = require("mysql");
var router = express.Router();
var tools = require('../functions/tools');

/**
 * @api {get} /notifs/ Get all notifications
 * @apiName Notifications
 * @apiGroup Notifications
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiDescription Route permettant la récupération des notifications.
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "nbNotifs": 1,
 *     "response": [
 *        {
 *            "idNotif": 1,
 *            "idUser": 1,
 *            "idToNotify": 1,
 *            "typeNotif": 1,
 *            "isRead": 0,
 *            "textNotif": "Vous avez un nouvel achat à valider.",
 *            "idApp": "1",
 *            "nomApp": "Puzzle"
 *        }
 *    ]
 * }
 */

router.get('/', function(req, res, next) {
  var idUser = req.currUser.idUser;
  var query = "SELECT n.idNotif, n.idUser, n.idToNotify, n.typeNotif, n.isRead, n.textNotif, da.idGame AS 'idApp', g.name AS 'nomApp' FROM d_notifications  AS n, d_demandeAchatGame AS da, d_games AS g WHERE n.idToNotify = da.idDemande AND da.idGame = g.id AND n.idUser = " + idUser;

  req.mysql.query(query, function (error, results, fields) {
  	 if(error){
       tools.dSend(res, "NOK", "Notifications", "Notifications", 500, error, null);
  	 } else {
       tools.dLog("OK", "Notifications", "Notifications", 200, null, "nbNotifs:" + results.length + " response:" + results);
    	 res.send(JSON.stringify({"status": 200, "nbNotifs": results.length, "response": results}));
  	 }
  });
});

/**
 * @api {get} /notifs/popUpMenu Get all notifications unRead for the popup
 * @apiName popUpMenu
 * @apiGroup Notifications
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiDescription Route permettant la récupération des notifications.
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "nbNotifs": 1,
 *     "response": [
 *        {
 *            "idNotif": 1,
 *            "idUser": 1,
 *            "idToNotify": 1,
 *            "typeNotif": 1,
 *            "isRead": 0,
 *            "textNotif": "Vous avez un nouvel achat à valider.",
 *            "idApp": "1",
 *            "nomApp": "Puzzle"
 *        }
 *    ]
 * }
 */

router.get('/popUpMenu', function(req, res, next) {
  var idUser = req.currUser.idUser;
  var query = "SELECT n.idNotif, n.idUser, n.idToNotify, n.typeNotif, n.isRead, n.textNotif, da.idGame AS 'idApp', g.name AS 'nomApp', g.picPath AS game_image FROM d_notifications  AS n, d_demandeAchatGame AS da, d_games AS g WHERE n.idToNotify = da.idDemande AND da.idGame = g.id AND n.idUser = " + idUser + " AND isRead = 0";

  req.mysql.query(query, function (error, results, fields) {
  	 if(error){
       tools.dSend(res, "NOK", "Notifications", "popUpMenu", 500, error, null);
  	 } else {
       tools.dLog("OK", "Notifications", "popUpMenu", 200, null, "nbNotifs:" + results.length + " response:" + JSON.stringify(results));
    	 res.send(JSON.stringify({"status": 200, "nbNotifs": results.length, "response": results}));
  	 }
  });
});

/**
 * @api {get} /notifs/getArrayProf/:idDemande Get all the users asked for the same game
 * @apiName getArrayProf
 * @apiGroup Notifications
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {Int} idDemande Id de la demande d'achat de jeu en question.
 * @apiDescription Route permettant la récupération des professeurs ayant fait la demande d'un jeu.
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "nbProfsDemande": 2,
 *     "response": [
 *        {
 *          "idUser": 33,
 *          "picPath": "pic.png",
 *          "nomPrenom": "Diane Gadrat",
 *          "commentaire": "Mes étudiants en ont besoins !",
 *          "dateDemande": "27/07/25"
 *        },
 *        {
 *          "idUser": 34,
 *          "picPath": "pic.png",
 *          "nomPrenom": "Romain Gadrat",
 *          "commentaire": "Mes étudiants n'en ont pas besoins !",
 *          "dateDemande": "29/07/25"
 *        }
 *    ]
 * }
 */

router.get('/getArrayProf/:idDemande', function(req, res, next) {

  var idDemande = req.params.idDemande;
  var query = "SELECT u.idUser, u.picPath, CONCAT(u.prenomUser,' ',u.nomUser) AS nomPrenom, p.commentaire, p.dateDemande FROM d_partDemandeAchat AS p, d_users AS u WHERE p.idProf = u.idUser AND p.idDemande = " + idDemande;

  req.mysql.query(query, function (error, results, fields) {
  	 if(error){
       tools.dSend(res, "NOK", "Notifications", "getArrayProf", 500, error, null);
  	 } else {
       tools.dLog("OK", "Notifications", "getArrayProf", 200, null, "nbProfsDemande:" + results.length + " response:" + results);
    	 res.send(JSON.stringify({"status": 200, "nbProfsDemande": results.length, "response": results}));
  	 }
  });
});

/**
 * @api {get} /notifs/getNbNotifs/ Getting the number of notifications
 * @apiName getNbNotifs
 * @apiGroup Notifications
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiDescription Route permettant la récupération du nombre de notifications d'un utilisateur.
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "error": null,
 *     "nb": 1
 * }
 */

router.get('/getNbNotifs/', function(req, res, next) {
  var idUser = req.currUser.idUser;
  var query = "SELECT COUNT(idNotif) AS nb FROM d_notifications WHERE idUser = " + idUser + " AND isRead = 0";

  req.mysql.query(query, function (error, results, fields) {
    	if(error){
        tools.dSend(res, "NOK", "Notifications", "getNbNotifs", 500, error, null);
    	} else {
        tools.dLog("OK", "Notifications", "getNbNotifs", 200, null, "nb:" + results[0].nb);
        res.send(JSON.stringify({"status": 200, "error": null, "nb": results[0].nb}));
    	}
  });

});

/**
 * @api {put} /notifs/read/:idNotif Read a notification
 * @apiName Read
 * @apiGroup Notifications
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {Int} idNotif Id de la notification.
 * @apiDescription Route permettant de rendre une notification 'lue'.
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "error": null,
 *     "response": {
 *        "fieldCount": 0,
 *        "affectedRows": 1,
 *        "insertId": 0,
 *        "serverStatus": 2,
 *        "warningCount": 0,
 *        "message": "(Rows matched: 1  Changed: 1  Warnings: 0",
 *        "protocol41": true,
 *        "changedRows": 1
 *    }
 * }
 */

router.put('/read/:idNotif', function(req, res, next) {
  var idNotif = req.params.idNotif;
  var query = "UPDATE d_notifications SET isRead = '1' WHERE idNotif = " + idNotif;

  req.mysql.query(query, function (error, results, fields) {
    	if(error){
        tools.dSend(res, "NOK", "Notifications", "read/:idNotif", 500, error, null);
    	} else {
        tools.dSend(res, "OK", "Notifications", "read/:idNotif", 200, null, results);
    	}
  });
});

/**
 * @api {put} /notifs/unRead/:idNotif unRead a notification
 * @apiName unRead
 * @apiGroup Notifications
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {Int} idNotif Id de la notification.
 * @apiDescription Route permettant de rendre une notification 'non-lue'.
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "error": null,
 *     "response": {
 *        "fieldCount": 0,
 *        "affectedRows": 1,
 *        "insertId": 0,
 *        "serverStatus": 2,
 *        "warningCount": 0,
 *        "message": "(Rows matched: 1  Changed: 1  Warnings: 0",
 *        "protocol41": true,
 *        "changedRows": 1
 *    }
 * }
 */

router.put('/unRead/:idNotif', function(req, res, next) {
  var idNotif = req.params.idNotif;
  var query = "UPDATE d_notifications SET isRead = '0' WHERE idNotif = " + idNotif;

  req.mysql.query(query, function (error, results, fields) {
    	if(error){
        tools.dSend(res, "NOK", "Notifications", "unRead/:idNotif", 500, error, null);
    	} else {
        tools.dSend(res, "OK", "Notifications", "unRead/:idNotif", 200, null, results);
    	}
  });
});

/**
 * @api {get} /notifs/getNotif/:idNotif Get a notification
 * @apiName Get a noitif
 * @apiGroup Notifications
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {Int} idNotif Id de la notification.
 * @apiDescription Route permettant de récupérer toutes les informations d'une notification.
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "error": null,
 *     "response": [
 *        {
 *            "idNotif": 1,
 *            "idUserNotif": 1,
 *            "typeNotif": 1,
 *            "isRead": 0,
 *            "textNotif": "Une demande d'achat d'application a été faite.",
 *            "idDemande": 10,
 *            "idProf": 36,
 *            "idGame": 3,
 *            "idEcole": 1,
 *            "isAccepted": 2,
 *            "dateDemande": "2019-01-08T19:17:57.000Z",
 *            "commentaire": "null"
 *        }
 *    ]
 * }
 */

router.get('/getNotif/:idNotif', function(req, res, next) {
  var idNotif = req.params.idNotif;
  var query = "SELECT n.idNotif, n.idUser AS idUserNotif, n.typeNotif, n.isRead, n.textNotif, d.idDemande, d.idGame, d.idEcole, d.isAccepted FROM d_notifications AS n, d_demandeAchatGame AS d WHERE d.idDemande = n.idToNotify AND n.idNotif = " + idNotif;

  req.mysql.query(query, function (error, results, fields) {
    	if(error){
        tools.dSend(res, "NOK", "Notifications", "getNotif/:idNotif", 500, error, null);
    	} else {
        tools.dSend(res, "OK", "Notifications", "getNotif/:idNotif", 200, null, results);
    	}
  });
});
/**
 * @api {delete} /notifs/:idNotif Delete a notification
 * @apiName Delete a noitif
 * @apiGroup Notifications
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {Int} idNotif Id de la notification.
 * @apiDescription Route permettant de supprimer une notification.
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "error": null,
 *     "response": {
 *        "fieldCount": 0,
 *        "affectedRows": 1,
 *        "insertId": 0,
 *        "serverStatus": 2,
 *        "warningCount": 0,
 *        "message": "",
 *        "protocol41": true,
 *        "changedRows": 0
 *    }
 * }
 */

router.delete('/:idNotif', function(req, res, next) {
  var idNotif = req.params.idNotif;

    var query = "DELETE FROM d_notifications WHERE idNotif = " + idNotif;

      req.mysql.query(query, function (error, results, fields) {
    	  	if(error){
            tools.dSend(res, "NOK", "Notifications", "/:idNotif", 500, error, null);
    	  	} else {
            tools.dSend(res, "OK", "Notifications", "/:idNotif", 200, null, results);
    	  	}
      	});
});
module.exports = router;
