var express = require('express');
var mysql   = require("mysql");
var router = express.Router();
const fileUpload = require('express-fileupload');
var filez = require('../functions/files/files');

/* GET users listing. */
router.get('/', function(req, res, next) {
	req.mysql.query('SELECT * from d_eleves', function (error, results, fields) {
	  	if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
  			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  			//If there is no error, all is good and response is 200OK.
	  	}
  	});
});


router.get('/:id?', function(req, res, next) {
	req.mysql.query('SELECT e.*, c.idClasse FROM d_eleves AS e, d_classeEleve AS c WHERE e.idEleve = c.idEleve AND e.idEleve = ' + req.params.id , function (error, results, fields) {
	  	if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
	  	} else {
  			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	  	}
  	});
});

router.post('/byClasse', function(req, res, next) {
	var idClasse = req.body.idClasse;
	if (idClasse) {
		req.mysql.query('SELECT e.nomEleve, e.prenomEleve FROM d_classeEleve as c, d_eleves as e WHERE e.idEleve = c.idEleve AND c.idClasse = ' + idClasse , function (error, results, fields) {
		  	if(error){
		  		res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
		  	} else {
					if (results.length != 0) {
						res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
					}
		  	}
	  	});
	}
	else {
		res.send(JSON.stringify({"status": 510, "error": "idClasse is missing"}));
	}
});

router.post('/byProf', function(req, res, next) {
	var idProf = req.body.idProf;
	if (idProf) {
		req.mysql.query('SELECT e.idEleve, e.nomEleve, e.prenomEleve, e.BAE, e.INE FROM d_eleves AS e, d_classeEleve AS ce, d_classe AS c, d_profsAppClasse AS pc, d_users AS u WHERE u.idUser = pc.idProf AND pc.idClasse = c.idClasse AND c.idClasse = ce.idClasse AND ce.idEleve = e.idEleve AND u.idUser = ' + idProf , function (error, results, fields) {
		  	if(error){
		  		res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
		  	} else {
					if (results.length != 0) {
						res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
					}
		  	}
	  	});
	}
	else {
		res.send(JSON.stringify({"status": 510, "error": "idProf is missing"}));
	}
});

router.post('/add', function(req, res, next) {
  var directorId = req.body.directorId;
	var postData = {
    nomEleve:req.body.nom,
    prenomEleve:req.body.prenom
  }
	console.log(postData);

  var query = "INSERT INTO ?? SET ?";
  var table = ["d_eleves"];
  query = mysql.format(query,table);

	req.mysql.query(query, postData, function(error, results, fields) {
		if (error){
			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
		} else {
			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
      console.log("Un élève a été ajouté : [" + nom + " - " + prenom + "]");
		}
	  res.end(JSON.stringify(results));
	});
});

router.post('/update', function(req, res, next) {
	var id  = req.body.idEleve;
  var nom  = req.body.nomEleve;
  var prenom  = req.body.prenomEleve;

  var query = "UPDATE d_eleves SET nomEleve = '"+ nom +"', prenomEleve = '"+ prenom +"' WHERE idEleve = " + id;

  req.mysql.query(query, function(error, results, fields) {
    if (error){
      res.send(JSON.stringify({"status": 500, "error": error, "response": "Impossible de mettre a jour cet élève."}));
    } else {
      res.send(JSON.stringify({"status": 200, "response": "Student Updated"}));
      console.log("Un élève a été mis a jour : [" + id + " - " + nom + " - " + prenom + "]");
    }
    res.end(JSON.stringify(results));
  });
});

router.post('/picEleve', function(req, res, next) {
	if (Object.keys(req.files).length != 0) {
		var id  = req.body.idEleve;
		let file;

		file = req.files.picEleve;
		var fileName = id + "-eleve.png";
		if (filez.filesGest(file, "eleves/", fileName)) {
			var query = "UPDATE d_eleves SET picPath = '" + fileName + "'  WHERE idEleve = " + id;
						req.mysql.query(query, function(error, results, fields) {
							if (error){
								res.send(JSON.stringify({"status": 500, "error": error, "response": "Impossible de mettre a jour cet utilisateur."}));
							} else {
								res.send(JSON.stringify({"status": 200, "response": "User Updated"}));
								console.log("Une photo User a été mis a jour : [" + fileName + "]");
							}
							res.end(JSON.stringify(results));
						});
		} else {
			res.send(JSON.stringify({"status": 500, "error": "shut"}));
		}
	} else {
		res.send(JSON.stringify({"status": 500, "error": "Error uploading File"}));
	}

});

module.exports = router;
