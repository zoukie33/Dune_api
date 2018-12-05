var express = require('express');
var router = express.Router();
var generator = require('generate-password');
var md5 = require("MD5");
var mysql   = require("mysql");
var createAcc = require('../functions/mails/createAccount');
var filez = require('../functions/files/files');
var jwtDecode = require('../functions/tokens');
const fileUpload = require('express-fileupload');

/* GET users listing. */
router.get('/', function(req, res, next) {
	req.mysql.query('SELECT * from d_users', function (error, results, fields) {
	  	if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
  			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  			//If there is no error, all is good and response is 200OK.
	  	}
      console.log("user");
  	});
});

router.get('/:id?', function(req, res, next) {
	req.mysql.query('SELECT * from d_users WHERE idUser = ' + req.params.id , function (error, results, fields) {
	  	if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
  			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  			//If there is no error, all is good and response is 200OK.
	  	}
      console.log("user id");
  	});
});

router.post('/add', function(req, res, next) {

	if (jwtDecode.getPerms(req.body.token) == 2) {
		var query = "SELECT * FROM ?? WHERE ??=?";
	  var table = ["d_users", "emailUser", req.body.email];
	  query = mysql.format(query,table);

	  req.mysql.query(query,function(err,rows){
	  if(err) {
	    res.json({"Error" : true, "Message" : "Error executing MySQL query"});
	  }
	  else {
	    if(rows.length==0){
	      var password = generator.generate({
	        length: 8,
	        numbers: true
	      });
	      var directorId = req.body.directorId;
	    	var postData = {
	        nomUser:req.body.nom,
	        prenomUser:req.body.prenom,
	        emailUser:req.body.email,
	        pass: md5(password),
	        typeUser: 1,
	        access_token:"n/a",
	        device_type:"web"
	      }
	    	console.log(postData);

	      var query = "INSERT INTO ?? SET ?";
	      var table = ["d_users"];
	      query = mysql.format(query,table);

	    	req.mysql.query(query, postData, function(error, results, fields) {
	    		if (error){
	    			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
	    		} else {
						createAcc.sendCreateAccount(req.body.email, password);
	    			res.send(JSON.stringify({"status": 200, "error": null, "pass": password}));
	          console.log("Un User a été ajouté: " + postData);
	    		}
	    	  res.end(JSON.stringify(results));
	    	});
	    }
	    else {
	      res.send(JSON.stringify({"status": 501, "error": err, "response": "Un utilisateur est déja inscrit avec cet Email."}));
	    }
	  }
	  });
	}
	else {
		res.send(JSON.stringify({"status": 500, "response": "Access denied."}));
	}
});

router.post('/update', function(req, res, next) {
  var id  = req.body.idUser;
  var nom  = req.body.nomUser;
  var prenom  = req.body.prenomUser;
	let file;

	if (Object.keys(req.files).length != 0) {
		file = req.files.picProf;
		var fileName = id + "-prof.png";
		if (filez.filesGest(file, "profs/", fileName)) {
			var query = "UPDATE d_users SET nomUser = '"+ nom +"', prenomUser = '"+ prenom +"', picPath = '"+ fileName +"' WHERE idUser = " + id;
		} else {
			var query = "UPDATE d_users SET nomUser = '"+ nom +"', prenomUser = '"+ prenom +"', picPath = 'NULL'  WHERE idUser = " + id;
		}
				req.mysql.query(query, function(error, results, fields) {
					if (error){
						res.send(JSON.stringify({"status": 500, "error": error, "response": "Impossible de mettre a jour cet utilisateur."}));
					} else {
						res.send(JSON.stringify({"status": 200, "response": "User Updated"}));
						console.log("Un User a été mis a jour : [" + id + " - " + nom + " - " + prenom + "]");
					}
					res.end(JSON.stringify(results));
				});
			} else {
				res.send(JSON.stringify({"status": 500, "error": "Error uploading File"}));
			}
});

router.post('/picProf', function(req, res, next) {
	if (Object.keys(req.files).length != 0) {
		var id  = req.body.idUser;
		let file;

		file = req.files.picProf;
		var fileName = id + "-prof.png";
		if (filez.filesGest(file, "profs/", fileName)) {
			console.log("10");
			var query = "UPDATE d_users SET picPath = '" + fileName + "'  WHERE idUser = " + id;
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
