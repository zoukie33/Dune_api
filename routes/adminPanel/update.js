var express = require('express');
var mysql   = require("mysql");
var serial = require("generate-serial-key");
var router = express.Router();
var filez = require('../../functions/files/files');
var tools = require('../../functions/tools');

/**
 * @api {put} /admin/update/updateLicence/ Updating a licence
 * @apiName updateLicence
 * @apiGroup AdminUpdate
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token AdminToken auth 
 * @apiParam {String} licence 7CCK-METF-SSFW-7RZ8
 * @apiParam {int} used 0 ou 1
 * @apiParam {TimeStamp} dateExpire 2020-04-23 15:16:20
 * @apiDescription Route permettant d'update une licence.
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

router.put('/updateLicence', function(req, res, next) {
  var licence = req.body.licence;
  var used = req.body.used;
  var dateExpire = req.body.dateExpire;
  var query = "UPDATE d_licencesTables SET used = " + used + ", dateExpire = " + dateExpire + " WHERE serial = " + licence;

  req.mysql.query(query, function (error, results, fields) {
    	if(error){
        tools.dSend(res, "NOK", "Admin-Update", "updateLicence", 500, error, null);
    	} else {
        tools.dSend(res, "OK", "Admin-Update", "updateLicence", 200, null, results);
    	}
  	});
});

module.exports = router;
