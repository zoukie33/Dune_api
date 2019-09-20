var express = require('express');
var mysql   = require("mysql");
var router = express.Router();
const fileUpload = require('express-fileupload');
var filez = require('../../functions/files/files');
var tools = require('../../functions/tools');

/**
 * @api {get} /eleves/ Get all students
 * @apiName getAll
 * @apiGroup Eleves
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token Token auth
 * @apiError 500 SQL Error.
 *
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "error": null,
 *     "response": [
 *         {
 *            "idEleve": 1,
 *            "nomEleve": "Merveillau",
 *            "prenomEleve": "Denis",
 *            "BAE": null,
 *            "INE": null,
 *            "picPath": "1-eleve.png"
 *        }
 *     ]
 * }
 */
router.get('/', function(req, res, next) {
	req.mysql.query('SELECT * from d_eleves', function (error, results, fields) {
	  	if(error){
        tools.dSend(res, "NOK", "Eleves", "getAll", 500, error, null);
	  	} else {
        tools.dSend(res, "OK", "Eleves", "getAll", 200, null, results);
	  	}
  	});
});

/**
 * @api {get} /eleves/:id Get student by id
 * @apiName getById
 * @apiGroup Eleves
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token Token auth
 * @apiSuccess {Int} idEleve de l'élève.
 * @apiSuccess {String} nomEleve de l'élève.
 * @apiSuccess {String} prenomEleve de l'élève.
 * @apiSuccess {String} BAE de l'élève.
 * @apiSuccess {String} INE de l'élève.
 * @apiSuccess {Text} picPath de l'élève.
 * @apiError 500 SQL Error.
 *
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "error": null,
 *     "response": [
 *         {
 *            "idEleve": 1,
 *            "nomEleve": "Merveillau",
 *            "prenomEleve": "Denis",
 *            "BAE": null,
 *            "INE": null,
 *            "picPath": "1-eleve.png"
 *        }
 *     ]
 * }
 */

router.get('/:id?', function(req, res, next) {
	req.mysql.query('SELECT e.*, c.idClasse FROM d_eleves AS e, d_classeEleve AS c WHERE e.idEleve = c.idEleve AND e.idEleve = ' + req.params.id , function (error, results, fields) {
	  	if(error){
        tools.dSend(res, "NOK", "Eleves", "getById", 500, error, null);
	  	} else {
        tools.dSend(res, "OK", "Eleves", "getById", 200, null, results);
	  	}
  	});
});

/**
 * @api {post} /eleves/byClasse Get students by idClasse
 * @apiName byClasse
 * @apiGroup Eleves
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token Token auth
 * @apiParam {Int} idClasse IdClasse des élèves à récupérer.
 * @apiError 510 idClasse is missing.
 * @apiError 500 SQL Error.
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "error": null,
 *     "response": [
 *         {
 *            "nomEleve": "Merveillau",
 *            "prenomEleve": "Denis"
 *         },
 *         {
 *            "nomEleve": "Senouci",
 *            "prenomEleve": "Elies"
 *         }
 *     ]
 * }
 */

router.post('/byClasse', function(req, res, next) {
	var idClasse = req.body.idClasse;
	if (idClasse) {
		req.mysql.query('SELECT e.nomEleve, e.prenomEleve FROM d_classeEleve as c, d_eleves as e WHERE e.idEleve = c.idEleve AND c.idClasse = ' + idClasse , function (error, results, fields) {
		  	if(error){
          tools.dSend(res, "NOK", "Eleves", "byClasse", 500, error, null);
		  	} else {
					if (results.length != 0) {
            tools.dSend(res, "OK", "Eleves", "byClasse", 200, null, results);
					}
		  	}
	  	});
	}
	else {
    tools.dSend(res, "NOK", "Eleves", "byClasse", 500, "idClasse is missing", null);
	}
});

/**
 * @api {get} /eleves/byProf Get students by prof
 * @apiName byProf
 * @apiGroup Eleves
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token Token auth
 * @apiError 510 idProf is missing.
 * @apiError 500 SQL Error.
 *
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "error": null,
 *     "response": [
 * 				 {
 *             "idEleve": 1,
 *             "nomEleve": "Merveilleau",
 *             "prenomEleve": "Denis",
 *             "BAE": null,
 *             "INE": null
 *        	},
 *        	{
 *             "idEleve": 2,
 *             "nomEleve": "Senouci",
 *             "prenomEleve": "Elies",
 *             "BAE": null,
 *             "INE": null
 *        	}
 *     ]
 * }
 */

router.get('/byProf', function(req, res, next) {
	var idProf = req.currUser.idProf;
	if (idProf) {
		req.mysql.query('SELECT e.idEleve, e.nomEleve, e.prenomEleve, e.BAE, e.INE FROM d_eleves AS e, d_classeEleve AS ce, d_classe AS c, d_profsAppClasse AS pc, d_users AS u WHERE u.idUser = pc.idProf AND pc.idClasse = c.idClasse AND c.idClasse = ce.idClasse AND ce.idEleve = e.idEleve AND u.idUser = ' + idProf , function (error, results, fields) {
		  	if(error){
          tools.dSend(res, "NOK", "Eleves", "byProf", 500, error, null);
		  	} else {
					if (results.length != 0) {
            tools.dSend(res, "OK", "Eleves", "byProf", 200, null, results);
					}
		  	}
	  	});
	}
	else {
    tools.dSend(res, "NOK", "Eleves", "byProf", 500, "idProf is missing", null);
	}
});

