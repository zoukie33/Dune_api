const express = require('express');
const mysql = require('mysql2');
const router = express.Router();
const jwt = require('jsonwebtoken');
const md5 = require('MD5');
const { secret } = require('../../config');
const tools = require('../../functions/tools');

/**
 * @api {post} /admin/login/ Login an User
 * @apiName Login
 * @apiGroup AdminLogin
 * @apiPermission Public
 * @apiVersion 1.0.0
 *
 * @apiError 502 Aucun utilisateur ne correspond à ces identifiants.
 * @apiError 500 SQL Error
 * @apiError 500 Erreur d'ajout de token dans la base User.
 * @apiError 400 Bad request.
 * @apiParam {String} email Email de l'utilisateur
 * @apiParam {String} password Mot de passe de l'utilisateur
 * @apiDescription Route permettant à un utilisateur de se connecter.
 */

router.post('/', function(req, res, next) {
  let err1 = 'Aucun utilisateur ne correspond à ces identifiants.';
  let err2 = 'You need to use an admin account';
  let email = req.body.email,
    password = req.body.password;
  if (typeof email != 'undefined' && typeof password != 'undefined') {
    let query = 'SELECT * FROM ?? WHERE pass = ? AND emailUser = ?';
    let data = ['d_users', md5(password), email];
    query = mysql.format(query, data);

    req.mysql.query(query, function(error, results, fields) {
      if (error) {
        tools.dSend(res, 'NOK', 'AdminLogin', 'Login', 500, error, null);
      } else {
        if (results.length != 0) {
          if (results[0].typeUser == 4) {
            let token = jwt.sign(
              {
                idUser: results[0].idUser,
                typeUser: results[0].typeUser,
                emailUser: results[0].emailUser
              },
              secret,
              {
                expiresIn: '7d'
              }
            );
            tools.dLog('OK', 'Auth', 'Login', 200, null, `Admin connected`);
            res.json({
              status: 200,
              message: 'Token generated',
              token: token,
              typeUser: results[0].typeUser,
              currUser: results[0].idUser
            });
          } else {
            tools.dSend(res, 'NOK', 'AdminLogin', 'Login', 502, err2, null);
          }
        } else {
          tools.dSend(res, 'NOK', 'AdminLogin', 'Login', 502, err1, null);
        }
      }
    });
  } else {
    tools.dSend(res, 'NOK', 'AdminLogin', 'Login', 400, 'Bad Request', null);
  }
});

module.exports = router;
