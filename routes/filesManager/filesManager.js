const express = require('express');
const router = express.Router();
const md5 = require('MD5');
const tools = require('../../functions/tools');
const filez = require('../../functions/files/files');
const mysql = require('mysql2');

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
    let idUser = req.currUser.idUser,
      idEcole = req.currUser.idEcole,
      fileName = req.body.fileName,
      description = req.body.description,
      fileType = req.body.fileType,
      private = req.body.private,
      file = req.files.fileUser,
      fileRName = req.files.fileUser.name;
    let md5name = md5(Math.random() + new Date());
    if (typeof fileName === 'undefined') {
      let nameS = fileRName.split('.');
      fileName = nameS[0];
    }
    if (typeof description === 'undefined') {
      description = 'n/a';
    }
    if (file.mimetype === 'image/jpeg') { md5name = md5name + '.jpg'; }
      else if (file.mimetype === 'image/png') { md5name = md5name + '.png'; }
      else if (file.mimetype === 'application/pdf') { md5name = md5name + '.pdf'; }
      else if (file.mimetype === 'video/mp4') { md5name = md5name + '.mp4'; }
    if (filez.filesManagerUpload(file, 'fm/', md5name)) {
      let query = `INSERT INTO d_files(nom, path, type, description, private) VALUES ("${fileName}","${md5name}","${fileType}","${description}", "${private}")`;
      req.mysql.query(query, function(error, results, fields) {
        if (error) {
          tools.dSend(
            res,
            'NOK',
            'FileManager',
            'uploadFile',
            500,
            error,
            'SQL Error 1'
          );
        } else {
          query =
            "INSERT INTO d_filesAppsUser (idFile, idUser, idEcole) VALUES ('" +
            results.insertId +
            "', '" +
            idUser +
            "', '" +
            idEcole +
            "')";
          req.mysql.query(query, function(error, results, fields) {
            if (error) {
              tools.dSend(
                res,
                'NOK',
                'FileManager',
                'uploadFile',
                500,
                error,
                'SQL Error 2'
              );
            } else {
              tools.dSend(
                res,
                'OK',
                'FileManager',
                'uploadFile',
                200,
                null,
                'yop et hop !'
              );
            }
          });
        }
      });
    } else {
      tools.dSend(
        res,
        'NOK',
        'FileManager',
        'uploadFile',
        500,
        'Directory error',
        null
      );
    }
  } else {
    tools.dSend(
      res,
      'NOK',
      'FileManager',
      'uploadFile',
      500,
      'Error uploading File',
      null
    );
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
  let idFile = req.body.idFile;
  let query = 'DELETE FROM d_files WHERE idFile = ' + idFile;

  req.mysql.query(query, function(error, results, fields) {
    if (error) {
      tools.dSend(
        res,
        'NOK',
        'FileManager',
        'deleteFile',
        500,
        error,
        'SQL Error'
      );
    } else {
      tools.dSend(res, 'OK', 'FileManager', 'deleteFile', 200, null, results);
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

router.put('/editFile', function(req, res, next) {
  let data = {
    idFile: req.body.idFile,
    nom: req.body.nomFile,
    description: req.body.description,
    private: req.body.private
  };
  let query_params = [data.nom, data.description, data.private, data.idFile];
  let query = 'UPDATE d_files SET nom = ?, description = ?, private = ? WHERE idFile = ?';

  query = mysql.format(query, query_params);
  req.mysql.query(query, function(error, results, fields) {
      if (error) {
        tools.dSend(
          res,
          'NOK',
          'FileManager',
          'editFile',
          500,
          error,
          'SQL Error'
        );
      } else {
        tools.dSend(res, 'OK', 'FileManager', 'editFile', 200, null, results);
      }
    }
  );
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

router.post('/getAll', function(req, res, next) {
  var private_ = req.body.private,
    idUser = req.currUser.idUser,
    idEcole = req.currUser.idEcole,
    title = req.body.title,
    type = req.body.type,
    classement = req.body.classement;
  let query = '';

  if (req.body.private === "1") {
    query =
      'SELECT f.* FROM d_files AS f INNER JOIN d_filesAppsUser fau ON fau.idFile=f.idFile ' +
      'WHERE fau.idEcole = ' +
      idEcole +
      ' ' +
      'AND fau.idUser = ' +
      idUser +
      ' ' +
      'AND f.private = 1';
    if (title !== '') {
      query += " AND f.nom LIKE '%" + title + "%'";
    }
    if (type !== '') {
      query += " AND f.type='" + type + "'";
    }
  } else {
    query =
      'SELECT f.*, fau.idUser FROM d_files AS f INNER JOIN d_filesAppsUser fau ON fau.idFile=f.idFile WHERE (f.idFile = fau.idFile AND (fau.idEcole = ' +
      idEcole +
      ' AND f.private = 0) OR (fau.idEcole = ' + idEcole + ' AND fau.idUser = ' +
      idUser +
      '))';
    if (title !== '') {
      query += " AND f.nom LIKE '%" + title + "%'";
    }
    if (type != []) {
      let cond = '';
      let tmp = type.split(',');
      for (let i = 0; i < tmp.length; i++) {
        cond += "'" + tmp[i] + "'";
        cond += i + 1 === tmp.length ? '' : ', ';
      }
      query += ' AND f.type IN (' + cond + ')';
    }
  }

  if (classement === 1) query += ' ORDER BY f.type';
  else if (classement === 2) query += ' ORDER BY f.nom';
  req.mysql.query(query, function(error, results, fields) {
    if (error) {
      tools.dSend(res, 'NOK', 'FileManager', 'getAll', 500, error, 'SQL Error');
    } else {
      tools.dSend(res, 'OK', 'FileManager', 'getAll', 200, null, results);
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

router.get('/getOne/:idFile', function(req, res, next) {
  let idFile = req.params.idFile;
  let query = 'SELECT * FROM d_files AS f WHERE f.idFile = ' + idFile;

  req.mysql.query(query, function(error, results, fields) {
    if (error) {
      tools.dSend(res, 'NOK', 'FileManager', 'getAll', 500, error, 'SQL Error');
    } else {
      if (results.length == 0) {
        tools.dSend(
          res,
          'NOK',
          'FileManager',
          'getAll',
          404,
          null,
          'FileNotFound'
        );
      } else {
        tools.dSend(res, 'OK', 'FileManager', 'getAll', 200, null, results);
      }
    }
  });
});
module.exports = router;