/**
 * @api {post} /eleves/add Create new student
 * @apiName add
 * @apiGroup Eleves
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token Token auth
 * @apiParam {Int} directorId L'id du directeur.
 * @apiParam {String} nom Nom de l'élève a ajouter.
 * @apiParam {Int} prenom Prénom de l'élève a ajouter.
 * @apiParam {Int} idClasse Id de la classe à laquelle ajouter un élève.
 * @apiParam {File} [picEleve] Photo de l'étudiant ajouté.
 * @apiError 500 SQL Error.
 *
 */

router.post('/add', function(req, res, next) {
  var directorId = req.body.directorId;
  var idClasse = req.body.idClasse;
	var postData = {
    nomEleve:req.body.nom,
    prenomEleve:req.body.prenom
  }
  let file;
  let idEleve;
  var query = "INSERT INTO ?? SET ?";
  var table = ["d_eleves"];
  query = mysql.format(query,table);

	req.mysql.query(query, postData, function(error, results, fields) {
		if (error){
      tools.dSend(res, "NOK", "Eleves", "add", 500, error, null);
		} else {
      idEleve = results.insertId;
      tools.dSend(res, "OK", "Eleves", "add", 200, null, results);
      if (idClasse) {
        req.mysql.query("INSERT INTO d_classeEleve VALUES ('"+ idClasse +"', '"+ idEleve +"')", function(error, results, fields) {
        });
      }
      if (req.files && Object.keys(req.files).length != 0) {
        file = req.files.picEleve;
    		var fileName = idEleve + "-eleve.png";
        if (filez.filesGest(file, "eleves/", fileName)) {
    			var query = "UPDATE d_eleves SET picPath = '" + fileName + "'  WHERE idEleve = " + idEleve;
    						req.mysql.query(query, function(error, results, fields) {
    							if (error){
                    tools.dLog("NOK", "Eleves", "add", 500, null, null);
    							} else {
                    tools.dLog("OK", "Eleves", "add", 200, null, "Une photo User a été mis a jour : [" + fileName + "]");
    							}
    							res.end(JSON.stringify(results));
    						});
    		}
      }
		}
	  res.end(JSON.stringify(results));
	});
});

/**
 * @api {put} /eleves/update Updating a student
 * @apiName update
 * @apiGroup Eleves
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token Token auth
 * @apiParam {Int} idEleve Id de l'élève a mettre a jour.
 * @apiParam {String} nomEleve Nom de l'élève a mettre a jour.
 * @apiParam {String} prenomEleve Prénom de l'élève a mettre a jour.
 *
 */

router.put('/update', function(req, res, next) {
	var id  = req.body.idEleve;
  var nom  = req.body.nomEleve;
  var prenom  = req.body.prenomEleve;

  var query = "UPDATE d_eleves SET nomEleve = '"+ nom +"', prenomEleve = '"+ prenom +"' WHERE idEleve = " + id;

  req.mysql.query(query, function(error, results, fields) {
    if (error){
      tools.dSend(res, "NOK", "Eleves", "update", 500, error, "Impossible de mettre a jour cet élève.");
    } else {
      tools.dSend(res, "OK", "Eleves", "update", 200, null, "Student Updated");
    }
    res.end(JSON.stringify(results));
  });
});

/**
 * @api {put} /eleves/picEleve Uploading studient picture
 * @apiName picEleve
 * @apiGroup Eleves
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token Token auth
 * @apiParam {Int} idEleve Id de l'élève en question.
 * @apiParam {File} picEleve Image de l'élève à uploader.
 *
 */

router.put('/picEleve', function(req, res, next) {
	if (Object.keys(req.files).length != 0) {
		var id  = req.body.idEleve;
		let file;

		file = req.files.picEleve;
		var fileName = id + "-eleve.png";
		if (filez.filesGest(file, "eleves/", fileName)) {
			var query = "UPDATE d_eleves SET picPath = '" + fileName + "'  WHERE idEleve = " + id;
						req.mysql.query(query, function(error, results, fields) {
							if (error){
                tools.dSend(res, "NOK", "Eleves", "picEleve", 500, error, "Impossible de mettre a jour cet élève.");
							} else {
                tools.dSend(res, "OK", "Eleves", "picEleve", 200, null, "Une photo User a été mis a jour : [" + fileName + "]");
							}
							res.end(JSON.stringify(results));
						});
		} else {
      tools.dSend(res, "NOK", "Eleves", "picEleve", 500, "error with dir", null);
		}
	} else {
    tools.dSend(res, "NOK", "Eleves", "picEleve", 500, "Error uploading File", null);
	}

});

module.exports = router;
