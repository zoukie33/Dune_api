var express = require('express');
var mysql   = require("mysql");
var router = express.Router();
var md5 = require("MD5");
var jwt = require('jsonwebtoken');
var config = require('../../config');
var tools = require('../../functions/tools');

/**
 * @api {post} /cnxTable/genToken Generating a token Table
 * @apiName genToken
 * @apiGroup Table
 * @apiPermission notLogged
 * @apiVersion 1.0.0
 *
 * @apiParam {Int} idTable
 */

router.post('/genToken', function(req, res, next) {
	var idTable = req.body.idTable;
	var tokenTable = md5(Date.now());
	req.mysql.query('INSERT INTO d_tableProf (tokenTable, idTable) VALUES ("' + tokenTable + '", "' + idTable + '")', function (error, results, fields) {
	  	if(error){
        tools.dSend(res, "NOK", "Table", "/cnxTable/genToken", 500, error, null);
	  	} else {
				tools.dLog("OK", "Table", "/cnxTable/genToken", 200, null, '"tokenTable": tokenTable');
  			res.send(JSON.stringify({"status": 200, "error": null, "tokenTable": tokenTable}));
	  	}
  	});
});

/**
 * @api {post} /cnxTable/delToken Deleting a token Table
 * @apiName delToken
 * @apiGroup Table
 * @apiPermission notLogged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token TokenTable auth
 */

router.post('/delToken', function(req, res, next) {
  var token = req.body.tokenTable;
	req.mysql.query('DELETE FROM d_tableProf WHERE tokenTable = "' + token + '"', function (error, results, fields) {
	  	if(error){
        tools.dSend(res, "NOK", "Table", "/cnxTable/delToken", 500, error, null);
	  	} else {
        tools.dSend(res, "OK", "Table", "/cnxTable/delToken", 200, null, "Token deleted : " + token);
	  	}
  	});
});

/**
 * @api {post} /cnxTable/verifToken Verifying a token Table
 * @apiName verifToken
 * @apiGroup Table
 * @apiPermission notLogged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token TokenTable auth 
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "idProf": 1,
 *     "token": letoken
 * }
 */

router.post('/verifToken', function(req, res, next) {
	var token = req.body.tokenTable;
	req.mysql.query('SELECT idProf, idTable FROM d_tableProf WHERE tokenTable = "' + token + '"', function (error, results, fields) {
	  	if(error){
        tools.dSend(res, "NOK", "Table", "/cnxTable/verifToken", 500, error, null);
	  		} else {
				if (results.length > 0) {
					var idProf = results[0].idProf;
					if (idProf == 0) {
						tools.dSend(res, "NOK", "Table", "/cnxTable/verifToken", 510, "Token pas encore utilisé : " + token, null);
					} else if (idProf > 0) {
						var idTable = results[0].idTable;
						req.mysql.query('SELECT * FROM d_users WHERE idUser = "' + idProf + '"', function (error, prof, fields) {
						if (error) {
							tools.dSend(res, "NOK", "Table", "/cnxTable/verifToken", 500, error, "Récupération des informations du prof");
						} else {
								var query2 = "SELECT idEcole FROM d_profsAppEcole as a WHERE a.idProf = " + idProf;
							req.mysql.query(query2,function(err,resu) {
								idEcole = resu[0].idEcole;
								var authToken = jwt.sign({
									idUser: idProf,
									typeUser: prof[0].typeUser,
									emailUser: prof[0].emailUser,
									idEcole: idEcole,
									idTable: idTable,
									perm: 4
								}, config.secret, {expiresIn: '7d'});
								res.send(JSON.stringify({"status": 200, "idProf": idProf, "token": authToken}));
								tools.dLog("OK", "Table", "/cnxTable/verifToken", 200, null, '"idProf":' + idProf + '"token": ' + authToken);
							});
							}
					});
				}
	  	}
  	}
	});
});

/**
 * @api {post} /cnxTable/install Installing a new Table
 * @apiName install
 * @apiGroup Table
 * @apiPermission notLogged
 * @apiVersion 1.0.0
 *
 * @apiParam {String} licence
 * @apiParam {String} nom
 */

router.post('/install', function(req, res, next) {
	var licenceEcole = req.body.licence;
	var nomTable = req.body.nom;

	if (licenceEcole === "123") {
		req.mysql.query("INSERT INTO d_tables (nomTable, access_token) VALUES ('" + nomTable + "', '" + token + "')", function(error, results, fields) {
			if (error){
        tools.dSend(res, "NOK", "Table", "/cnxTable/install", 500, error, null);
			} else {
				res.send(JSON.stringify({"status": 200, "error": null, "token": token}));
				tools.dLog("OK", "Table", "/cnxTable/install", 200, null, '"token":' + token);
			}
		  res.end(JSON.stringify(results));
		});
	} else {
		tools.dSend(res, "NOK", "Table", "/cnxTable/install", 500, "Licence Not found.", null);
	}

});

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
