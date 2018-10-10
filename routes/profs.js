var express = require('express');
var crypto = require('crypto');
var router = express.Router();

function hashPassword(pass, salt) {
  var sum = crypto.createHash('sha256');
  sum.update(email + salt);
  return 'sha256$'+ sum.digest('hex');
}

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.locals.connection.query('SELECT * from d_profs', function (error, results, fields) {
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
	res.locals.connection.query('SELECT * from d_profs WHERE idProf = ' + req.params.id , function (error, results, fields) {
	  	if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
  			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  			//If there is no error, all is good and response is 200OK.
	  	}
  	});
});

router.post('/register', function(req, res, next) {





	var postData = req.body;
	console.log(postData);
	res.locals.connection.query('INSERT INTO d_profs SET ?',  postData, function(error, results, fields) {
		if (error){
			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
		} else {
			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
		}
	  res.end(JSON.stringify(results));
	});
});

module.exports = router;
