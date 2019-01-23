var express = require('express');
var router = express.Router();
var generator = require('generate-password');
var md5 = require("MD5");
var mysql   = require("mysql");
var manageAccount = require('../functions/mails/manageAccount');
var filez = require('../functions/files/files');
var jwtDecode = require('../functions/tokens');
const fileUpload = require('express-fileupload');

/**
 * @api {get} /users/ Request All Users
 * @apiName GetUsers
 * @apiGroup Users
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 *
 * @apiSuccess {Int} idUser Id de l'utilisateur.
 * @apiSuccess {String} nomUser Nom de l'utilisateur.
 * @apiSuccess {String} prenomUser Prénom de l'utilisateur.
 * @apiSuccess {String} emailUser  Email de l'utilisateur.
 * @apiSuccess {String} pass  Mot de passe de l'utilisateur.
 * @apiSuccess {Int} typeUser  Type de l'utilisateur.
 * @apiSuccess {String} picPath  Photo de l'utilisateur.
 * @apiSuccess {Text} access_token  Token de l'utilisateur.
 * @apiSuccess {String} device_type  Type de device utilisé.
 *
 * @apiSuccessExample Success-Response:
 * {
 *    "status": 200,
 *    "error": null,
 *    "response": [
 *        {
 *            "idUser": 0,
 *            "nomUser": "blank",
 *            "prenomUser": "blank",
 *            "emailUser": "blank@blank.com",
 *            "pass": "04b2c7d23cdd19843241b20b331992a7",
 *            "typeUser": 3,
 *            "picPath": null,
 *            "access_token": "TokenAuth",
 *            "device_type": "web"
 *        }
 * }
 *
 * @apiDescription Route permettant la récupération de tous les utilisateurs.
 */
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

/**
 * @api {get} /users/infos/:idUser Request User information
 * @apiName infos/:idUser
 * @apiGroup Users
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 *
 * @apiSuccess {Int} idUser Id de l'utilisateur.
 * @apiSuccess {String} nomUser Nom de l'utilisateur.
 * @apiSuccess {String} prenomUser Prénom de l'utilisateur.
 * @apiSuccess {String} emailUser  Email de l'utilisateur.
 * @apiSuccess {String} pass  Mot de passe de l'utilisateur.
 * @apiSuccess {Int} typeUser  Type de l'utilisateur.
 * @apiSuccess {String} picPath  Photo de l'utilisateur.
 * @apiSuccess {Text} access_token  Token de l'utilisateur.
 * @apiSuccess {String} device_type  Type de device utilisé.
 *
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "error": null,
 *     "response": [
 *         {
 *             "idUser": 0,
 *             "nomUser": "blank",
 *             "prenomUser": "blank",
 *             "emailUser": "blank@blank.com",
 *             "pass": "04b2c7d23cdd19843241b20b331992a7",
 *             "typeUser": 3,
 *             "picPath": null,
 *             "access_token": "n/a",
 *             "device_type": "web"
 *         }
 *     ]
 * }
 *
 * @apiDescription Route permettant la récupération d'un utilisateur.
 */

