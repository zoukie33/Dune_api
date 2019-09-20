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
  var tokenTable = md5(Date.now());
  var query = "INSERT INTO ?? (tokenTable, idTable) VALUES (?, ?)";
  var data = ["d_tableProf", tokenTable, req.body.idTable];
  query = mysql.format(query, data);
	req.mysql.query(query, function (error, results, fields) {
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
  var query = "DELETE FROM ?? WHERE tokenTable = ?";
  var data = ["d_tableProf", req.body.tokenTable];
  query = mysql.format(query, data);
	req.mysql.query(query, function (error, results, fields) {
	  	if(error){
        tools.dSend(res, "NOK", "Table", "/cnxTable/delToken", 500, error, null);
	  	} else {
        tools.dSend(res, "OK", "Table", "/cnxTable/delToken", 200, null, "Token deleted : " + req.body.tokenTable);
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
  var query = "SELECT idProf, idTable FROM ?? WHERE tokenTable = ?";
  var data = ["d_tableProf", token];
  query = mysql.format(query, data);
	req.mysql.query(query, function (error, results, fields) {
	  	if(error){
        tools.dSend(res, "NOK", "Table", "/cnxTable/verifToken", 500, error, null);
	  		} else {
				if (results.length > 0) {
					var idProf = results[0].idProf;
					if (idProf == 0) {
						tools.dSend(res, "NOK", "Table", "/cnxTable/verifToken", 510, "Token pas encore utilisé : " + token, null);
					} else if (idProf > 0) {
						var query2 = "SELECT * FROM ?? WHERE idUser = ?";
					  var data = ["d_users", idProf];
					  query2 = mysql.format(query2, data);
						var idTable = results[0].idTable;
						req.mysql.query(query2, function (error, prof, fields) {
						if (error) {
							tools.dSend(res, "NOK", "Table", "/cnxTable/verifToken", 500, error, "Récupération des informations du prof");
						} else {
							var query3 = "SELECT idEcole FROM ?? as a WHERE a.idProf = ?";
						  var data = ["d_profsAppEcole", idProf];
						  query3 = mysql.format(query3, data);
							req.mysql.query(query3,function(error,resu) {
								if (error) {
									tools.dSend(res, "NOK", "Table", "/cnxTable/verifToken", 500, error, "Récupération des informations du prof2");
								} else {
									idEcole = resu[0].idEcole;
									var authToken = jwt.sign({
										idUser: idProf,
										typeUser: prof[0].typeUser,
										emailUser: prof[0].emailUser,
										idEcole: idEcole,
										idTable: idTable,
										perm: 4
									}, config.secret, {expiresIn: '7d'});
									var query4 = "UPDATE ?? SET access_token = ? WHERE idTable = ?";
								  var data = ["d_tables", authToken, idTable];
								  query4 = mysql.format(query4, data);
									req.mysql.query(query4,function(error,resu) {
										if (error) {
											tools.dSend(res, "NOK", "Table", "/cnxTable/verifToken", 500, error, "Envoi du token dans la bdd");
										} else {
											res.send(JSON.stringify({"status": 200, "idProf": idProf, "token": authToken}));
											tools.dLog("OK", "Table", "/cnxTable/verifToken", 200, null, '"idProf":' + idProf + '"token": ' + authToken);
										}
									});
								}
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
	var query = "SELECT * FROM ?? AS l WHERE l.serial = ?";
	var query2 = "UPDATE ?? SET used = 1 WHERE serial = ?";
	var data = ["d_licencesTables", licenceEcole];
	query = mysql.format(query, data);
	query2 = mysql.format(query2, data);

	req.mysql.query(query, function(error, results, fields) {
		if (error){
			tools.dSend(res, "NOK", "Table", "/cnxTable/install", 500, error, null);
		} else {
			if (results.length != 0) {
				req.mysql.query("INSERT INTO d_tables (nomTable, access_token, idSerial) VALUES ('" + nomTable + "', 'NULL', " + results[0].idLicence + ")", function(error, results2, fields) {
					if (error){
		        tools.dSend(res, "NOK", "Table", "/cnxTable/install", 500, error, null);
					} else {
						req.mysql.query(query2, function(error, results, fields) {
							if (error){
				        tools.dSend(res, "NOK", "Table", "/cnxTable/install", 500, error, null);
							} else {
								tools.dSend(res, "OK", "Table", "/cnxTable/install", 200, null, "Table Installed");
							}
						});
					}
				});
			} else {
				tools.dSend(res, "NOK", "Table", "/cnxTable/install", 500, "Licence Not found.", null);
			}
		}
	});
});
module.exports = router;
