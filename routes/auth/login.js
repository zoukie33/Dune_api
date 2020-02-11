const express = require('express');
const mysql = require('mysql2');
const router = express.Router();
const jwt = require('jsonwebtoken');
const md5 = require('MD5');
const { secret } = require('../../config');
const generator = require('generate-password');
const resetPass = require('../../functions/mails/resetPass');
const tools = require('../../functions/tools');

/**
 * @api {post} /login/ Login an User
 * @apiName Login
 * @apiGroup Auth
 * @apiPermission Public
 * @apiVersion 1.0.0
 *
 * @apiError 502 Aucun utilisateur ne correspond à ces identifiants.
 * @apiError 500 SQL Error
 * @apiError 400 Bad request.
 * @apiError 500 Erreur d'ajout de token dans la base User.
 * @apiParam {String} email Email de l'utilisateur
 * @apiParam {String} password Mot de passe de l'utilisateur
 * @apiDescription Route permettant à un utilisateur de se connecter.
 *
 * @apiSuccessExample Success-Response:
 * {
 *   "status": 200,
 *   "success": true,
 *   "message": "Token generated",
 *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzZXIiOjAsInR5cGVVc2VyIjo0LCJlbWFpbFVzZXIiOiJyb21haW4uZ2FkcmF0QGVwaXRlY2guZXUiLCJpZEVjb2xlIjowLCJpYXQiOjE1NzU1NDg0NTQsImV4cCI6MTU3NjE1MzI1NH0.UHbEztu-9wU8PUE8g_TF5k1z4-NreUOJw0FmvWl3WUs",
 *   "typeUser": 4,
 *   "currUser": 0,
 *   "cgu": 1
 * }
 *
 */

router.post('/', function(req, res, next) {
  let status_success = null;
  let post = {
    email: req.body.email,
    password: req.body.password
  };
  if (
    typeof req.body.email != 'undefined' &&
    typeof req.body.password != 'undefined'
  ) {
    let query =
      "SELECT u.* FROM d_users as u WHERE u.pass='" +
      md5(post.password) +
      "' AND u.emailUser= '" +
      post.email +
      "'";

    req.mysql.query(query, function(err, rows) {
      if (err) {
        tools.dSend(res, 'NOK', 'Auth', 'Login', 500, err, null);
      } else {
        if (rows.length !== 0) {
          const typeUser = rows[0].typeUser,
            user_id = rows[0].idUser,
            emailUser = rows[0].emailUser,
            cgu = rows[0].cgu;
          status_success =
            rows[0].access_token === 'n/a' || rows[0].access_token === null
              ? 201
              : 200;
          let query2 =
            'SELECT idEcole FROM d_profsAppEcole as a WHERE a.idProf = ' +
            user_id;
          req.mysql.query(query2, function(err, resu) {
            if (resu.length >= 1) {
              idEcole = resu[0].idEcole;
            } else {
              idEcole = 0;
            }

            let token = jwt.sign(
              {
                idUser: user_id,
                typeUser: typeUser,
                emailUser: emailUser,
                idEcole: idEcole
              },
              secret,
              {
                expiresIn: '7d'
              }
            );

            let data = {
              user_id: rows[0].idUser,
              device_type: rows[0].device_type,
              access_token: token
            };

            let query = 'INSERT INTO  ?? SET  ?';
            let table = ['access_token', data];
            query = mysql.format(query, table);

            req.mysql.query(query, function(err, rows) {
              if (err) {
                tools.dSend(res, 'NOK', 'Auth', 'Login', 500, err, null);
              } else {
                tools.dLog(
                  'OK',
                  'Auth',
                  'Login',
                  status_success,
                  null,
                  '{token: token, typeUser: typeUser}'
                );
                res.json({
                  status: status_success,
                  success: true,
                  message: 'Token generated',
                  token: token,
                  typeUser: typeUser,
                  currUser: user_id,
                  cgu: cgu
                });
              }
            });
            query =
              "UPDATE d_users SET access_token = '" +
              token +
              "' WHERE idUser = " +
              user_id;

            req.mysql.query(query, function(error, results, fields) {
              if (error) {
                tools.dSend(
                  res,
                  'NOK',
                  'Auth',
                  'Login',
                  500,
                  error,
                  "Erreur d'ajout de token dans la base User."
                );
              } else {
                tools.dLog(
                  'OK',
                  'Auth',
                  'Login',
                  200,
                  null,
                  'Un Token a été mis a jour : [' + token + ']'
                );
              }
            });
          });
        } else {
          tools.dSend(
            res,
            'NOK',
            'Auth',
            'Login',
            502,
            null,
            'Aucun utilisateur ne correspond à ces identifiants.'
          );
        }
      }
    });
  } else {
    tools.dSend(res, 'NOK', 'Auth', 'Login', 400, 'Bad request.', null);
  }
});

/**
 * @api {post} /login/reset Forget password
 * @apiName Reset
 * @apiGroup Auth
 * @apiPermission Public
 * @apiVersion 1.0.0
 *
 * @apiError 502 Aucun utilisateur ne correspond à ces identifiants.
 * @apiError 500 SQL Error
 * @apiParam {String} email Email de l'utilisateur
 * @apiDescription Route permettant à un utilisateur de générer un nouveau mot de passe.
 */

router.post('/reset', function(req, res, next) {
  let email = req.body.email;
  console.log(req.body.email);

  if (typeof email != 'undefined') {
    let query = 'SELECT * FROM ?? WHERE ??=?';
    let table = ['d_users', 'emailUser', email];
    query = mysql.format(query, table);

    req.mysql.query(query, function(err, rows) {
      if (err) {
        tools.dSend(
          res,
          'NOK',
          'Auth',
          'Reset',
          500,
          'Error executing MySQL query',
          null
        );
      } else {
        if (rows.length != 0) {
          let password = generator.generate({
            length: 8,
            numbers: true
          });

          req.mysql.query(
            "UPDATE d_users SET pass = '" +
              md5(password) +
              "' WHERE emailUser = '" +
              email +
              "'",
            function(error, results, fields) {
              if (error) {
                tools.dSend(res, 'NOK', 'Auth', 'Reset', 500, error, null);
              } else {
                resetPass.sendPasswordReset(email, password);
                tools.dLog(
                  'OK',
                  'Auth',
                  'Reset',
                  200,
                  null,
                  '"pass": password'
                );
                res.send(
                  JSON.stringify({ status: 200, error: null, pass: password })
                );
              }
            }
          );
        } else {
          tools.dSend(
            res,
            'NOK',
            'Auth',
            'Reset',
            502,
            'Aucun utilisateur ne correspond à ces identifiants.',
            null
          );
        }
      }
    });
  } else {
    tools.dSend(res, 'NOK', 'Auth', 'Reset', 400, 'Bad request.', null);
  }
});

module.exports = router;
