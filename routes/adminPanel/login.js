const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const jwt = require('jsonwebtoken');
const md5 = require('MD5');
const config = require('../../config');
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
 * @apiParam {String} email Email de l'utilisateur
 * @apiParam {String} password Mot de passe de l'utilisateur
 * @apiDescription Route permettant à un utilisateur de se connecter.
 */

router.post('/', function(req, res, next) {
  let err1 = 'Aucun utilisateur ne correspond à ces identifiants.';
  let err2 = 'You need to use an admin account';
  let email = req.body.email,
    password = req.body.password;
  let query = 'SELECT * FROM ?? WHERE pass = ? AND emailUser = ?';
  let query2 = 'SELECT idEcole FROM ?? WHERE idProf = ?';
  let data = ['d_users', md5(password), email];
  query = mysql.format(query, data);

  req.mysql.query(query, function(error, results, fields) {
    if (error) {
      tools.dSend(res, 'NOK', 'AdminLogin', 'Login', 500, error, null);
    } else {
      if (results.length != 0) {
        data = ['d_profsAppEcole', results[0].idUser];
        query2 = mysql.format(query2, data);
        if (results[0].typeUser == 4) {
          req.mysql.query(query2, function(error, results2, fields) {
            if (error) {
              tools.dSend(res, 'NOK', 'AdminLogin', 'Login', 500, error, null);
            } else {
              let token = jwt.sign(
                {
                  idUser: results[0].idUser,
                  typeUser: results[0].typeUser,
                  emailUser: results[0].emailUser,
                  idEcole: results2[0].idEcole
                },
                config.secret,
                {
                  expiresIn: '7d'
                }
              );

              /* var query3 =
                'UPDATE ? SET access_token = "' + token + '" WHERE idUser = ?';
              var data = ['d_users', results[0].idUser];
              query3 = mysql.format(query3, data);
              req.mysql.query(query3, function(error, results3, fields) {
                if (error) {
                  tools.dSend(
                    res,
                    'NOK',
                    'AdminLogin',
                    'Login',
                    500,
                    error,
                    null
                  );
                } else { */
              tools.dLog(
                'OK',
                'Auth',
                'Login',
                200,
                null,
                `Admin connected: ${token}`
              );
              /*}
              });*/
            }
          });
        } else {
          tools.dSend(res, 'NOK', 'AdminLogin', 'Login', 502, err2, null);
        }
      } else {
        tools.dSend(res, 'NOK', 'AdminLogin', 'Login', 502, err1, null);
      }
    }
  });
});

module.exports = router;
