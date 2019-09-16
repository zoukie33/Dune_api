var express = require('express');
var mysql   = require("mysql");
var serial = require("generate-serial-key");
var router = express.Router();
var filez = require('../../functions/files/files');
var tools = require('../../functions/tools');

/**
 * @api {put} /admin/update/updateLicence/ Updating a licence
 * @apiName updateLicence
 * @apiGroup AdminUpdate
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token AdminToken auth
 * @apiParam {String} licence 7CCK-METF-SSFW-7RZ8
 * @apiParam {int} used 0 ou 1
 * @apiParam {TimeStamp} dateExpire 2020-04-23 15:16:20
 * @apiDescription Route permettant d'update une licence.
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

router.put('/updateLicence', function(req, res, next) {
  var licence = req.body.licence;
  var used = req.body.used;
  var dateExpire = req.body.dateExpire;
  var query = "UPDATE d_licencesTables SET used = " + used + ", dateExpire = " + dateExpire + " WHERE serial = " + licence;

  req.mysql.query(query, function (error, results, fields) {
    	if(error){
        tools.dSend(res, "NOK", "Admin-Update", "updateLicence", 500, error, null);
    	} else {
        tools.dSend(res, "OK", "Admin-Update", "updateLicence", 200, null, results);
    	}
  	});
});

/**
 * @api {put} /admin/update/updateGame Updating a game
 * @apiName updateGame
 * @apiGroup AdminUpdate
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token Token auth
 * @apiParam {Int} id Id de l'app/jeu.
 * @apiParam {String} name Nom de l'application/jeu.
 * @apiParam {String} description Description de l'application
 * @apiParam {Int} nbJoueurs Nombre de joueurs possibles (2-4 ou encore 4-6).
 * @apiParam {String} currVersion Version actuelle de l'app/jeu (1.0)
 * @apiParam {Int} niveau Niveau de difficulté de l'app/jeu (1 ou 2)
 * @apiParam {Int} prix Prix de l'app/jeu (0 = free)
 * @apiParam {Int} Creator Id du createur du jeu
 */

router.put('/updateGame', function(req, res, next) {
		var id  = req.body.id;
		var name  = req.body.name;
		var creator  = req.body.creator;
	  var description = req.body.description;
	  var nbJoueurs = req.body.nbJoueurs;
	  var currVersion = req.body.currVersion;
	  var niveau = req.body.niveau;
	  var prix = req.body.prix;
	var query = "UPDATE d_games SET name = '"+ name +"', creator = '"+ creator +"', description = '" + description + "', nb_joueurs = " + nbJoueurs + ", current_version = '" + currVersion + "', niveau = " + niveau + ", prix = '" + prix + "' WHERE id = " + id;

	req.mysql.query(query, function(error, results, fields) {
		if (error){
			tools.dSend(res, "NOK", "Games", "updateGame", 500, error, null);
		} else {
			tools.dSend(res, "OK", "Games", "updateGame", 200, null, "Game Updated");
		}
		res.end(JSON.stringify(results));
	});
});

/**
 * @api {put} /admin/update/picGame Uploading a picture for the game
 * @apiName picGame
 * @apiGroup AdminUpdate
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token Token auth
 * @apiParam {Int} idGame Id de l'app/jeu.
 * @apiParam {File} picGame Image.
 */

router.put('/picGame', function(req, res, next) {
	if (Object.keys(req.files).length != 0) {
		var id  = req.body.idGame;
		let file;

		file = req.files.picGame;
		var fileName = id + "-app.png";
		if (filez.filesGest(file, "apps/", fileName)) {
			var query = "UPDATE d_games SET picPath = '" + fileName + "'  WHERE id = " + id;
			req.mysql.query(query, function(error, results, fields) {
				if (error){
					tools.dSend(res, "NOK", "Games", "picGame", 500, error, "Impossible de mettre a jour cet utilisateur.");
				} else {
					tools.dSend(res, "OK", "Games", "picGame", 200, null, "Game Updated");
				}
				res.end(JSON.stringify(results));
			});
		} else {
			tools.dSend(res, "NOK", "Games", "picGame", 500, "Directory error", null);
		}
	} else {
		tools.dSend(res, "NOK", "Games", "picGame", 500, "Error uploading File", null);
	}
});


/**
 * @api {put} /admin/update/ecole Uploading a School
 * @apiName ecole
 * @apiGroup AdminUpdate
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token Token auth
 * @apiParam {Int} idEcole Id de l'école
 * @apiParam {String} nomEcole Nom de l'école
 * @apiParam {String} rueEcole Nom de rue de l'école
 * @apiParam {Int} numRueEcole Numéro batiment de l'école
 * @apiParam {String} villeEcole Ville de l'école
 * @apiParam {String} departementEcole Département de l'école
 * @apiParam {String} telEcole Numero de téléphone de l'école
 * @apiError 500 SQL Error.
 * @apiSuccessExample {json} Success-Response:
 * {
 *    "Ecole Updated"
 * }
 * @apiErrorExample {json} Error-Response:
 * {
 *    "Impossible de mettre a jour cette ecole, tous les champs doivent être remplis."
 * }
 */

