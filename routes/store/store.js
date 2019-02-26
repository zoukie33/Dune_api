var express = require('express');
var mysql   = require("mysql");
var router = express.Router();
var doNotif = require('../../functions/notifications');
var tools = require('../../functions/tools');

/**
 * @api {post} /store/ Getting all items in store
 * @apiName Store
 * @apiGroup Store
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {Int} idType Id du type d'application voulue.
 * @apiDescription Route permettant de récupérer toutes les applications par rapport à un Type d'application.
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "error": null,
 *     "response": [
 *        {
 *            "id": 1,
 *            "nomApp": "testApp",
 *            "nomCreator": "test",
 *            "picPath": "1-app.png"
 *        }
 *    ]
 * }
 */

 router.post('/', function(req, res, next) {
	var idType = req.body.idType;
 	var search = req.body.search;
  if (search) {
    if (idType == 0) {
  		var query = "SELECT g.id, g.name as 'nomApp', c.nom as 'nomCreator', g.picPath FROM d_games AS g, d_creator as c WHERE g.creator = c.idCreator AND ((g.name LIKE '" + search +"%') OR (c.nom LIKE '" + search +"%'))";
  	} else {
  		var query = "SELECT g.id, g.name as 'nomApp', c.nom as 'nomCreator', g.picPath FROM d_games AS g, d_creator as c WHERE g.creator = c.idCreator AND ((g.name LIKE '" + search +"%') OR (c.nom LIKE '" + search +"%')) AND idType = " + idType;
  	}
  } else {
    if (idType == 0) {
  		var query = "SELECT g.id, g.name as 'nomApp', c.nom as 'nomCreator', g.picPath FROM d_games AS g, d_creator as c WHERE g.creator = c.idCreator";
  	} else {
  		var query = "SELECT g.id, g.name as 'nomApp', c.nom as 'nomCreator', g.picPath FROM d_games AS g, d_creator as c WHERE g.creator = c.idCreator AND idType = " + idType;
  	}
  }

	req.mysql.query(query, function (error, results, fields) {
	  	if(error){
        tools.dSend(res, "NOK", "Store", "Store", 500, error, null);
	  	} else {
        tools.dSend(res, "OK", "Store", "Store", 200, null, results);
	  	}
  	});
});

/**
 * @api {post} /store/getApp Getting an app by id
 * @apiName getApp
 * @apiGroup Store
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {Int} idApp Id de l'application voulue.
 * @apiDescription Route permettant de récupérer les informations d'une application.
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "error": null,
 *     "response": [
 *        {
 *            "id": 1,
 *            "nomApp": "testApp",
 *            "nomCreator": "test",
 *            "picPath": "1-app.png",
 *            "path": "NULL"
 *        }
 *    ]
 * }
 */

router.post('/getApp', function(req, res, next) {
  var idApp = req.body.idApp;
  if (idApp) {
    req.mysql.query('SELECT g.id, g.name as "nomApp", c.nom as "nomCreator", g.picPath, g.path FROM d_games AS g, d_creator as c WHERE g.creator = c.idCreator AND g.id = ' + idApp, function (error, results, fields) {
  	  	if(error){
          tools.dSend(res, "NOK", "Store", "getApp", 500, error, null);
  	  	} else {
          tools.dSend(res, "OK", "Store", "getApp", 200, null, results);
  	  	}
    	});
  } else {
    tools.dSend(res, "NOK", "Store", "getApp", 500, "Parametre manquant : idApp", null);
  }
});

/**
 * @api {get} /store/getAppsEcole Getting apps already buyed by a school
 * @apiName getAppsEcole
 * @apiGroup Store
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiDescription Route permettant de récupérer les applications déjà achetées pour une école.
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "error": null,
 *     "response": [
 *        {
 *            "id": 1,
 *            "nomApp": "testApp",
 *            "nomCreator": "test",
 *            "picPath": "1-app.png",
 *            "path": "NULL"
 *        }
 *    ]
 * }
 */

router.get('/getAppsEcole', function(req, res, next) {
  var idEcole = req.currUser.idEcole;
  if (idEcole) {
    req.mysql.query('SELECT g.id, g.name as "nomApp", c.nom as "nomCreator", g.picPath, g.path FROM d_games AS g, d_gamesAppEcole AS ga, d_creator as c WHERE g.id = ga.idGame AND g.creator = c.idCreator AND ga.idEcole = ' + idEcole, function (error, results, fields) {
  	  	if(error){
          tools.dSend(res, "NOK", "Store", "getAppsEcole", 500, error, null);
  	  	} else {
          tools.dSend(res, "OK", "Store", "getAppsEcole", 200, null, results);
  	  	}
    	});
  } else {
    tools.dSend(res, "NOK", "Store", "getAppsEcole", 500, "Parametre manquant : idEcole", null);
  }
});

/**
 * @api {get} /store/getAppStatus/:id Getting app status (if buyed by the school)
 * @apiName getAppStatus
 * @apiGroup Store
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {Int} idApp Id de l'application demandée.
 * @apiDescription Route permettant de savoir si l'application est détenue par l'école ou non.
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "error": null,
 *     "appStatus": "1"
 * }
 */
