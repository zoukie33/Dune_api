var express = require('express');
var mysql = require('mysql');
var serial = require('generate-serial-key');
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
 *            "nomEcole": "Sainte-Marie: Grand Lebrun",
 *            "rue": "Rue de l'école normale",
 *            "numRue": "4",
 *            "ville": "Bordeaux",
 *            "departement": "Aquitaine",
 *            "tel": "0603**4206",
 *            "id_customer": "cus_FpPdZuUxTL0Z5n",
 *            "email": "elodie.berthaud@epitech.eu",
 *            "nomUser": "Berthaud",
 *            "prenomUser": "Elodie"
 *        },
 *        {
 *            "id": 2,
 *            "idDirecteur": 33,
 *            "nomEcole": "Epitech",
 *            "rue": "Rue de l'école normale",
 *            "numRue": "4",
 *            "ville": "Bordeaux",
 *            "departement": "Aquitaine",
 *            "tel": "0603**4206",
 *            "id_customer": "cus_FpPdZuUxTL0Z5n",
 *            "email": "elodie.berthaud@epitech.eu",
 *            "nomUser": "Berthaud",
 *            "prenomUser": "Elodie"
 *        }
 *     ]
 * }
 * @apiHeader {String} token AdminToken auth
 */

router.get('/getAllSchools', function(req, res, next) {
  var query =
    'SELECT e.*, u.nomUser, u.prenomUser FROM d_ecole AS e, d_users AS u WHERE e.idDirecteur = u.idUser';

  req.mysql.query(query, function(error, results, fields) {
    if (error) {
      tools.dSend(
        res,
        'NOK',
        'Admin-Dashboard',
        'getAllSchools',
        500,
        error,
        null
      );
    } else {
      tools.dSend(
        res,
        'OK',
        'Admin-Dashboard',
        'getAllSchools',
        200,
        null,
        results
      );
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
 * @apiHeader {String} token AdminToken auth
 * @apiParam {Int} idEcole
 */

router.get('/getProfsBySchool/:idEcole', function(req, res, next) {
  var query =
    'SELECT u.idUser AS idProf, u.nomUser AS nom, u.prenomUser AS prenom, u.emailUser AS email, u.picPath FROM d_profsAppEcole AS pae, d_users AS u WHERE u.idUser = pae.idProf AND pae.idEcole = ' +
    req.params.idEcole;

  req.mysql.query(query, function(error, results, fields) {
    if (error) {
      tools.dSend(
        res,
        'NOK',
        'Admin-Dashboard',
        'getProfsBySchool',
        500,
        error,
        null
      );
    } else {
      tools.dSend(
        res,
        'OK',
        'Admin-Dashboard',
        'getProfsBySchool',
        200,
        null,
        results
      );
    }
  });
});

/**
 * @api {get} /admin/dashboard/getClassesBySchool/:idEcole Getting classes by school
 * @apiName getClassesBySchool
 * @apiGroup AdminDashboard
 * @apiPermission notLogged
 * @apiVersion 1.0.0
 * @apiSuccessExample {json} Success-Response:
 * {
 *  "status": 200,
 *    "error": null,
 *    "response": [
 *        {
 *            "idClasse": 1,
 *            "level": 4,
 *            "num": 1,
 *            "annee": "2017/2018"
 *        },
 *        {
 *            "idClasse": 2,
 *            "level": 8,
 *            "num": 1,
 *            "annee": "2017/2018"
 *        }
 *    ]
 * }
 * @apiHeader {String} token AdminToken auth
 * @apiParam {Int} idEcole
 */

router.get('/getClassesBySchool/:idEcole', function(req, res, next) {
  var query =
    'SELECT c.idClasse, c.level, c.num, c.annee FROM d_classeEcole AS ce, d_classe AS c WHERE ce.idClasse = c.idClasse AND ce.idEcole = ?';
  var data = [req.params.idEcole];
  query = mysql.format(query, data);

  req.mysql.query(query, function(error, results, fields) {
    if (error) {
      tools.dSend(
        res,
        'NOK',
        'Admin-Dashboard',
        'getClassesBySchool',
        500,
        error,
        null
      );
    } else {
      tools.dSend(
        res,
        'OK',
        'Admin-Dashboard',
        'getClassesBySchool',
        200,
        null,
        results
      );
    }
  });
});

/**
 * @api {get} /admin/dashboard/getStudentsByClasse/:idEcole Getting students by classe
 * @apiName getStudentsByClasse
 * @apiGroup AdminDashboard
 * @apiPermission notLogged
 * @apiVersion 1.0.0
 * @apiSuccessExample {json} Success-Response:
 * {
 *  "status": 200,
 *  "error": null,
 *  "response": [
 *      {
 *          "idEleve": 1,
 *          "nomEleve": "Merveillau",
 *          "prenomEleve": "Denis",
 *          "picPath": "1-eleve.png"
 *      },
 *      {
 *          "idEleve": 2,
 *          "nomEleve": "Senouci",
 *          "prenomEleve": "Elies",
 *          "picPath": "2-eleve.png"
 *      }
 *    ]
 * }
 * @apiHeader {String} token AdminToken auth
 * @apiParam {Int} idClasse
 */

router.get('/getStudentsByClasse/:idClasse', function(req, res, next) {
  var query =
    'SELECT e.idEleve, e.nomEleve, e.prenomEleve, e.picPath FROM d_classeEleve AS ce, d_eleves AS e WHERE ce.idEleve = e.idEleve AND ce.idClasse = ?';
  var data = [req.params.idClasse];
  query = mysql.format(query, data);

  req.mysql.query(query, function(error, results, fields) {
    if (error) {
      tools.dSend(
        res,
        'NOK',
        'Admin-Dashboard',
        'getStudentsByClasse',
        500,
        error,
        null
      );
    } else {
      tools.dSend(
        res,
        'OK',
        'Admin-Dashboard',
        'getStudentsByClasse',
        200,
        null,
        results
      );
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
 * @apiHeader {String} token AdminToken auth
 * @apiParam {Int} idEcole
 */

router.get('/getLicencesBySchool/:idEcole', function(req, res, next) {
  var query =
    'SELECT idLicence AS id, idEcole, serial AS licence, used, dateExpire FROM d_licencesTables WHERE idEcole = ' +
    req.params.idEcole;

  req.mysql.query(query, function(error, results, fields) {
    if (error) {
      tools.dSend(
        res,
        'NOK',
        'Admin-Dashboard',
        'getLicencesBySchool',
        500,
        error,
        null
      );
    } else {
      tools.dSend(
        res,
        'OK',
        'Admin-Dashboard',
        'getLicencesBySchool',
        200,
        null,
        results
      );
    }
  });
});

/**
 * @api {get} /admin/dashboard/getCreators Getting creators
 * @apiName getCreators
 * @apiGroup AdminDashboard
 * @apiPermission notLogged
 * @apiVersion 1.0.0
 * @apiSuccessExample {json} Success-Response:
 * {
 *    "status": 200,
 *    "error": null,
 *       "response": [
 *   {
 *       "idCreator": 1,
 *       "nom": VictorH,
 *   },
 *   {
 *       "idCreator": 2,
 *       "nom": MvCaster,
 *   }
 *     ]
 * }
 * @apiHeader {String} token AdminToken auth
 */

router.get('/getCreators', function(req, res, next) {
  var query = 'SELECT * FROM d_creator';

  req.mysql.query(query, function(error, results, fields) {
    if (error) {
      tools.dSend(
        res,
        'NOK',
        'Admin-Dashboard',
        'getCreators',
        500,
        error,
        null
      );
    } else {
      tools.dSend(
        res,
        'OK',
        'Admin-Dashboard',
        'getCreators',
        200,
        null,
        results
      );
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
 * @apiHeader {String} token AdminToken auth
 */

router.get('/getNbSchools', function(req, res, next) {
  var query = 'SELECT COUNT(id) AS nbSchool FROM d_ecole';

  req.mysql.query(query, function(error, results, fields) {
    if (error) {
      tools.dSend(
        res,
        'NOK',
        'Admin-Dashboard',
        'getNbSchools',
        500,
        error,
        null
      );
    } else {
      res.send(
        JSON.stringify({
          status: 200,
          error: null,
          nbSchool: results[0].nbSchool
        })
      );
      tools.dLog(
        'OK',
        'Admin-Dashboard',
        'getNbSchools',
        200,
        null,
        '"nbSchool":' + results[0].nbSchool
      );
    }
  });
});

/**
 * @api {get} /admin/dashboard/getTableBySchool/:idEcole Getting Tables by school
 * @apiName getTableBySchool
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
 * @apiHeader {String} token AdminToken auth
 * @apiParam {Int} idEcole
 */

router.get('/getTableBySchool/:idEcole', function(req, res, next) {
  var query =
    'SELECT u.idUser AS idProf, u.nomUser AS nom, u.prenomUser AS prenom, u.emailUser AS email, u.picPath FROM d_tables AS pae, d_users AS u WHERE u.idUser = pae.idProf AND pae.idEcole = ' +
    req.params.idEcole;

  req.mysql.query(query, function(error, results, fields) {
    if (error) {
      tools.dSend(
        res,
        'NOK',
        'Admin-Dashboard',
        'getProfsBySchool',
        500,
        error,
        null
      );
    } else {
      tools.dSend(
        res,
        'OK',
        'Admin-Dashboard',
        'getProfsBySchool',
        200,
        null,
        results
      );
    }
  });
});

/**
 * @api {get} /admin/dashboard/getStudentsBySchool/:idSchool Getting students by School
 * @apiName getStudentsBySchool
 * @apiGroup AdminDashboard
 * @apiPermission notLogged
 * @apiVersion 1.0.0
 * @apiSuccessExample {json} Success-Response:
 * {
 *  "status": 200,
 *  "error": null,
 *  "response": [
 *      {
 *          "idEleve": 1,
 *          "nomEleve": "Merveillau",
 *          "prenomEleve": "Denis",
 *          "picPath": "1-eleve.png"
 *      },
 *      {
 *          "idEleve": 2,
 *          "nomEleve": "Senouci",
 *          "prenomEleve": "Elies",
 *          "picPath": "2-eleve.png"
 *      }
 *    ]
 * }
 * @apiHeader {String} token AdminToken auth
 * @apiParam {Int} idSchool
 */

router.get('/getStudentsBySchool/:idSchool', function(req, res, next) {
  var query =
    'SELECT e.idEleve, e.nomEleve, e.prenomEleve, e.picPath FROM d_elevesEcole AS ee, d_eleves AS e WHERE e.idEleve = ee.idEleve AND ee.idEcole = ?';
  var data = [req.params.idSchool];
  query = mysql.format(query, data);

  req.mysql.query(query, function(error, results, fields) {
    if (error) {
      tools.dSend(
        res,
        'NOK',
        'Admin-Dashboard',
        'getStudentsBySchool',
        500,
        error,
        null
      );
    } else {
      tools.dSend(
        res,
        'OK',
        'Admin-Dashboard',
        'getStudentsBySchool',
        200,
        null,
        results
      );
    }
  });
});
module.exports = router;
