var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/prof/:mail?/:pass?', function(req, res, next) {
	res.locals.connection.query('SELECT * from d_profs WHERE emailProf = "' + req.params.mail + '"', function (error, results, fields) {
	  	if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
	  		//If there is error, we send the error in the error section with 500 status
	  	} else if (req.params.pass == "pass"){
  			res.send(JSON.stringify({"status": 200, "error": null, "response": "Correct account"}));
  			//If there is no error, all is good and response is 200OK.
	  	}
      else {
        res.send(JSON.stringify({"status": 500, "error": error, "response": "LOGIN ERROR"}));
      }
  	});
});

router.get('/reset/:mail?', function(req, res, next) {
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

module.exports = router;
