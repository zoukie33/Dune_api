var express = require('express');
var mysql   = require("mysql");
var router = express.Router();
var md5 = require("MD5");
var jwt = require('jsonwebtoken');
var config = require('../../config');
var tools = require('../../functions/tools');

/**
 * @api {post} /cnxTable/useToken Joining a Table with user (qrCode)
 * @apiName useToken
 * @apiGroup Table
 * @apiPermission notLogged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token TokenTable auth 
 * @apiParam {Int} idProf
 */

router.post('/useToken', function(req, res, next) {
  var token = req.body.tokenTable;
	var idProf = req.currUser.idUser;
	if (token && token.length === 32 && idProf) {
		req.mysql.query('SELECT * FROM d_tableProf WHERE tokenTable = "' + token + '"', function (error, results, fields) {
				if(error){
	        tools.dSend(res, "NOK", "Table", "/cnxTable/useToken", 500, error, null);
				} else {
					if (results.length > 0 && results[0].tokenTable == token){
						req.mysql.query('UPDATE d_tableProf SET idProf = ' + idProf + ' WHERE tokenTable = "' + token + '"', function (error, results, fields) {
							if(error){
				        tools.dSend(res, "NOK", "Table", "/cnxTable/useToken", 500, error, null);
							} else {
								res.send(JSON.stringify({"status": 200, "response": "User linked !"}));
								//If there is no error, all is good and response is 200OK.
							}
					});
				}
				else {
	        tools.dSend(res, "NOK", "Table", "/cnxTable/useToken", 500, "Le token n'existe pas.", null);
				}
			}
		});
	} else {
		tools.dSend(res, "NOK", "Table", "/cnxTable/useToken", 500, "idprof : " + idProf + "Le token est invalide : " + token, null);
	}

});
module.exports = router;