router.get('/getAppStatus/:idApp', function(req, res, next) {
  var idEcole = req.currUser.idEcole;
  var idApp = req.params.idApp;
  if (idEcole && idApp) {
    req.mysql.query('SELECT * FROM d_gamesAppEcole AS ga WHERE ga.idGame = '+ idApp +' AND ga.idEcole = ' + idEcole, function (error, results, fields) {
  	  	if(error){
          tools.dSend(res, "NOK", "Store", "getAppStatus", 500, error, null);
  	  	} else {
          if (results.length==1) {
            tools.dLog("OK", "Store", "getAppStatus", 200, null, '"appStatus": "1"');
            res.send(JSON.stringify({"status": 200, "error": null, "appStatus": "1"}));
          } else {
            tools.dLog("OK", "Store", "getAppStatus", 200, null, '"appStatus": "0"');
            res.send(JSON.stringify({"status": 200, "error": null, "appStatus": "0"}));
          }
  	  	}
    	});
  } else {
    tools.dSend(res, "NOK", "Store", "getAppStatus", 500, "Parametre manquant : idEcole", null);
  }
});

/**
 * @api {post} /store/buyApp Asking for buying an app by a prof
 * @apiName buyApp
 * @apiGroup Store
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {Int} idApp Id de l'application à acheter.
 * @apiParam {String} commentaire Commantaide de demande d'achat.
 * @apiDescription Route permettant de faire une demande d'achat d'application.
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "error": null,
 *     "response": {
 *         "fieldCount": 0,
 *         "affectedRows": 1,
 *         "insertId": 1,
 *         "serverStatus": 2,
 *         "warningCount": 0,
 *         "message": "",
 *         "protocol41": true,
 *         "changedRows": 0
 *     }
 * }
 *
 */


router.post('/buyApp', function(req, res, next) {
  var idApp = req.body.idApp;
  var idProf = req.currUser.idUser;
  var idEcole = req.currUser.idEcole;
  var commentaire = req.body.commentaire;
  var quer = "SELECT da.idDemande FROM d_demandeAchatGame AS da WHERE da.idGame = " + idApp + " AND da.idEcole = " + idEcole + " AND da.isAccepted = 0";
  if (idApp && idProf && idEcole) {
    req.mysql.query(quer, function (error, results, fields) {
      if (results.length == 1) {
        if (commentaire) {
          var query2 = "INSERT INTO d_partDemandeAchat(idDemande, idProf, commentaire) VALUES ("+ results[0].idDemande +","+ idProf +","+ commentaire +")";
        } else {
          var query2 = "INSERT INTO d_partDemandeAchat(idDemande, idProf) VALUES ("+ results[0].idDemande +","+ idProf +")";
        }
        req.mysql.query(query2, function (error, results2, fields) {
          if(error){
            tools.dSend(res, "NOK", "Store", "buyApp", 500, error, 1);
          } else {
            //doNotif.createNotifDirecteur(req, idEcole, results[0].idDemande, 1, "Une demande d'achat d'application a été faite.1");
            tools.dSend(res, "OK", "Store", "buyApp", 200, null, results2);
          }
        });
      } else {
        var query = "INSERT INTO d_demandeAchatGame (idGame, idEcole) VALUES ('" + idApp + "', '" + idEcole + "')";
        req.mysql.query(query, function (error, results, fields) {
      	  	if(error){
              tools.dSend(res, "NOK", "Store", "buyApp", 500, error, 2);
      	  	} else {
              if (commentaire) {
                var query2 = "INSERT INTO d_partDemandeAchat(idDemande, idProf, commentaire) VALUES ("+ results.insertId +","+ idProf +","+ commentaire +")";
              } else {
                var query2 = "INSERT INTO d_partDemandeAchat(idDemande, idProf) VALUES ("+ results.insertId +","+ idProf +")";
              }
              doNotif.createNotifDirecteur(req, idEcole, results.insertId, 1, "Une demande d'achat d'application a été faite.2");
              req.mysql.query(query2, function (error, results2, fields) {
                if(error){
                  tools.dSend(res, "NOK", "Store", "buyApp", 500, error, 2);
          	  	} else {
                  tools.dSend(res, "OK", "Store", "buyApp", 200, null, results2);
                }
              });
      	  	}
        	});
      }
    });
  } else {
    tools.dSend(res, "NOK", "Store", "buyApp", 500, "Parametres necessaires: idApp, idProf, idEcole", null);
  }

});

/**
 * @api {post} /store/buyAppDirecteur Buying directly an App
 * @apiName buyAppDirecteur
 * @apiGroup Store
 * @apiPermission Logged + Director
 * @apiVersion 1.0.0
 *
 * @apiParam {Int} idApp Id de l'application a acheter.
 * @apiDescription Route permettant l'achat d'une application sans vérification nécessaire.
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "error": null,
 *     "response": {
 *         "fieldCount": 0,
 *         "affectedRows": 1,
 *         "insertId": 0,
 *         "serverStatus": 2,
 *         "warningCount": 0,
 *         "message": "",
 *         "protocol41": true,
 *         "changedRows": 0
 *     }
 * }
 */

