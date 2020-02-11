const express = require('express');
const mysql = require('mysql2');
// const serial = require('generate-serial-key');
const router = express.Router();
// const filez = require('../../functions/files/files');
const tools = require('../../functions/tools');

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
  let query =
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
  let query =
    'SELECT u.idUser AS idProf, u.nomUser AS nom, u.prenomUser AS prenom, u.emailUser AS email, u.picPath ' +
    'FROM d_profsAppEcole pae INNER JOIN d_users u ON u.idUser=pae.idProf ' +
    'WHERE pae.idEcole = ' +
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
  let query =
    'SELECT c.idClasse, c.level, c.num, c.annee FROM d_classeEcole AS ce, d_classe AS c WHERE ce.idClasse = c.idClasse AND ce.idEcole = ?';
  let data = [req.params.idEcole];
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
  let query =
    'SELECT e.idEleve, e.nomEleve, e.prenomEleve, e.picPath FROM d_classeEleve AS ce, d_eleves AS e WHERE ce.idEleve = e.idEleve AND ce.idClasse = ?';
  let data = [req.params.idClasse];
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
  let query =
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
  let query = 'SELECT * FROM d_creator';

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
  let query = 'SELECT COUNT(id) AS nbSchool FROM d_ecole';

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
  let query =
    'SELECT u.idUser AS idProf, u.nomUser AS nom, u.prenomUser AS prenom, u.emailUser AS email, u.picPath FROM d_tables AS pae, d_users AS u WHERE u.idUser = pae.idProf AND pae.idEcole = ' +
    req.params.idEcole;

  req.mysql.query(query, function(error, results, fields) {
    if (error) {
      tools.dSend(
        res,
        'NOK',
        'Admin-Dashboard',
        'getTableBySchool',
        500,
        error,
        null
      );
    } else {
      tools.dSend(
        res,
        'OK',
        'Admin-Dashboard',
        'getTableBySchool',
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
  let query =
    'SELECT e.idEleve, e.nomEleve, e.prenomEleve, e.picPath FROM d_elevesEcole AS ee, d_eleves AS e WHERE e.idEleve = ee.idEleve AND ee.idEcole = ?';
  let data = [req.params.idSchool];
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

/**
 * @api {get} /admin/dashboard/getStudentsNotInClassBySchool/:idSchool Getting students by School not in a class
 * @apiName getStudentsNotInClassBySchool
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

router.get('/getStudentsNotInClassBySchool/:idSchool', function(req, res, next) {
  let idEcole = req.params.idSchool;
  if (typeof idEcole != 'undefined') {
    let query =
    `SELECT e.idEleve, e.nomEleve, e.prenomEleve, e.picPath FROM d_elevesEcole AS ee, d_eleves AS e WHERE e.idEleve = ee.idEleve AND ee.idEcole = ${idEcole} AND e.idEleve NOT IN (SELECT idEleve FROM d_classeEleve)`;
    query = mysql.format(query);

    req.mysql.query(query, function(error, results, fields) {
      if (error) {
        tools.dSend(
          res,
          'NOK',
          'Admin-Dashboard',
          'getStudentsNotInClassBySchool',
          500,
          error,
          null
        );
      } else {
        tools.dSend(
          res,
          'OK',
          'Admin-Dashboard',
          'getStudentsNotInClassBySchool',
          200,
          null,
          results
        );
      }
    });
  } else {
    tools.dSend(
      res,
      'NOK',
      'Admin-Dashboard',
      'getStudentsNotInClassBySchool',
      400,
      'Bad request.',
      null
    );
  }
});

router.get('/getClassesByProfessor/:idProf', function(req, res, next) {
  var idUser = req.params.idProf;
  let query_classes = null;

  let query_directeur =
      'SELECT e.idDirecteur FROM d_ecole e WHERE e.idDirecteur=?';
  let data = [req.params.idProf];
  query_directeur = mysql.format(query_directeur, data);

  req.mysql.query(query_directeur, function(error, results, fields) {
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
      if (results.length > 0) {
        query_classes = "SELECT idClasse " +
            "FROM d_classeEcole ce " +
            "INNER JOIN d_profsAppEcole pa ON pa.idEcole=ce.idEcole " +
            "WHERE pa.idProf=?";
      } else {
        query_classes = "SELECT idClasse " +
            "FROM d_profsAppClasse pa " +
            "WHERE pa.idProf=?";
      }
      let data = [req.params.idProf];
      query_classes = mysql.format(query_classes, data);

      req.mysql.query(query_classes, function (error, results, fields) {
        if (error) {
          tools.dSend(
              res,
              'NOK',
              'Admin-Dashboard',
              'getClassesByProfessor',
              500,
              error,
              null
          );
        } else {
          tools.dSend(
              res,
              'OK',
              'Admin-Dashboard',
              'getClassesByProfessor',
              200,
              null,
              results
          );
        }
      });
    }
  });
});

module.exports = router;
