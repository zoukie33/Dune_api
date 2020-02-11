const express = require('express');
const router = express.Router();
const tools = require('../../functions/tools');
const md5 = require('MD5');

/**
 * @api {post} /facturation/secure/verifPassword Verification password
 * @apiName verifPassword
 * @apiGroup Facturation
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token Token auth
 * @apiParam {String} password Password de l'utilisateur.
 * @apiError 500 SQL Error.
 *
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "error": null,
 *     "response": "Password Valid"
 * }
 */

router.post('/verifPassword', function(req, res, next) {
  let verifPass = req.body.password;
  if (typeof verifPass != 'undefined') {
    req.mysql.query(
      'SELECT pass FROM d_users WHERE idUser = ' +
        req.currUser.idUser +
        " AND emailUser = '" +
        req.currUser.emailUser +
        "'",
      function(error, results, fields) {
        if (error) {
          tools.dSend(
            res,
            'NOK',
            'Facturation/Secure',
            'verifPassword',
            500,
            error,
            null
          );
        } else {
          if (md5(verifPass) == results[0].pass) {
            tools.dSend(
              res,
              'OK',
              'Facturation/Secure',
              'verifPassword',
              200,
              null,
              'Password Valid'
            );
          } else {
            tools.dSend(
              res,
              'NOK',
              'Facturation/Secure',
              'verifPassword',
              401,
              null,
              'Invalid Password'
            );
          }
        }
      }
    );
  } else {
    tools.dSend(
      res,
      'NOK',
      'Facturation/Secure',
      'verifPassword',
      400,
      'Bad Request',
      null
    );
  }
});

module.exports = router;
