var express = require('express');
var mysql   = require("mysql");
var router = express.Router();
var md5 = require("MD5");

/* GET users listing. */
router.get('/genToken', function(req, res, next) {
	var tokenTable = md5(Date.now());
	console.log(tokenTable);
	req.mysql.query('INSERT INTO d_tableProf (tokenTable) VALUES ("' + tokenTable + '")', function (error, results, fields) {
	  	if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
  			res.send(JSON.stringify({"status": 200, "error": null, "tokenTable": tokenTable}));
  			//If there is no error, all is good and response is 200OK.
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
  			//If there is no error, all is good and response is 200OK.
	  	}
  	});
});

router.post('/useToken', function(req, res, next) {
  var token = req.body.tokenTable;
	var idProf = req.body.idProf;
	req.mysql.query('SELECT * FROM d_tableProf WHERE tokenTable = "' + token + '"', function (error, results, fields) {
	  	if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
  			if (results[0].tokenTable == token){
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
				res.send(JSON.stringify({"status": 500, "error": error, "response": "ERREUR"}));
			}
  	}
});
});
module.exports = router;
