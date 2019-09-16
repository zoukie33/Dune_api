var express = require('express');
var mysql   = require("mysql");
var serial = require("generate-serial-key");
var router = express.Router();
var filez = require('../../functions/files/files');
var tools = require('../../functions/tools');

/**
 * @api {delete} /admin/delete/deleteLicence/:idLicence Delete a licence
 * @apiName deleteLicence
 * @apiGroup AdminDelete
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {Int} idLicence Id licence
 * @apiHeader {String} token AdminToken auth
 * @apiDescription Route permettant de supprimer une licence.
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "error": null,
 *     "response": {
 *        "fieldCount": 0,
 *        "affectedRows": 1,
 *        "insertId": 0,
 *        "serverStatus": 2,
 *        "warningCount": 0,
 *        "message": "",
 *        "protocol41": true,
 *        "changedRows": 0
 *    }
 * }
 */

router.delete('/deleteLicence/:idLicence', function(req, res, next) {
  var idLicence = req.params.idLicence;

    var query = "DELETE FROM d_licencesTables WHERE idLicence = " + idLicence;

      req.mysql.query(query, function (error, results, fields) {
    	  	if(error){
            tools.dSend(res, "NOK", "Admin-Delete", "deleteLicence", 500, error, null);
    	  	} else {
            tools.dSend(res, "OK", "Admin-Delete", "deleteLicence", 200, null, results);
    	  	}
      	});
});

/**
 * @api {delete} /admin/delete/deleteGame/:idGame Delete a game
 * @apiName deleteGame
 * @apiGroup AdminDelete
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {Int} idGame Id Game
 * @apiHeader {String} token AdminToken auth
 * @apiDescription Route permettant de supprimer une licence.
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "error": null,
 *     "response": {
 *        "fieldCount": 0,
 *        "affectedRows": 1,
 *        "insertId": 0,
 *        "serverStatus": 2,
 *        "warningCount": 0,
 *        "message": "",
 *        "protocol41": true,
 *        "changedRows": 0
 *    }
 * }
 */

router.delete('/deleteGame/:idGame', function(req, res, next) {
  var query = "DELETE FROM d_games WHERE id = " + req.params.idGame;

  req.mysql.query(query, function (error, results, fields) {
    	if(error){
        tools.dSend(res, "NOK", "Admin-Delete", "deleteLicence", 500, error, null);
    	} else {
        tools.dSend(res, "OK", "Admin-Delete", "deleteLicence", 200, null, results);
    	}
  	});
});

/**
 * @api {delete} /admin/delete/deleteEcole/:idEcole Delete a school
 * @apiName deleteEcole
 * @apiGroup AdminDelete
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {Int} idEcole Id Ecole
 * @apiHeader {String} token AdminToken auth
 * @apiDescription Route permettant de supprimer une Ecole
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "error": null,
 *     "response": {
 *        "fieldCount": 0,
 *        "affectedRows": 1,
 *        "insertId": 0,
 *        "serverStatus": 2,
 *        "warningCount": 0,
 *        "message": "",
 *        "protocol41": true,
 *        "changedRows": 0
 *    }
 * }
 */

router.delete('/deleteEcole/:idEcole', function(req, res, next) {
  var query = "DELETE FROM d_ecole WHERE id = " + req.params.idEcole;

  req.mysql.query(query, function (error, results, fields) {
    	if(error){
        tools.dSend(res, "NOK", "Admin-Delete", "deleteEcole", 500, error, null);
    	} else {
        tools.dSend(res, "OK", "Admin-Delete", "deleteEcole", 200, null, results);
    	}
  	});
});
module.exports = router;
