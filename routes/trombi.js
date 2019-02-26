var express = require('express');
var mysql   = require("mysql");
var router = express.Router();
var tools = require('../functions/tools');

/**
 * @api {post} /trombi/ Get all students trombi
 * @apiName getAllStudents
 * @apiGroup Trombi
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {String} [search] Affiner la recherche.
 * @apiDescription Route permettant la récupération du trombi des étudiants d'un professeur (ou directeur).
 *
 * @apiError 500 SQL Error
 * @apiError 510 idUser ou typeUser manquants.
 *
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "error": null,
 *     "response": [
 *         {
 *            "idEleve": 4,
 *            "nomEleve": "Bonduelle",
 *            "prenomEleve": "James",
 *            "BAE": null,
 *            "INE": null,
 *            "picPath": "NULL",
 *            "idClasse": 1,
 *            "num": 1,
 *            "level": 4
 *        },
 *        {
 *            "idEleve": 13,
 *            "nomEleve": "Bozon",
 *            "prenomEleve": "Jessica",
 *            "BAE": null,
 *            "INE": null,
 *            "picPath": null,
 *            "idClasse": 5,
 *            "num": 1,
 *            "level": 7
 *        }
 *     ]
 * }
 */

router.post('/', function(req, res, next) {
  var idUser = req.currUser.idUser;
  var typeUser = req.currUser.typeUser;
  var search = req.body.search;

  if (typeUser && idUser) {
    if (search) {
      if (typeUser == 1) {
        var myQuery = 'SELECT DISTINCT e.idEleve, e.nomEleve, e.prenomEleve, e.picPath, c.idClasse, c.num, c.level FROM d_eleves AS e INNER JOIN d_classeEleve AS ce ON ce.idEleve = e.idEleve INNER JOIN d_classe AS c ON c.idClasse = ce.idClasse INNER JOIN d_profsAppClasse AS pa ON c.idClasse = pa.idClasse WHERE pa.idProf = ' + idUser + ' AND ((e.nomEleve LIKE "' + search + '%") OR (e.prenomEleve LIKE "' + search + '%")) ORDER BY e.nomEleve ASC';
      } else {
        var myQuery = 'SELECT DISTINCT e.idEleve, e.nomEleve, e.prenomEleve, e.picPath, c.idClasse, c.num, c.level FROM d_eleves AS e INNER JOIN d_classeEleve AS ce ON ce.idEleve = e.idEleve INNER JOIN d_classe AS c ON c.idClasse = ce.idClasse INNER JOIN d_classeEcole AS cec ON cec.idClasse = c.idClasse INNER JOIN d_profsAppEcole AS pa ON cec.idEcole = pa.idEcole WHERE  pa.idProf = ' + idUser + ' AND ((e.nomEleve LIKE "' + search + '%") OR (e.prenomEleve LIKE "' + search + '%")) ORDER BY e.nomEleve ASC';
      }
    } else {
      if (typeUser == 1) {
        var myQuery = 'SELECT e.*, ce.idClasse, c.num, c.level FROM d_eleves AS e, d_classeEleve AS ce, d_classe AS c, d_profsAppClasse AS ac, d_users AS u WHERE u.idUser = ac.idProf AND ac.idClasse = c.idClasse AND c.idClasse = ce.idClasse AND ce.idEleve = e.idEleve AND u.idUser = ' + idUser + ' ORDER BY e.nomEleve ASC';
      } else {
        var myQuery = 'SELECT e.*, ce.idClasse, c.num, c.level FROM d_eleves AS e, d_classeEleve AS ce, d_classe AS c, d_users AS u, d_classeEcole AS ce2, d_profsAppEcole AS ae WHERE u.idUser = ae.idProf AND ae.idEcole = ce2.idEcole AND ce2.idClasse = c.idClasse AND c.idClasse = ce.idClasse AND ce.idEleve = e.idEleve AND u.idUser = ' + idUser + ' ORDER BY e.nomEleve ASC';
      }
    }

    req.mysql.query(myQuery, function (error, results, fields) {
  	  	if(error){
          tools.dSend(res, "NOK", "Trombi", "getAllStudents", 500, error, null);
  	  	} else {
          tools.dSend(res, "OK", "Trombi", "getAllStudents", 200, null, results);
  	  	}
    	});
  } else {
    tools.dSend(res, "NOK", "Trombi", "getAllStudents", 510, "idUser ou typeUser manquants.", null);
  }
});

/**
 * @api {get} /trombi/classes Get all classes the user can view
 * @apiName classes
 * @apiGroup Trombi
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiDescription Route permettant de récupérer les classes de l'utilisateur connecté pour trier le trombi.
 *
 * @apiError 500 SQL Error
 * @apiError 510 idUser ou typeUser manquants.
 *
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "error": null,
 *     "response": [
 *          {
 *             "idClasse": 1,
 *             "level": 4,
 *             "num": 1,
 *             "annee": "2017/2018"
 *         },
 *         {
 *             "idClasse": 3,
 *             "level": 5,
 *             "num": 1,
 *             "annee": "2017/2018"
 *         }
 *     ]
 * }
 */

