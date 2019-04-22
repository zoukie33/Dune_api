var express = require('express');
var mysql   = require("mysql");
var serial = require("generate-serial-key");
var router = express.Router();
var filez = require('../../functions/files/files');
var tools = require('../../functions/tools');


/**
 * @api {get} /admin/dashboard/getAllSchools Getting Schools
 * @apiName getAllSchools
 * @apiGroup AdminDashboard
 * @apiPermission notLogged
 * @apiVersion 1.0.0
 * @apiSuccessExample {json} Success-Response:
 * {
 *    "status": 200,
 *    "error": null,
 *       "response": [
 *         {
 *            "id": 1,
 *            "idDirecteur": 1,
 *            "nomEcole": "Sainte-Marie: Grand Lebrun"
 *        },
 *        {
 *            "id": 2,
 *            "idDirecteur": 33,
 *            "nomEcole": "Epitech"
 *        }
 *     ]
 * }
 * @apiParam {String} tokenAdmin
 */

router.get('/getAllSchools', function(req, res, next) {
  var query = "SELECT * FROM d_ecole";

  req.mysql.query(query, function(error, results, fields) {
    if (error){
      tools.dSend(res, "NOK", "Admin-Dashboard", "getAllSchools", 500, error, null);
    } else {
      tools.dSend(res, "OK", "Admin-Dashboard", "getAllSchools", 200, null, results);
    }
  });
});

/**
 * @api {get} /admin/dashboard/getProfsBySchool/:idEcole Getting profs by school
 * @apiName getProfsBySchool
 * @apiGroup AdminDashboard
 * @apiPermission notLogged
 * @apiVersion 1.0.0
 * @apiSuccessExample {json} Success-Response:
 * {
 *    "status": 200,
 *    "error": null,
 *       "response": [
 *         {
 *            "idProf": 1,
 *            "nom": "Berthaud",
 *            "prenom": "Elodie",
 *            "email": "elodie.berthaud1@gmail.com",
 *            "picPath": "1-prof.png"
 *        },
 *        {
 *            "idProf": 2,
 *            "nom": "gadrat",
 *            "prenom": "Romain",
 *            "email": "romain.gasdrat@epitech.eu",
 *            "picPath": "2-prof.png"
 *        }
 *     ]
 * }
 * @apiParam {String} tokenAdmin
 * @apiParam {Int} idEcole
 */

router.get('/getProfsBySchool/:idEcole', function(req, res, next) {
  var query = "SELECT u.idUser AS idProf, u.nomUser AS nom, u.prenomUser AS prenom, u.emailUser AS email, u.picPath FROM d_profsAppEcole AS pae, d_users AS u WHERE u.idUser = pae.idProf AND pae.idEcole = " + req.params.idEcole;

  req.mysql.query(query, function(error, results, fields) {
    if (error){
      tools.dSend(res, "NOK", "Admin-Dashboard", "getProfsBySchool", 500, error, null);
    } else {
      tools.dSend(res, "OK", "Admin-Dashboard", "getProfsBySchool", 200, null, results);
    }
  });
});

/**
 * @api {get} /admin/dashboard/getLicencesBySchool/:idEcole Getting licences by school
 * @apiName getLicencesBySchool
 * @apiGroup AdminDashboard
 * @apiPermission notLogged
 * @apiVersion 1.0.0
 * @apiSuccessExample {json} Success-Response:
 * {
 *    "status": 200,
 *    "error": null,
 *       "response": [
 *   {
 *       "id": 15,
 *       "idEcole": 1,
 *       "licence": "Q6M8-P6V5-E9GN-VWER",
 *       "used": 0,
 *       "dateExpire": "2020-04-21T14:47:09.000Z"
 *   },
 *   {
 *       "id": 16,
 *       "idEcole": 1,
 *       "licence": "4LV9-Q3DL-GMAH-UAKT",
 *       "used": 0,
 *       "dateExpire": "2020-04-21T14:47:09.000Z"
 *   }
 *     ]
 * }
 * @apiParam {String} tokenAdmin
 * @apiParam {Int} idEcole
 */

router.get('/getLicencesBySchool/:idEcole', function(req, res, next) {
  var query = "SELECT idLicence AS id, idEcole, serial AS licence, used, dateExpire FROM d_licencesTables WHERE idEcole = " + req.params.idEcole;

  req.mysql.query(query, function(error, results, fields) {
    if (error){
      tools.dSend(res, "NOK", "Admin-Dashboard", "getLicencesBySchool", 500, error, null);
    } else {
      tools.dSend(res, "OK", "Admin-Dashboard", "getLicencesBySchool", 200, null, results);
    }
  });
});

// DATAS COUNTING

/**
 * @api {get} /admin/dashboard/getNbSchools Getting number of Schools
 * @apiName getNbSchools
 * @apiGroup AdminDashboard
 * @apiPermission notLogged
 * @apiVersion 1.0.0
 * @apiSuccessExample {json} Success-Response:
 * {
 *    "status": 200,
 *    "error": null,
 *     "nbSchool": 2
 * }
 * @apiParam {String} tokenAdmin
 */

router.get('/getNbSchools', function(req, res, next) {
  var query = "SELECT COUNT(id) AS nbSchool FROM d_ecole";

  req.mysql.query(query, function(error, results, fields) {
    if (error){
      tools.dSend(res, "NOK", "Admin-Dashboard", "getNbSchools", 500, error, null);
    } else {
			res.send(JSON.stringify({"status": 200, "error": null, "nbSchool": results[0].nbSchool}));
			tools.dLog("OK", "Admin-Dashboard", "getNbSchools", 200, null, '"nbSchool":' + results[0].nbSchool);
    }
  });
});
module.exports = router;
