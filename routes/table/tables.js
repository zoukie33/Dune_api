var express = require('express');
var mysql   = require("mysql");
var router = express.Router();
var serial = require("generate-serial-key");

/* GET users listing. */
router.get('/', function(req, res, next) {
	req.mysql.query('SELECT * from d_tables', function (error, results, fields) {
	  	if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
  			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  			//If there is no error, all is good and response is 200OK.
	  	}
  	});
});

router.post('/update', function(req, res, next) {
	// var id  = req.body.idEleve;
  // var nom  = req.body.nomEleve;
  // var prenom  = req.body.prenomEleve;
  //
  // var query = "UPDATE d_eleves SET nomEleve = '"+ nom +"', prenomEleve = '"+ prenom +"' WHERE idEleve = " + id;
  //
  // req.mysql.query(query, function(error, results, fields) {
  //   if (error){
  //     res.send(JSON.stringify({"status": 500, "error": error, "response": "Impossible de mettre a jour cet élève."}));
  //   } else {
  //     res.send(JSON.stringify({"status": 200, "response": "Student Updated"}));
  //     console.log("Un élève a été mis a jour : [" + id + " - " + nom + " - " + prenom + "]");
  //   }
  //   res.end(JSON.stringify(results));
  // });
});


router.post('/genLicence', function(req, res, next) {
	var nbLicences = req.body.nbLicences;
	var tabLicence = [];
	var idEcole = req.body.idEcole;

	if (nbLicences == 0) {
		res.send(JSON.stringify({"status": 500, "error": error, "response": "nbLicences doit être supérieur à 0."}));
	} else if (nbLicences > 50) {
		res.send(JSON.stringify({"status": 500, "error": error, "response": "nbLicences doit être inférieur o égal à 50."}));
	} else if (idEcole == "") {
		res.send(JSON.stringify({"status": 500, "error": error, "response": "idEcole manquant."}));
	} else {
		for (var i = nbLicences; i > 0; i--) {
			tabLicence.push(serial.generate());
		}
		res.send(JSON.stringify({"status": 200, "response": tabLicence}));
	}
});
module.exports = router;
