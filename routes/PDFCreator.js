var express = require('express');
var router = express.Router();
var generator = require('generate-password');
var md5 = require('MD5');
var mysql = require('mysql');
var manageAccount = require('../functions/mails/manageAccount');
var filez = require('../functions/files/files');
var jwtDecode = require('../functions/tokens');
const fileUpload = require('express-fileupload');
var tools = require('../functions/tools');

/**
 * @api {get} /pdf/:idEleve create a PDF for student bulletin
 * @apiName GetBulletinPDF
 * @apiGroup ElevesStats
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiSuccessExample Success-Response:
 * {
 *    "status": 200,
 *    "error": null,
 *    "response": [
 *        {
 *        }
 * }
 *
 * @apiDescription Route permettant le téléchargement du bulletin d'un Élève en PDF.
 */
router.get('/', function(req, res, next) {
  req.mysql.query('SELECT * from d_users', function(error, results, fields) {
    if (error) {
      tools.dSend(res, 'NOK', 'Users', 'GetUsers', 500, error, null);
    } else {
      tools.dSend(res, 'OK', 'Users', 'GetUsers', 200, null, results);
    }
  });
});