router.post('/buyAppDirecteur', function(req, res, next) {
  var idApp = req.body.idApp;
  var idEcole = req.currUser.idEcole;
  var query = "SELECT * FROM d_gamesAppEcole WHERE idGame = " + idApp + " AND idEcole = " + idEcole;
  var query2 = "INSERT INTO d_gamesAppEcole (idGame, idEcole) VALUES ('" + idApp + "', '" + idEcole + "')";

  if (idApp && idEcole) {
    req.mysql.query(query, function (error, results, fields) {
  	  	if(results.length == 0){
          req.mysql.query(query2, function (error, results, fields) {
            if(error){
              tools.dSend(res, "NOK", "Store", "buyAppDirecteur", 500, error, null);
            } else {
              tools.dSend(res, "OK", "Store", "buyAppDirecteur", 200, null, results);
            }
          });
  	  	} else {
          tools.dSend(res, "NOK", "Store", "buyAppDirecteur", 500, "Application déjà achetée", null);
  	  	}
    	});
  } else {
    tools.dSend(res, "NOK", "Store", "buyAppDirecteur", 500, "Parametres necessaires: idApp, idEcole", null);
  }

});

/**
 * @api {get} /store/typesGames Getting all games types
 * @apiName typesGames
 * @apiGroup Store
 * @apiPermission Logged + Director
 * @apiVersion 1.0.0
 * @apiDescription Route permettant de récupérer tous les types de jeux disponibles.
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "error": null,
 *     "response": [
 *        {
 *            "idType": 1,
 *            "labelType": "Jeux"
 *        }
 *    ]
 * }
 */

router.get('/typesGames', function(req, res, next) {
	var query = "SELECT * FROM d_typeGames";
    req.mysql.query(query, function (error, results, fields) {
  	  	if(error){
          tools.dSend(res, "NOK", "Store", "typesGames", 500, error, null);
  	  	} else {
          tools.dSend(res, "OK", "Store", "typesGames", 200, null, results);
  	  	}
    	});
});

/**
 * @api {post} /store/validating Validating an appAsk
 * @apiName Validating
 * @apiGroup Store
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {Int} idDemande Id de la demande d'achat.
 * @apiParam {Int} validate Bool (0 ou 1) signifiant si l'achat d'application est validé ou non.
 * @apiDescription Route permettant la validation d'un achat demandé par un professeur.
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "error": null,
 *     "response": [
 *        {
 *            "idGame": 1,
 *            "idEcole": 1
 *        }
 *    ]
 * }
 */

router.post('/validating', function(req, res, next) {
  var typeUser = req.currUser.typeUser;
  var idDemande = req.body.idDemande;
  var validate = req.body.validate;

  if (typeUser && idDemande && validate) {
    if (typeUser == 2) {
      var query = "SELECT idGame, idEcole, idProf FROM d_demandeAchatGame WHERE idDemande = " + idDemande;
    } else {
      tools.dSend(res, "NOK", "Store", "Validating", 500, "Seulement un directeur peut utiliser cette fonction.", null);
    }

    req.mysql.query(query, function (error, results1, fields) {
  	  	if(error){
          tools.dSend(res, "NOK", "Store", "Validating", 500, error, null);
  	  	} else {
          if (validate == 1) {
            var query = "INSERT INTO d_gamesAppEcole (idGame, idEcole) VALUES ('" + results1[0].idGame + "', '" + results1[0].idEcole + "')";
            var query2 = "UPDATE d_demandeAchatGame SET isAccepted = '1' WHERE idDemande = " + idDemande;
            req.mysql.query(query, function (error, results, fields) {
              if(error){
                tools.dSend(res, "NOK", "Store", "Validating", 500, error, null);
        	  	} else {
                req.mysql.query(query2, function (error, results2, fields) {
                  if(error){
                    tools.dSend(res, "NOK", "Store", "Validating", 500, error, null);
            	  	} else {
                    doNotif.createNotif(req, results1[0].idProf, idDemande, 1, "Votre demande d'achat a été validée par le directeur.");
                    tools.dSend(res, "OK", "Store", "Validating", 200, null, results);
                  }
                });
              }
            });
          } else {
            var query2 = "UPDATE d_demandeAchatGame SET isAccepted = '0' WHERE idDemande = " + idDemande;
            req.mysql.query(query2, function (error, results2, fields) {
              if(error){
                tools.dSend(res, "NOK", "Store", "Validating", 500, error, null);
            	  res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
            	 } else {
                 doNotif.createNotif(req, results1[0].idProf, idDemande, 1, "Votre demande d'achat n'a pas été validée par le directeur.");
                 tools.dSend(res, "OK", "Store", "Validating", 200, null, results1);
              }
            });
          }
  	  	}
    	});
  } else {
    tools.dSend(res, "NOK", "Store", "Validating", 500, "Parametres demandées : typeUser, idDemande", null);
  }
});
module.exports = router;
