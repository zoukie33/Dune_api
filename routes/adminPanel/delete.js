const express = require('express');
const router = express.Router();
const tools = require('../../functions/tools');
// const filez = require('../../functions/files/files');
// const mysql = require('mysql2');
// const serial = require('generate-serial-key');

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
  let idLicence = req.params.idLicence;

  let query = 'DELETE FROM d_licencesTables WHERE idLicence = ' + idLicence;

  req.mysql.query(query, function(error, results, fields) {
    if (error) {
      tools.dSend(
        res,
        'NOK',
        'Admin-Delete',
        'deleteLicence',
        500,
        error,
        null
      );
    } else {
      tools.dSend(
        res,
        'OK',
        'Admin-Delete',
        'deleteLicence',
        200,
        null,
        results
      );
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
  let query = 'DELETE FROM d_games WHERE id = ' + req.params.idGame;

  req.mysql.query(query, function(error, results, fields) {
    if (error) {
      tools.dSend(
        res,
        'NOK',
        'Admin-Delete',
        'deleteLicence',
        500,
        error,
        null
      );
    } else {
      tools.dSend(
        res,
        'OK',
        'Admin-Delete',
        'deleteLicence',
        200,
        null,
        results
      );
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
  let query = 'DELETE FROM d_ecole WHERE id = ' + req.params.idEcole;

  req.mysql.query(query, function(error, results, fields) {
    if (error) {
      tools.dSend(res, 'NOK', 'Admin-Delete', 'deleteEcole', 500, error, null);
    } else {
      tools.dSend(res, 'OK', 'Admin-Delete', 'deleteEcole', 200, null, results);
    }
  });
});

/**
 * @api {delete} /admin/delete/deleteProf/:idProf Delete a Professor
 * @apiName deleteProf
 * @apiGroup AdminDelete
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {Int} idProf Id Prof
 * @apiHeader {String} token AdminToken auth
 * @apiDescription Route permettant de supprimer un professeur
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

router.delete('/deleteProf/:idProf', function(req, res, next) {
  let query =
    'SELECT typeUser FROM d_users WHERE idUser = ' + req.params.idProf;

  req.mysql.query(query, function(error, results, fields) {
    if (error) {
      tools.dSend(res, 'NOK', 'Admin-Delete', 'deleteProf', 500, error, null);
    } else {
      if (results[0].typeUser == 1) {
        let query = 'DELETE FROM d_users WHERE iduser = ' + req.params.idProf;
        req.mysql.query(query, function(error, results, fields) {
          if (error) {
            tools.dSend(
              res,
              'NOK',
              'Admin-Delete',
              'deleteProf',
              500,
              error,
              null
            );
          } else {
            tools.dSend(
              res,
              'OK',
              'Admin-Delete',
              'deleteProf',
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
          'Admin-Delete',
          'deleteProf',
          500,
          null,
          'Vous ne pouvez supprimer que des professeurs.'
        );
      }
    }
  });
});

/**
 * @api {delete} /admin/delete/deleteCompetence/:idCompetence Delete a Competence
 * @apiName deleteCompetence
 * @apiGroup AdminDelete
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {Int} idCompetence Id de la competence
 * @apiHeader {String} token AdminToken auth
 * @apiDescription Route permettant de supprimer une compétence.
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

router.delete('/deleteCompetence/:idCompetence', function(req, res, next) {
  let idCompetence = req.params.idCompetence;

  let query = 'DELETE FROM d_competences WHERE idComp = ' + idCompetence;

  req.mysql.query(query, function(error, results, fields) {
    if (error) {
      tools.dSend(
        res,
        'NOK',
        'Admin-Delete',
        'deleteCompetence',
        500,
        error,
        null
      );
    } else {
      tools.dSend(
        res,
        'OK',
        'Admin-Delete',
        'deleteCompetence',
        200,
        null,
        results
      );
    }
  });
});
module.exports = router;
