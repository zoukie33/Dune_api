var express = require('express');
var router = express.Router();
var tools = require('../functions/tools');

/* GET users listing. */
router.get('/', function(req, res, next) {
	req.mysql.query('SELECT * from d_ecole', function (error, results, fields) {
	  	if(error){
				tools.dSend(res, "NOK", "Ecole", "Ecole", 500, error, null);
	  	} else {
				tools.dSend(res, "OK", "Ecole", "Ecole", 200, null, results);
	  	}
  	});
});

router.get('/:id?', function(req, res, next) {
	req.mysql.query('SELECT * from d_ecole WHERE id = ' + req.params.id , function (error, results, fields) {
	  	if(error){
				tools.dSend(res, "NOK", "Ecole", ":id", 500, error, null);
	  	} else {
				tools.dSend(res, "OK", "Ecole", ":id", 200, null, results);
	  	}
  	});
});



module.exports = router;
