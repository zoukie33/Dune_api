var express = require('express');
var mysql   = require("mysql");
var serial = require("generate-serial-key");
var router = express.Router();
var filez = require('../../functions/files/files');
var tools = require('../../functions/tools');

/**
 * @api {post} /admin/create/createSchool/ Create a school
 * @apiName createSchool
 * @apiGroup AdminCreate
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token AdminToken auth 
 * @apiParam {int} nomEcole
 * @apiParam {int} idDirecteur
 *
 * @apiError 500 SQL Error.
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *    "status": 200,
 *    "error": null,
 *       "response": {
 *           "fieldCount": 0,
 *           "affectedRows": 1,
 *           "insertId": 11,
 *           "serverStatus": 2,
 *           "warningCount": 0,
 *           "message": "",
 *           "protocol41": true,
 *           "changedRows": 0
 *       }
 * }
 * @apiErrorExample {json} Error-Response:
 * {
 *    Cette route necessite nomEcole et idDirecteur
 * }
 */

router.post('/createSchool', function(req, res, next) {
	var nomEcole = req.body.nomEcole;
  var idDirecteur = req.body.idDirecteur;
  var query = "INSERT INTO d_ecole (idDirecteur, nomEcole) VALUES ('"+ idDirecteur +"', '"+ nomEcole +"')";

  if (nomEcole && idDirecteur) {
    req.mysql.query(query, function(error, results, fields) {
  		if (error){
  			tools.dSend(res, "NOK", "Admin-Create", "createSchool", 500, error, null);
  		} else {
  			tools.dSend(res, "OK", "Admin-Create", "createSchool", 200, null, results);
  		}
  	});
  } else {
    tools.dSend(res, "NOK", "Admin-Create", "createSchool", 500, null, "Cette route necessite nomEcole et idDirecteur");
  }
});

/**
 * @api {post} /admin/create/genLicence Generating licences
 * @apiName genLicence
 * @apiGroup AdminCreate
 * @apiPermission notLogged
 * @apiVersion 1.0.0
 * @apiSuccessExample {json} Success-Response:
 * {
 *    "status": 200,
 *    "error": null,
 *       "response": [
 *         "Q6M8-P6V5-E9GN-VWER",
 *         "4LV9-Q3DL-GMAH-UAKT",
 *         "XC62-P44M-RGFE-TAZA",
 *         "9MSX-A787-J4R4-ZQ4K",
 *         "AQ7X-N9T2-XEEH-DX2X"
 *     ]
 * }
* @apiHeader {String} token AdminToken auth
 * @apiParam {Int} nbLicences
 * @apiParam {Int} idEcole
 */

 router.post('/genLicence', function(req, res, next) {
 	var nbLicences = req.body.nbLicences;
 	var tabLicence = [];
 	var idEcole = req.body.idEcole;
  var expDate = new Date();
    expDate = expDate.getUTCFullYear()+1 + '-' +
    ('00' + (expDate.getUTCMonth()+1)).slice(-2) + '-' +
    ('00' + expDate.getUTCDate()).slice(-2) + ' ' +
    ('00' + expDate.getUTCHours()).slice(-2) + ':' +
    ('00' + expDate.getUTCMinutes()).slice(-2) + ':' +
    ('00' + expDate.getUTCSeconds()).slice(-2);
 	if (nbLicences == 0) {
 		res.send(JSON.stringify({"status": 500, "error": error, "response": "nbLicences doit être supérieur à 0."}));
 	} else if (nbLicences > 50) {
 		res.send(JSON.stringify({"status": 500, "error": error, "response": "nbLicences doit être inférieur ou égal à 50."}));
 	} else if (idEcole == "") {
 		res.send(JSON.stringify({"status": 500, "error": error, "response": "idEcole manquant."}));
 	} else {
 		for (var i = nbLicences; i > 0; i--) {
      let lic = serial.generate();
 			tabLicence.push(lic);
      req.mysql.query("INSERT INTO d_licencesTables (idEcole, serial, used, dateExpire) VALUES ('"+ idEcole +"', '"+ lic +"', 0, '" + expDate + "')", function(error, results, fields) {
        if (error){
          console.log(error);
    			tools.dSend(res, "NOK", "Admin-Create", "genLicence", 500, error, null);
    		}
      });
 		}
    tools.dSend(res, "OK", "Admin-Create", "genLicence", 200, null, tabLicence);
 	}
 });

 /**
  * @api {post} /admin/create/createGame Creating a game
  * @apiName createGame
  * @apiGroup AdminCreate
  * @apiPermission Logged
  * @apiVersion 1.0.0
  *
  * @apiHeader {String} token AdminToken auth
  * @apiParam {String} name Nom de l'application/jeu.
  * @apiParam {Int} idCreator Id du créateur
  * @apiParam {Int} idType Id du type de jeu
  * @apiParam {String} description Description de l'application
  * @apiParam {Int} nbJoueurs Nombre de joueurs possibles (2-4 ou encore 4-6).
  * @apiParam {String} currVersion Version actuelle de l'app/jeu (1.0)
  * @apiParam {Int} niveau Niveau de difficulté de l'app/jeu (1 ou 2)
  * @apiParam {Int} prix Prix de l'app/jeu (0 = free)
  * @apiError 500 SQL Error.
  * @apiError 500 SQL Error.
  * @apiSuccessExample {json} Success-Response:
  * {
  *    "Game Added"
  * }
  * @apiErrorExample {json} Error-Response:
  * {
  *    "un des champs est manquant"
  * }
  */

 router.post('/add', function(req, res, next) {
 	var name  = req.body.name;
  var idType = req.body.idType;
 	var idCreator = req.body.idCreator;
  var description = req.body.description;
  var nbJoueurs = req.body.nbJoueurs;
  var currVersion = req.body.currVersion;
  var niveau = req.body.niveau;
  var prix = req.body.prix;

 	var query = "INSER INTO d_games (idType, name, creator, path, picPath, prix, nb_joueurs, current_version, niveau, description) VALUES ('"+ idType +"', '"+ name +"', '"+ idCreator +"', 'NULL', 'NULL', '" + prix + "', " + nbJoueurs + ", '"+ currVersion +"', " + niveau + ",  '" + description + "')";
  if (name && idType && idCreator && description && nbJoueurs && currVersion && niveau && prix) {
    req.mysql.query(query, function(error, results, fields) {
   		if (error){
   			tools.dSend(res, "NOK", "Admin-Create", "createGame", 500, error, null);
   		} else {
   			tools.dSend(res, "OK", "Admin-Create", "createGame", 200, null, "Game Added");
   		}
   	});
  } else {
      tools.dSend(res, "NOK", "Admin-Create", "createGame", 500, "un des champs est manquant", null);
  }
 });

module.exports = router;
