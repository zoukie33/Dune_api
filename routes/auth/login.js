var express = require('express');
var mysql   = require("mysql");
var router = express.Router();
var jwt = require('jsonwebtoken');
var md5 = require("MD5");
var config = require('../../config');
var generator = require('generate-password');
var resetPass = require('../../functions/mails/resetPass');

/**
 * @api {post} /login/ Login an User
 * @apiName Login
 * @apiGroup Auth
 * @apiPermission Public
 * @apiVersion 1.0.0
 *
 * @apiError 502 Aucun utilisateur ne correspond à ces identifiants.
 * @apiError 500 SQL Error
 * @apiError 500 Erreur d'ajout de token dans la base User.
 * @apiParam {String} email Email de l'utilisateur
 * @apiParam {String} password Mot de passe de l'utilisateur
 * @apiDescription Route permettant à un utilisateur de se connecter.
 */

router.post('/', function(req, res, next) {
	var post = {
		email:req.body.email,
		password:req.body.password
	}
	console.log(post);
		var query = "SELECT u.*, a.idEcole FROM d_users as u, d_profsAppEcole as a WHERE u.idUser = a.idProf AND u.pass='"+ md5(post.password) +"' AND u.emailUser= '" + post.email +"'";
		req.mysql.query(query,function(err,rows){
		if(err) {
			res.json({"Error" : true, "Message" : err});
		}
		else {
			if(rows.length==1){
				typeUser = rows[0].typeUser;
				user_id = rows[0].idUser;
				idEcole = rows[0].idEcole;
				emailUser = rows[0].emailUser;
				var token = jwt.sign({ idUser: user_id, typeUser: typeUser, emailUser: emailUser, idEcole: idEcole }, config.secret, {
					expiresIn: '7d'
				});

				var data  = {
					user_id:rows[0].idUser,
					device_type:rows[0].device_type,
					access_token:token
				}

				var query = "INSERT INTO  ?? SET  ?";
				var table = ["access_token"];
				query = mysql.format(query,table);

				req.mysql.query(query, data, function(err,rows){
					if(err) {
						res.send(JSON.stringify({"status": 500, "error": error, "response":"Error executing MySQL query"}));
					} else {
						res.json({
							status: 200,
							success: true,
							message: 'Token generated',
							token: token,
							typeUser: typeUser
						});
          }
        });

				var query = "UPDATE d_users SET access_token = '"+ token +"' WHERE idUser = " + user_id;

				req.mysql.query(query, function(error, results, fields) {
			    if (error){
			      res.send(JSON.stringify({"status": 500, "error": error, "response": "Erreur d'ajout de token dans la base User."}));
			    } else {
			      console.log("Un Token a été mis a jour : [" + token + "]");
			    }
			  });

			}	else {
				res.send(JSON.stringify({"status": 502, "error": err, "response": "Aucun utilisateur ne correspond à ces identifiants."}));
			}
		}
	});
});

/**
 * @api {post} /login/reset Forget password
 * @apiName Reset
 * @apiGroup Auth
 * @apiPermission Public
 * @apiVersion 1.0.0
 *
 * @apiError 502 Aucun utilisateur ne correspond à ces identifiants.
 * @apiError 500 SQL Error
 * @apiParam {String} email Email de l'utilisateur
 * @apiDescription Route permettant à un utilisateur de générer un nouveau mot de passe.
 */

router.post('/reset', function(req, res, next) {
	var email = req.body.email;
	var query = "SELECT * FROM ?? WHERE ??=?";
  var table = ["d_users", "emailUser", email];
  query = mysql.format(query,table);

	req.mysql.query(query,function(err,rows){
		if(err) {
	    res.json({"Error" : true, "Message" : "Error executing MySQL query"});
	  }
		else {
			if(rows.length != 0){
				var password = generator.generate({
					length: 8,
					numbers: true
				});

				req.mysql.query("UPDATE d_users SET pass = '" + md5(password) + "' WHERE emailUser = '" + email + "'", function(error, results, fields) {
					if (error){
						res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
					} else {
						resetPass.sendPasswordReset(email, password);
						res.send(JSON.stringify({"status": 200, "error": null, "pass": password}));
					}
				});
			}	else {
				res.send(JSON.stringify({"status": 502, "error": err, "response": "Aucun utilisateur ne correspond à ces identifiants."}));
			}
		}
	});
});

module.exports = router;
