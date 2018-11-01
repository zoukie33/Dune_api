var express = require('express');
var mysql   = require("mysql");
var router = express.Router();
var jwt = require('jsonwebtoken');
var md5 = require("MD5");
var config = require('../config');
var generator = require('generate-password');
var resetPass = require('../functions/mails/resetPass');

/* GET users listing. */
router.post('/', function(req, res, next) {
	var post = {
		email:req.body.email,
		password:req.body.password
	}
	console.log(post);
		var query = "SELECT * FROM ?? WHERE ??=? AND ??=?";

		var table = ["d_users","pass",  md5(post.password), "emailUser", post.email];

		query = mysql.format(query,table);

		req.mysql.query(query,function(err,rows){
		if(err) {
			res.json({"Error" : true, "Message" : err});
		}
		else {
			if(rows.length==1){
				var token = jwt.sign({ id: rows[0].idUser }, config.secret, {
					expiresIn: '7d'
				});
				typeUser = rows[0].typeUser;
				user_id= rows[0].idUser;
				var data  = {
					user_id:rows[0].idUser,
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
							currUser: user_id,
							typeUser: typeUser
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

module.exports = router;
