var express = require('express');
var mysql   = require("mysql");
var router = express.Router();
var jwt = require('jsonwebtoken');
var md5 = require("MD5");
var config = require('../config');
var mailer = require('express-mailer');
var generator = require('generate-password');

/* GET users listing. */
router.post('/', function(req, res, next) {
	var post = {
		email:req.body.email,
		password:req.body.password
	}
	console.log(post);
		var query = "SELECT * FROM ?? WHERE ??=? AND ??=?";

		var table = ["d_profs","pass",  md5(post.password), "emailProf", post.email];

		query = mysql.format(query,table);

		req.mysql.query(query,function(err,rows){
		if(err) {
			res.json({"Error" : true, "Message" : err});
		}
		else {
			if(rows.length==1){
				var token = jwt.sign({ id: rows[0].idProf }, config.secret, {
					expiresIn: '7d'
				});
				user_id= rows[0].idProf;
				var data  = {
					user_id:rows[0].idProf,
					device_type:rows[0].device_type,
					access_token:token,
					device_token:rows[0].device_token,
					ip_address:rows[0].ip_address
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
							currUser: user_id
						});
           				 }
           				});
			}
			else {
				res.json({"Error" : true, "Message" : "wrong email/password combination"});
			}
		}
	});
});

router.post('/reset', function(req, res, next) {
	var password = generator.generate({
		length: 8,
		numbers: true
	});
	var query = "INSERT INTO d_profs (pass) VALUES ?";
	var table = ["d_profs"];
	query = mysql.format(query,table);

	req.mysql.query(query, password, function(error, results, fields) {
		if (error){
			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
		} else {
			res.send(JSON.stringify({"status": 200, "error": null, "pass": password}));
			console.log("Le mot de passe a été changé pour un prof, envoi du mail.");
		}
	});

	mailer.extend(express, {
		from: 'noreply@dune.com',
		host: 'smtp.gmail.com', // hostname
		secureConnection: true, // use SSL
		port: 465, // port for secure SMTP
		transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
		auth: {
		user: 'dune.epitech.contact@gmail.com', // gmail id
		pass: 'fnbxfzmxfn33' // gmail password
		}
	});
	var email = req.body.nom;
	var mailOptions = {
    to: email,
    subject: 'Email from SMTP sever',
    user: {  // data to view template, you can access as - user.name
      name: 'Dune Reset password',
      message: 'Voici votre nouveau mot de passe : ' + password
    }
	}
	express.mailer.send('email', mailOptions, function (err, message) {
	   if (err) {
	     console.log(err);
	     res.send('There was an error sending the email');
	     return;
	   }
	   return res.send('Email has been sent!');
	 });
});

module.exports = router;
