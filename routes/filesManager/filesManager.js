var express = require('express');
var router = express.Router();
var tools = require('../../functions/tools');
var filez = require('../../functions/files/files');
var md5 = require("MD5");
const fileUpload = require('express-fileupload');


/**
 * @api {post} /filesManager/uploadFile Upload a file
 * @apiName uploadFile
 * @apiGroup FilesManager
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token Token auth
 * @apiParam {String} fileName
 * @apiParam {String} fileType
 * @apiParam {String} description
 * @apiParam {String} private
 * @apiParam {File} fileUser
 *
 * @apiError 500 SQL Error 1 & 2.
 * @apiError 500 Directory error.
 * @apiError 500 Error uploading File.
 * @apiError 500 ER_DUP_ENTRY.
 *
 * @apiSuccessExample Success-Response:
 * {
 *    "status": 200,
 *    "error": null
 * }
 */

router.post('/uploadFile', function(req, res, next) {
  if (Object.keys(req.files).length != 0) {
    var idUser = req.currUser.idUser;
    var idEcole = req.currUser.idEcole;
		var fileName = req.body.fileName;
		var description = req.body.description;
		var fileType = req.body.fileType;
		var private = req.body.private;
		let file = req.files.fileUser;
		var fileRName = req.files.fileUser.name;

    if (fileName == "") {
      var nameS = fileRName.split('.');
      fileName = nameS[0];
    }
    if (description == "") {
      description = "n/a";
    }
		if (filez.filesManagerUpload(file, "fm/", fileRName)) {
			var query = "INSERT INTO d_files(nom, path, type, description, private) VALUES ('"+ fileName +"', '"+ fileRName +"', '"+ fileType +"', '"+ description +"', '"+ private +"')";
						req.mysql.query(query, function(error, results, fields) {
							if (error){
                tools.dSend(res, "NOK", "FileManager", "uploadFile", 500, error, "SQL Error 1");
							} else {
                query = "INSERT INTO d_filesAppsUser (idFile, idUser, idEcole) VALUES ('"+ results.insertId +"', '"+ idUser +"', '"+ idEcole +"')";
                req.mysql.query(query, function(error, results, fields) {
                  if (error){
                    tools.dSend(res, "NOK", "FileManager", "uploadFile", 500, error, "SQL Error 2");
    							} else {
                    tools.dSend(res, "OK", "FileManager", "uploadFile", 200, null, "yop et hop !");
                  }
                });
							}
						});
		} else {
      tools.dSend(res, "NOK", "FileManager", "uploadFile", 500, "Directory error", null);
		}
	} else {
    tools.dSend(res, "NOK", "FileManager", "uploadFile", 500, "Error uploading File", null);
	}
});

/**
 * @api {delete} /filesManager/deleteFile Deleting a file
 * @apiName deleteFile
 * @apiGroup FilesManager
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token Token auth
 * @apiParam {int} idFile
 *
 * @apiError 500 SQL Error.
 *
 * @apiSuccessExample Success-Response:
 * {
 *    "status": 200,
 *    "error": null
 * }
 */

router.delete('/deleteFile', function(req, res, next) {
    var idUser = req.currUser.idUser;
    var idFile = req.body.idFile;
    var query = "DELETE FROM d_files WHERE idFile = " + idFile;

    req.mysql.query(query, function(error, results, fields) {
      if (error){
        tools.dSend(res, "NOK", "FileManager", "deleteFile", 500, error, "SQL Error");
      } else {
        tools.dSend(res, "OK", "FileManager", "deleteFile", 200, null, results);
      }
    });

});

/**
 * @api {put} /filesManager/editFile Editing a file
 * @apiName editFile
 * @apiGroup FilesManager
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token Token auth
 * @apiParam {int} idFile
 * @apiParam {String} nom
 * @apiParam {String} description
 * @apiParam {int} private
 *
 * @apiError 500 SQL Error.
 *
 * @apiSuccessExample Success-Response:
 * {
 *    "status": 200,
 *    "error": null
 * }
 */

router.put('/editFile', function(req, res, next){
  var data = {
    idFile: req.body.idFile,
    nom: req.body.nomFile,
    description: req.body.description,
    private: req.body.private
  }
  var query = 'UPDATE d_files SET nom = ?, description = ?, private = ? WHERE idFile = ?';

  req.mysql.query(query, [data.nom, data.description, data.private, data.idFile], function(error, results, fields) {
    if (error){
      tools.dSend(res, "NOK", "FileManager", "editFile", 500, error, "SQL Error");
    } else {
      tools.dSend(res, "OK", "FileManager", "editFile", 200, null, results);
    }
  });
});

