var express = require('express');
var mysql   = require("mysql");
var router = express.Router();
var serial = require("generate-serial-key");
var tools = require('../../functions/tools');

/* GET users listing. */
router.get('/appsOnTable', function(req, res, next) {
  var query = 'SELECT idGame from d_tableGames WHERE idTable = ' + req.currUser.idTable;

	req.mysql.query(query, function (error, results, fields) {
	  	if(error){
        tools.dSend(res, "NOK", "Table-gestApps", "/", 500, error, null);
	  	} else {
        tools.dSend(res, "OK", "Table-gestApps", "/", 200, null, results);
	  	}
  	});
});


module.exports = router;
