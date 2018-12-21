var express = require('express');
var mysql   = require("mysql");
var router = express.Router();

/**
 * @api {post} /store/ Getting all items in store
 * @apiName Store
 * @apiGroup Store
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {Int} idType
 */

router.post('/', function(req, res, next) {
	var idType = req.body.idType;
	if (idType == 0) {
		var query = "SELECT g.id, g.name as 'nomApp', c.nom as 'nomCreator', g.picPath FROM d_games AS g, d_creator as c WHERE g.creator = c.idCreator";
	} else {
		var query = "SELECT g.id, g.name as 'nomApp', c.nom as 'nomCreator', g.picPath FROM d_games AS g, d_creator as c WHERE g.creator = c.idCreator AND idType = " + idType;
	}
	req.mysql.query(query, function (error, results, fields) {
	  	if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
  			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  			//If there is no error, all is good and response is 200OK.
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
 * @apiParam {Int} idApp
 */

router.post('/getApp', function(req, res, next) {
  var idApp = req.body.idApp;
  if (idApp) {
    req.mysql.query('SELECT g.id, g.name, c.nom, g.picPath, g.path FROM d_games AS g, d_creator as c WHERE g.creator = c.idCreator AND g.id = ' + idApp, function (error, results, fields) {
  	  	if(error){
  	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
  	  		//If there is error, we send the error in the error section with 500 status
  	  	} else {
    			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    			//If there is no error, all is good and response is 200OK.
  	  	}
    	});
  } else {
    res.send(JSON.stringify({"status": 500, "response": "Parametre manquant : idApp"}));
  }
});

/**
 * @api {post} /store/getAppsEcole Getting apps already buyed by a school
 * @apiName getAppsEcole
 * @apiGroup Store
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {Int} idEcole
 */

router.post('/getAppsEcole', function(req, res, next) {
  var idEcole = req.body.idEcole;
  if (idEcole) {
    req.mysql.query('SELECT g.id, g.name, g.picPath, g.path FROM d_games AS g, d_gamesAppEcole AS ga WHERE g.id = ga.idGame AND ga.idEcole = ' + idEcole, function (error, results, fields) {
  	  	if(error){
  	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
  	  		//If there is error, we send the error in the error section with 500 status
  	  	} else {
    			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    			//If there is no error, all is good and response is 200OK.
  	  	}
    	});
  } else {
    res.send(JSON.stringify({"status": 500, "response": "Parametre manquant : idEcole"}));
  }
});

/**
 * @api {post} /store/buyApp Asking for buying an app by a prof
 * @apiName buyApp
 * @apiGroup Store
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {Int} idApp
 * @apiParam {Int} idProf
 * @apiParam {Int} idEcole
 * @apiParam {String} commentaire
 */

router.post('/buyApp', function(req, res, next) {
  var idApp = req.body.idApp;
  var idProf = req.body.idProf;
  var idEcole = req.body.idEcole;
  var commentaire = req.body.commentaire;

  if (idApp && idProf && idEcole) {
    if (commentaire) {
      var query = "INSERT INTO d_demandeAchatGame (idProf, idGame, idEcole, commentaire) VALUES ('" + idProf + "', '" + idApp + "', '" + idEcole + "', '" + commentaire + "')";
    } else {
      var query = "INSERT INTO d_demandeAchatGame (idProf, idGame, idEcole) VALUES ('" + idProf + "', '" + idApp + "', '" + idEcole + "')";
    }
    req.mysql.query(query, function (error, results, fields) {
  	  	if(error){
  	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
  	  	} else {
    			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  	  	}
    	});
  } else {
    res.send(JSON.stringify({"status": 500, "response": "Parametres necessaires: idApp, idProf, idEcole"}));
  }

});

/**
 * @api {post} /store/buyAppDirecteur Buying directly an App
 * @apiName buyAppDirecteur
 * @apiGroup Store
 * @apiPermission Logged + Director
 * @apiVersion 1.0.0
 *
 * @apiParam {Int} idApp
 * @apiParam {Int} idEcole
 */

router.post('/buyAppDirecteur', function(req, res, next) {
  var idApp = req.body.idApp;
  var idEcole = req.body.idEcole;
  var query = "SELECT * FROM d_gamesAppEcole WHERE idGame = " + idApp + " AND idEcole = " + idEcole;
  var query2 = "INSERT INTO d_demandeAchatGame (idGame, idEcole) VALUES ('" + idApp + "', '" + idEcole + "')";

  if (idApp && idEcole) {
    req.mysql.query(query, function (error, results, fields) {
  	  	if(results.length === 0){
          req.mysql.query(query2, function (error, results, fields) {
            if(error){
              res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
            } else {
              res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
            }
          });
  	  	} else {
          res.send(JSON.stringify({"status": 500, "response": "Application déjà achetée"}));
  	  	}
    	});
  } else {
    res.send(JSON.stringify({"status": 500, "response": "Parametres necessaires: idApp, idEcole"}));
  }

});

/**
 * @api {get} /store/typesGames Getting all games types
 * @apiName typesGames
 * @apiGroup Store
 * @apiPermission Logged + Director
 * @apiVersion 1.0.0
 */

router.get('/typesGames', function(req, res, next) {
	var query = "SELECT * FROM d_typeGames";
    req.mysql.query(query, function (error, results, fields) {
  	  	if(error){
  	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
  	  	} else {
    			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  	  	}
    	});
});
module.exports = router;