/**
 * @api {post} /filesManager/getAll Get all the files an user can access
 * @apiName getAll
 * @apiGroup FilesManager
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token Token auth
 * @apiParam {int} private 0 non - 1 oui
 * @apiParam {String} type IMG / PDF / MP4
 * @apiParam {String} titre
 * @apiParam {int} classement
 *
 * @apiError 500 SQL Error.
 *
 * @apiSuccessExample Success-Response:
 * {
 *    "status": 200,
 *    "error": null,
 *    "response": [
 *        {
 *            "idFile": 5,
 *            "nom": "MonFichier",
 *            "path": "monkas.png",
 *            "type": "IMG",
 *            "description": "Voici mon premier fichier",
 *            "private": 1
 *        },
 *        {
 *            "idFile": 6,
 *            "nom": "MonFichier",
 *            "path": "jesusger.jpg",
 *            "type": "IMG",
 *            "description": "Voici mon premier fichier",
 *            "private": 1
 *        }
 *      ]
 * }
 */

router.post('/getAll', function(req, res, next){
  var private = req.body.private;
  var idUser = req.currUser.idUser;
  var idEcole = req.currUser.idEcole;
  var title = req.body.title;
  var type = req.body.type;
  var classement = req.body.classement;

  if (private == 1) {
    var query = "SELECT f.* FROM d_files AS f, d_filesAppsUser AS fau " +
        "WHERE f.idFile = fau.idFile AND fau.idEcole = " + idEcole + " " +
        "AND fau.idUser = " + idUser + " " +
        "AND f.private = 1";
    if (title !== ''){
      query += " AND f.nom LIKE '%" + title + "%'";
    }
    if (type != []){
      query += " AND f.type='" + type + "'";
    }
  } else {
    var query = "SELECT DISTINCT(f.idFile), f.nom, f.path, f.type, f.description, f.private, fau.idUser FROM d_files AS f, d_filesAppsUser AS fau WHERE f.idFile = fau.idFile AND (fau.idEcole = " + idEcole + " AND f.private = 0) OR (fau.idEcole = 1 AND fau.idUser = " + idUser + ")";
    if (title !== ''){
      query += " AND f.nom LIKE '%" + title + "%'";
    }
    if (type != []){
      let cond = '';
      let tmp = type.split(',');
      for (var i = 0; i < tmp.length ; i++){
        cond += "'" + tmp[i] + "'";
        cond += i + 1 === tmp.length ? '' : ', ';
      }
      query += " AND f.type IN (" + cond + ")";

      console.log(query);
    }
  }

  if (classement == 1)
    query += " ORDER BY f.type";
  else if (classement == 2)
    query += " ORDER BY f.nom";

  req.mysql.query(query, function(error, results, fields) {
    if (error){
      tools.dSend(res, "NOK", "FileManager", "getAll", 500, error, "SQL Error");
    } else {
      tools.dSend(res, "OK", "FileManager", "getAll", 200, null, results);
    }
  });
});

/**
 * @api {get} /filesManager/getOne/:idFile Get one file by id
 * @apiName getOne
 * @apiGroup FilesManager
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token Token auth
 * @apiParam {int} idFile
 *
 * @apiError 500 SQL Error.
 * @apiError 404 FileNotFound.
 *
 * @apiSuccessExample Success-Response:
 * {
 *    "status": 200,
 *    "error": null,
 *    "response": [
 *        {
 *            "idFile": 5,
 *            "nom": "MonFichier",
 *            "path": "monkas.png",
 *            "type": "IMG",
 *            "description": "Voici mon premier fichier",
 *            "private": 1
 *        }
 *      ]
 * }
 */

router.get('/getOne/:idFile', function(req, res, next){
  var idFile = req.params.idFile;
  var idUser = req.currUser.idUser;
  var idEcole = req.currUser.idEcole;
  var query = "SELECT * FROM d_files AS f WHERE f.idFile = " + idFile;

  req.mysql.query(query, function(error, results, fields) {
    if (error){
      tools.dSend(res, "NOK", "FileManager", "getAll", 500, error, "SQL Error");
    } else {
      if (results.length == 0) {
        tools.dSend(res, "NOK", "FileManager", "getAll", 404, null, "FileNotFound");
      } else {
        tools.dSend(res, "OK", "FileManager", "getAll", 200, null, results);
      }
    }
  });
});
module.exports = router;
