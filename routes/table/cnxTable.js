var express = require('express');
var mysql   = require("mysql");
var router = express.Router();
var md5 = require("MD5");
var jwt = require('jsonwebtoken');
var config = require('../../config');

/* GET users listing. */
router.post('/genToken', function(req, res, next) {
	var idTable = req.body.idTable;
	var tokenTable = md5(Date.now());
	console.log(tokenTable);
	req.mysql.query('INSERT INTO d_tableProf (tokenTable, idTable) VALUES ("' + tokenTable + '", "' + idTable + '")', function (error, results, fields) {
	  	if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
  			res.send(JSON.stringify({"status": 200, "error": null, "tokenTable": tokenTable}));
	      console.log("Un token a été généré : [" + tokenTable + " - " + idTable + "]");
	  	}
  	});
});

router.post('/delToken', function(req, res, next) {
  var token = req.body.tokenTable;
	req.mysql.query('DELETE FROM d_tableProf WHERE tokenTable = "' + token + '"', function (error, results, fields) {
	  	if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
  			res.send(JSON.stringify({"status": 200, "response": "Token deleted."}));
	      console.log("Un token a été supprimé : [" + token + "]");
	  	}
  	});
});

router.post('/verifToken', function(req, res, next) {
	var token = req.body.tokenTable;
	req.mysql.query('SELECT idProf FROM d_tableProf WHERE tokenTable = "' + token + '"', function (error, results, fields) {
	  	if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
				console.log("token null");
	  	} else {
				if (results.length > 0) {
					var idProf = results[0].idProf
					if (idProf == 0) {
						res.send(JSON.stringify({"status": 510, "error": "Token pas utilisé"}));
						console.log("nope");
					} else if (idProf > 0) {
						res.send(JSON.stringify({"status": 200, "idProf": idProf}));
						console.log("Token utilisé, avec l'idProf : " + idProf);
					}
				}
	  	}
  	});
});

router.post('/install', function(req, res, next) {
	var licenceEcole = req.body.licence;
	var nomTable = req.body.nom;
	var token = jwt.sign({ id: nomTable, perm: 4 }, config.secret, {
		expiresIn: '3650d'
	});
	console.log("Install demandée : [" + nomTable + " - " + licenceEcole + "]");
	if (licenceEcole === "123") {
		req.mysql.query("INSERT INTO d_tables (nomTable, access_token) VALUES ('" + nomTable + "', '" + token + "')", function(error, results, fields) {
			if (error){
				res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
			} else {
				res.send(JSON.stringify({"status": 200, "error": null, "token": token}));
	      console.log("Une Table a été ajoutée : [" + nomTable + " - " + licenceEcole + "]");
			}
		  res.end(JSON.stringify(results));
		});
	} else {
		res.send(JSON.stringify({"status": 500, "response": "Licence Not found."}));
	}

});

router.post('/useToken', function(req, res, next) {
  var token = req.body.tokenTable;
	var idProf = req.body.idProf;
	if (token && token.length === 32 && idProf) {
		req.mysql.query('SELECT * FROM d_tableProf WHERE tokenTable = "' + token + '"', function (error, results, fields) {
				if(error){
					res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
					//If there is error, we send the error in the error section with 500 status
				} else {
					if (results.length > 0 && results[0].tokenTable == token){
						req.mysql.query('UPDATE d_tableProf SET idProf = ' + idProf + ' WHERE tokenTable = "' + token + '"', function (error, results, fields) {
							if(error){
								res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
								//If there is error, we send the error in the error section with 500 status
							} else {
								res.send(JSON.stringify({"status": 200, "response": "User linked !"}));
								//If there is no error, all is good and response is 200OK.
							}
					});
				}
				else {
					res.send(JSON.stringify({"status": 510, "response": "ERREUR"}));
				}
			}
		});
	} else {
		res.send(JSON.stringify({"status": 500, "response": "ERREUR"}));
	}

});
module.exports = router;