router.put('/ecole', function(req, res, next) {
  var id  = req.body.idEcole,
    name = req.body.nomEcole,
    rue = req.body.rueEcole,
    numRue = req.body.numRueEcole,
    ville = req.body.villeEcole,
    departement = req.body.departementEcole,
    tel = req.body.telEcole;

  if (id && name && rue && numRue && ville && departement && tel) {
    var query = "UPDATE ?? SET nomEcole = ?, rue = ?, numRue = ?, ville = ?, departement = ?, tel = ? WHERE id = ?";
    var data = ['d_ecole', name, rue, numRue, ville, departement, tel, id];
    query = mysql.format(query, data);
  	req.mysql.query(query, function(error, results, fields) {
  		if (error){
  			tools.dSend(res, "NOK", "Admin-Update", "Update-Ecole", 500, error, "Impossible de mettre a jour cette Ecole.");
  		} else {
  			tools.dSend(res, "OK", "Admin-Update", "Update-Ecole", 200, null, "Ecole Updated");
  		}
  	});
  } else {
    tools.dSend(res, "NOK", "Admin-Update", "Update-Ecole", 500, null, "Impossible de mettre a jour cette ecole, tous les champs doivent être remplis.");
  }
});

/**
 * @api {put} /admin/update/user Updating an User
 * @apiName user
 * @apiGroup AdminUpdate
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token Token auth
 * @apiParam {Int} idUser Id de l'utilisateur.
 * @apiParam {String} nomUser Nom de l'utilisateur.
 * @apiParam {String} prenomUser Prénom de l'utilisateur.
 *
 * @apiDescription Route permettant la mise à jour d'un utilisateur.
 * @apiError 500 SQL Error.
 * @apiSuccessExample {json} Success-Response:
 * {
 *    "User Updated"
 * }
 * @apiErrorExample {json} Error-Response:
 * {
 *    "Impossible de mettre a jour cet user, tous les champs doivent être remplis."
 * }
 */

router.put('/user', function(req, res, next) {
  var idUser = req.body.idUser,
      nomUser = req.body.nomUser,
      prenomUser = req.body.prenomUser,
      emailUser = req.body.emailUser;

  if (idUser && nomUser && prenomUser && emailUser) {
    var query = "UPDATE ?? SET nomUser = ?, prenomUser = ?, emailUser = ? WHERE idUser = ?";
    var data = ['d_users', nomUser, prenomUser, emailUser, idUser];
    query = mysql.format(query, data);
    req.mysql.query(query, function(error, results, fields) {
    	if (error){
        tools.dSend(res, "NOK", "Admin-Update", "Update-User", 500, error, "Impossible de mettre a jour cet utilisateur.");
    	} else {
        tools.dSend(res, "OK", "Admin-Update", "Update-User", 200, null, "User Updated");
    	}
    });
  } else {
      tools.dSend(res, "NOK", "Admin-Update", "Update-User", 500, "Impossible de mettre a jour cet user, tous les champs doivent être remplis.", null);
  }
});

 /**
  * @api {put} /admin/update/eleve Updating a Student
  * @apiName eleve
  * @apiGroup AdminUpdate
  * @apiPermission Logged
  * @apiVersion 1.0.0
  *
  * @apiHeader {String} token Token auth
  * @apiParam {Int} idEleve Id de l'élève a mettre a jour.
  * @apiParam {String} nomEleve Nom de l'élève.
  * @apiParam {String} prenomEleve Prénom de l'élève.
  *
  * @apiDescription Route permettant la mise à jour d'un élève.
  * @apiError 500 SQL Error.
  * @apiSuccessExample {json} Success-Response:
  * {
  *    "Eleve Updated"
  * }
  * @apiErrorExample {json} Error-Response:
  * {
  *    "Impossible de mettre a jour cet élève, tous les champs doivent être remplis."
  * }
  */
router.put('/eleve', function(req, res, next) {

  var idEleve = req.body.idEleve,
      nomEleve = req.body.nomEleve,
      prenomEleve = req.body.prenomEleve;

  if (idEleve && nomEleve && prenomEleve) {
    var query = "UPDATE ?? SET nomEleve = ?, prenomEleve = ? WHERE idEleve = ?";
    var data = ['d_eleves', nomEleve, prenomEleve, idEleve];
    query = mysql.format(query, data);
    req.mysql.query(query, function(error, results, fields) {
      if (error){
        tools.dSend(res, "NOK", "Admin-Update", "Update-Eleve", 500, error, "Impossible de mettre a jour cet utilisateur.");
      } else {
        tools.dSend(res, "OK", "Admin-Update", "Update-Eleve", 200, null, "User Updated");
      }
    });
  } else {
      tools.dSend(res, "NOK", "Admin-Update", "Update-Eleve", 500, "Impossible de mettre a jour cet élève, tous les champs doivent être remplis.", null);
  }
});
module.exports = router;
