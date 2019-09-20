var jwt = require('jsonwebtoken');
var mysql   = require("mysql");
var config = require('./config');



var verifyTokenAdmin=function (req, res, next) {
	var token = req.body.token || req.query.token || req.headers['token'];
	 if (token) {
		jwt.verify(token, config.secret, function (err, currUser) {
			if (err) {
				res.send(err);
			} else {
				req.currUser = currUser;
				if (req.currUser.typeUser == 4) {
					next();
				} else {
					res.status(401).send("Invalid Access");
				}
			}
		});
	}
	 else {
		res.status(401).send("Invalid Access");
	}
};
module.exports=verifyTokenAdmin;
