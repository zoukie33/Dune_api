var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	req.mysql.query('SELECT * from d_classeEcole', function (error, results, fields) {
	  	if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
  			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  			//If there is no error, all is good and response is 200OK.
	  	}
  	});
});

router.get('/:idClasse?', function(req, res, next) {
	req.mysql.query('SELECT * from d_classeEcole WHERE idClasse = ' + req.params.id , function (error, results, fields) {
	  	if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
  			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  			//If there is no error, all is good and response is 200OK.
	  	}
  	});
});

router.post('/add', function(req, res, next) {
	var postData = req.body;
	console.log(postData);
	req.mysql.query('INSERT INTO d_classeEcole SET ?',  postData, function(error, results, fields) {
		if (error){
			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
		} else {
			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
		}
	  res.end(JSON.stringify(results));
	});
});

module.exports = router;