router.get('/infos/:idUser', function(req, res, next) {
	req.mysql.query('SELECT * from d_users WHERE idUser = ' + req.params.idUser , function (error, results, fields) {
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

/**
 * @api {get} /users/infos Request UserLogged information
 * @apiName infos
 * @apiGroup Users
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 *
 * @apiSuccess {Int} idUser Id de l'utilisateur.
 * @apiSuccess {String} nomUser Nom de l'utilisateur.
 * @apiSuccess {String} prenomUser Prénom de l'utilisateur.
 * @apiSuccess {String} emailUser  Email de l'utilisateur.
 * @apiSuccess {String} pass  Mot de passe de l'utilisateur.
 * @apiSuccess {Int} typeUser  Type de l'utilisateur.
 * @apiSuccess {String} picPath  Photo de l'utilisateur.
 * @apiSuccess {Text} access_token  Token de l'utilisateur.
 * @apiSuccess {String} device_type  Type de device utilisé.
 *
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "error": null,
 *     "response": [
 *         {
 *             "idUser": 0,
 *             "nomUser": "blank",
 *             "prenomUser": "blank",
 *             "emailUser": "blank@blank.com",
 *             "pass": "04b2c7d23cdd19843241b20b331992a7",
 *             "typeUser": 3,
 *             "picPath": null,
 *             "access_token": "n/a",
 *             "device_type": "web"
 *         }
 *     ]
 * }
 *
 * @apiDescription Route permettant la récupération d'un utilisateur.
 */

router.get('/infos', function(req, res, next) {
	req.mysql.query('SELECT * from d_users WHERE idUser = ' + req.currUser.idUser , function (error, results, fields) {
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

/**
 * @api {post} /users/add Create new User
 * @apiName AddUser
 * @apiGroup Users
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {String} nom Nome de l'utilisateur.
 * @apiParam {String} prenom Prénom de l'utilisateur.
 * @apiParam {String} email Email de l'utilisateur
 *
 *
 * @apiDescription Route permettant la création d'un utilisateur.
 *
 */

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
						manageAccount.sendCreateAccount(req.body.email, password);
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

/**
 * @api {put} /users/update Update an User
 * @apiName updateUser
 * @apiGroup Users
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {Int} idUser Id de l'utilisateur.
 * @apiParam {String} nomUser Nom de l'utilisateur.
 * @apiParam {String} prenomUser Prénom de l'utilisateur.
 *
 *
 * @apiDescription Route permettant la mise à jour d'un utilisateur.
 *
 */

router.put('/update', function(req, res, next) {
  var id  = req.body.idUser;
  var nom  = req.body.nomUser;
  var prenom  = req.body.prenomUser;
  console.log(id + " - " + nom + " - " + prenom);
			var query = "UPDATE d_users SET nomUser = '"+ nom +"', prenomUser = '"+ prenom +"' WHERE idUser = " + id;
				req.mysql.query(query, function(error, results, fields) {
					if (error){
						res.send(JSON.stringify({"status": 500, "error": error, "response": "Impossible de mettre a jour cet utilisateur."}));
					} else {
						res.send(JSON.stringify({"status": 200, "response": "User Updated"}));
						console.log("Un User a été mis a jour : [" + id + " - " + nom + " - " + prenom + "]");
					}
					res.end(JSON.stringify(results));
				});
});

/**
 * @api {put} /users/picProf Uploading an Users picture
 * @apiName picProf
 * @apiGroup Users
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {Int} idUser Id de l'utilisateur.
 * @apiParam {File} picProf Image de l'utilisateur a uploader.
 *
 *
 * @apiDescription Route permettant l'upload de la photo d'un utilisateur.
 *
 */

router.put('/picProf', function(req, res, next) {
	if (Object.keys(req.files).length != 0) {
		var id  = req.body.idUser;
		let file;

		file = req.files.picProf;
		var fileName = id + "-prof.png";
		if (filez.filesGest(file, "profs/", fileName)) {
			console.log("idProf pour photo: " + id);
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

/**
 * @api {put} /users/changePassword Changing an Users password
 * @apiName changePassword
 * @apiGroup Users
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {String} oldPassword Ancien mot de passe.
 * @apiParam {String} newPassword Nouveau mot de passe.
 *
 *
 * @apiDescription Route permettant le changement de mot de passe d'un utilisateur.
 *
 */

router.put('/changePassword', function(req, res, next) {
		var idUser  = req.currUser.idUser;
		var oldPassword = req.body.oldPassword;
		var newPassword = req.body.newPassword;

		if (idUser && oldPassword && newPassword) {
      if (newPassword.length >= 8) {
        var query = "SELECT pass FROM d_users WHERE idUser = " + idUser;
  			req.mysql.query(query,function(err,rows) {
  				if(err) {
  					res.json({"Error" : true, "Message" : err});
  				} else {
  					if (rows[0].pass == md5(oldPassword)) {
  						var query = "UPDATE d_users SET pass = '"+ md5(newPassword) +"' WHERE idUser = " + idUser;
  						req.mysql.query(query,function(err,rows) {
  							if(err) {
  								res.json({"Error" : true, "Message" : err});
  							} else {
                  manageAccount.sendChangePassword(req.currUser.emailUser);
  								res.send(JSON.stringify({"status": 200, "response": "Password changed."}));
  							}
  						});
  					} else {
  						res.send(JSON.stringify({"status": 500, "error": "Invalid old password."}));
  					}
  				}
  			});
      } else {
        res.send(JSON.stringify({"status": 500, "error": "Votre mot de passe doit être supérieur ou égal à 8 caractères."}));
      }
		} else {
			res.send(JSON.stringify({"status": 500, "error": "Un de ces paramètres manquent dans le body: idUser, oldPassword, newPassword."}));
		}
});

/**
 * @api {put} /users/changeEmail Changing an Users Email
 * @apiName changeEmail
 * @apiGroup Users
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {String} password Mot de passe de l'utilisateur.
 * @apiParam {String} newEmail Nouvel Emai lde l'utilisateur.
 *
 *
 * @apiDescription Route permettant le changement de l'email d'un utilisateur.
 *
 */

router.put('/changeEmail', function(req, res, next) {
		var idUser  = req.currUser.idUser;
		var password = req.body.password;
		var newEmail = req.body.newEmail;

		if (idUser && password && newEmail) {
			var query = "SELECT pass FROM d_users WHERE idUser = " + idUser;
			req.mysql.query(query,function(err,rows) {
				if(err) {
					res.json({"Error" : true, "Message" : err});
				} else {
					if (rows[0].pass == md5(password)) {
						var query2 = "SELECT idUser FROM d_users WHERE emailUser = '" + newEmail + "'";
						req.mysql.query(query2,function(err,rows) {
							if(err) {
								res.json({"Error" : true, "Message" : err});
							} else {
								if (rows.length == 0) {
									var query3 = "UPDATE d_users SET emailUser = '"+ newEmail +"' WHERE idUser = " + idUser;
									req.mysql.query(query3,function(err,rows) {
										if(err) {
											res.json({"Error" : true, "Message" : err});
										} else {
          						manageAccount.sendChangeEmail(newEmail);
											res.send(JSON.stringify({"status": 200, "response": "Email changed."}));
										}
									});
								} else {
									res.send(JSON.stringify({"status": 500, "error": "This Email already exist."}));
								}
							}
						});
					} else {
						res.send(JSON.stringify({"status": 500, "error": "Invalid password."}));
					}
				}
			});
		} else {
			res.send(JSON.stringify({"status": 500, "error": "Un de ces paramètres manquent dans le body: idUser, oldPassword, newPassword."}));
		}
});
module.exports = router;
