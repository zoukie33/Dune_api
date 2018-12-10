var express = require('express');
var mysql   = require("mysql");
var router = express.Router();

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

router.post('/validating', function(req, res, next) {
  var typeUser = req.body.typeUser;
  var idDemande = req.body.idDemande;

  if (typeUser && idDemande) {
    if (typeUser === 2) {
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

module.exports = router;
