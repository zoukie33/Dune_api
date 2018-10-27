var express = require('express');
var mysql   = require("mysql");
var router = express.Router();

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
	req.mysql.query('SELECT * from d_eleves WHERE idEleve = ' + req.params.id , function (error, results, fields) {
	  	if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
	  	} else {
  			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	  	}
  	});
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
      console.log("Un Prof a été ajouté : [" + nom + " - " + prenom + "]");
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

module.exports = router;