router.get('/classes', function(req, res, next) {
  var idUser = req.currUser.idUser;
  var typeUser = req.currUser.typeUser;
  if (typeUser && idUser) {
    if (typeUser == 1) {
      var myQuery = 'SELECT c.* FROM d_classe AS c, d_users AS u, d_profsAppClasse AS ac WHERE u.idUser = ac.idProf AND ac.idClasse = c.idClasse AND u.idUser = ' + idUser + ' ORDER BY c.level, c.num ASC';
    } else {
      var myQuery = 'SELECT c.* FROM d_classe AS c, d_users AS u, d_classeEcole AS ce2, d_profsAppEcole AS ae WHERE u.idUser = ae.idProf AND ae.idEcole = ce2.idEcole AND ce2.idClasse = c.idClasse AND u.idUser = ' + idUser + ' ORDER BY c.level, c.num ASC';
    }
    req.mysql.query(myQuery, function (error, results, fields) {
  	  	if(error){
          tools.dSend(res, "NOK", "Trombi", "classes", 500, error, null);
  	  	} else {
          tools.dSend(res, "OK", "Trombi", "classes", 200, null, results);
  	  	}
    	});
  } else {
    tools.dSend(res, "NOK", "Trombi", "classes", 500, "idUser ou typeUser manquants.", null);
  }
});

/**
 * @api {post} /trombi/byClasse Get all trombi students for one class
 * @apiName byClasse
 * @apiGroup Trombi
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {Int} idClasse Id de la classe voulue.
 * @apiParam {String} [search] Affiner la recherche.
 *
 * @apiError 500 SQL Error
 * @apiError 510 idUser ou typeUser ou idClasse manquants.
 *
 * @apiDescription Route permettant la récupération du trombi des étudiants d'un professeur (ou directeur) par une classe spécifique.
 *
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "error": null,
 *     "response": [
 *          {
 *             "idEleve": 13,
 *             "nomEleve": "Bozon",
 *             "prenomEleve": "Jessica",
 *             "BAE": null,
 *             "INE": null,
 *             "picPath": null,
 *             "num": 1,
 *             "level": 7
 *         },
 *         {
 *             "idEleve": 14,
 *             "nomEleve": "Couturier",
 *             "prenomEleve": "Eleonore",
 *             "BAE": null,
 *             "INE": null,
 *             "picPath": null,
 *             "num": 1,
 *             "level": 7
 *         }
 *     ]
 * }
 */

router.post('/byClasse', function(req, res, next) {
  var idUser = req.currUser.idUser;
  var typeUser = req.currUser.typeUser;
  var idClasse = req.body.idClasse;
  var search = req.body.search;
  console.log("req /trombi/byClasse/ : " + req.body.idUser + " " + req.body.typeUser + " " + req.body.idClasse);

  if (typeUser && idUser && idClasse) {
    if (search) {
      if (typeUser == 1) {
        var myQuery = 'SELECT DISTINCT e.idEleve, e.nomEleve, e.prenomEleve, e.picPath, c.idClasse, c.num, c.level FROM d_eleves AS e INNER JOIN d_classeEleve AS ce ON ce.idEleve = e.idEleve INNER JOIN d_classe AS c ON c.idClasse = ce.idClasse INNER JOIN d_profsAppClasse AS pa ON c.idClasse = pa.idClasse WHERE pa.idProf = ' + idUser + ' AND c.idClasse = ' + idClasse + ' AND (e.nomEleve LIKE "' + search + '%") OR (e.prenomEleve LIKE "' + search + '%") ORDER BY e.nomEleve ASC';
      } else {
        var myQuery = 'SELECT DISTINCT e.idEleve, e.nomEleve, e.prenomEleve, e.picPath, c.idClasse, c.num, c.level FROM d_eleves AS e INNER JOIN d_classeEleve AS ce ON ce.idEleve = e.idEleve INNER JOIN d_classe AS c ON c.idClasse = ce.idClasse INNER JOIN d_classeEcole AS cec ON cec.idClasse = c.idClasse INNER JOIN d_profsAppEcole AS pa ON cec.idEcole = pa.idEcole WHERE  pa.idProf = ' + idUser + ' AND c.idClasse = ' + idClasse + ' AND (e.nomEleve LIKE "' + search + '%") OR (e.prenomEleve LIKE "' + search + '%") ORDER BY e.nomEleve ASC';
      }
    } else {
      if (typeUser == 1) {
        var myQuery = 'SELECT e.*, c.num, c.level FROM d_classe AS c, d_users AS u, d_profsAppClasse AS ac, d_classeEleve as ce, d_eleves as e WHERE u.idUser = ac.idProf AND ac.idClasse = c.idClasse AND c.idClasse = ce.idClasse AND ce.idEleve = e.idEleve AND u.idUser = ' + idUser + ' AND c.idClasse = ' + idClasse + ' ORDER BY e.nomEleve ASC';
      } else {
        var myQuery = 'SELECT e.*, c.num, c.level FROM d_eleves AS e, d_classeEleve AS ce, d_classe AS c, d_users AS u, d_classeEcole AS ce2, d_profsAppEcole AS ae WHERE u.idUser = ae.idProf AND ae.idEcole = ce2.idEcole AND ce2.idClasse = c.idClasse AND c.idClasse = ce.idClasse AND ce.idEleve = e.idEleve AND u.idUser = ' + idUser + ' AND c.idClasse = ' + idClasse + ' ORDER BY e.nomEleve ASC';
      }
    }

    req.mysql.query(myQuery, function (error, results, fields) {
  	  	if(error){
          tools.dSend(res, "NOK", "Trombi", "byClasse", 500, error, null);
  	  	} else {
          tools.dSend(res, "OK", "Trombi", "byClasse", 200, null, results);
  	  	}
    	});
  } else {
    tools.dSend(res, "NOK", "Trombi", "byClasse", 500, "idUser ou typeUser ou idClasse manquants.", null);
  }
});
module.exports = router;
