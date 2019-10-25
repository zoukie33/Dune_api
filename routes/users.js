var express = require('express');
var router = express.Router();
var generator = require('generate-password');
var md5 = require('MD5');
var mysql = require('mysql');
var manageAccount = require('../functions/mails/manageAccount');
var filez = require('../functions/files/files');
var jwtDecode = require('../functions/tokens');
const fileUpload = require('express-fileupload');
var tools = require('../functions/tools');

/**
 * @api {get} /users/ Request All Users
 * @apiName GetUsers
 * @apiGroup Users
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token Token auth
 *
 * @apiSuccess {Int} idUser Id de l'utilisateur.
 * @apiSuccess {String} nomUser Nom de l'utilisateur.
 * @apiSuccess {String} prenomUser Prénom de l'utilisateur.
 * @apiSuccess {String} emailUser  Email de l'utilisateur.
 * @apiSuccess {String} pass  Mot de passe de l'utilisateur.
 * @apiSuccess {Int} typeUser  Type de l'utilisateur.
 * @apiSuccess {String} picPath  Photo de l'utilisateur.
 * @apiSuccess {Text} access_token  Token de l'utilisateur.
 * @apiSuccess {String} device_type  Type de device utilisé.
 *
 * @apiSuccessExample Success-Response:
 * {
 *    "status": 200,
 *    "error": null,
 *    "response": [
 *        {
 *            "idUser": 0,
 *            "nomUser": "blank",
 *            "prenomUser": "blank",
 *            "emailUser": "blank@blank.com",
 *            "pass": "04b2c7d23cdd19843241b20b331992a7",
 *            "typeUser": 3,
 *            "picPath": null,
 *            "access_token": "TokenAuth",
 *            "device_type": "web"
 *        }
 * }
 *
 * @apiDescription Route permettant la récupération de tous les utilisateurs.
 */
router.get('/', function(req, res, next) {
  req.mysql.query('SELECT * from d_users', function(error, results, fields) {
    if (error) {
      tools.dSend(res, 'NOK', 'Users', 'GetUsers', 500, error, null);
    } else {
      tools.dSend(res, 'OK', 'Users', 'GetUsers', 200, null, results);
    }
  });
});

/**
 * @api {get} /users/infos/:idUser Request User information
 * @apiName infos/:idUser
 * @apiGroup Users
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 *
 * @apiHeader {String} token Token auth
 * @apiSuccess {Int} idUser Id de l'utilisateur.
 * @apiSuccess {String} nomUser Nom de l'utilisateur.
 * @apiSuccess {String} prenomUser Prénom de l'utilisateur.
 * @apiSuccess {String} emailUser  Email de l'utilisateur.
 * @apiSuccess {String} pass  Mot de passe de l'utilisateur.
 * @apiSuccess {Int} typeUser  Type de l'utilisateur.
 * @apiSuccess {String} picPath  Photo de l'utilisateur.
 * @apiSuccess {Text} access_token  Token de l'utilisateur.
 * @apiSuccess {String} device_type  Type de device utilisé.
 *
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "error": null,
 *     "response": [
 *         {
 *             "idUser": 0,
 *             "nomUser": "blank",
 *             "prenomUser": "blank",
 *             "emailUser": "blank@blank.com",
 *             "pass": "04b2c7d23cdd19843241b20b331992a7",
 *             "typeUser": 3,
 *             "picPath": null,
 *             "access_token": "n/a",
 *             "device_type": "web"
 *         }
 *     ]
 * }
 *
 * @apiDescription Route permettant la récupération d'un utilisateur.
 */

router.get('/infos/:idUser', function(req, res, next) {
  var query = 'SELECT * from ?? WHERE idUser = ?';
  var table = ['d_users'];
  query = mysql.format(query, table);
  var data = {
    idUser: req.params.idUser
  };

  req.mysql.query(query, data, function(error, results, fields) {
    if (error) {
      tools.dSend(res, 'NOK', 'Users', 'infos/:idUser', 500, error, null);
    } else {
      tools.dSend(res, 'OK', 'Users', 'infos/:idUser', 200, null, results);
    }
  });
});

/**
 * @api {get} /users/infos Request UserLogged information
 * @apiName infos
 * @apiGroup Users
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 *
 * @apiHeader {String} token Token auth
 * @apiSuccess {Int} idUser Id de l'utilisateur.
 * @apiSuccess {String} nomUser Nom de l'utilisateur.
 * @apiSuccess {String} prenomUser Prénom de l'utilisateur.
 * @apiSuccess {String} emailUser  Email de l'utilisateur.
 * @apiSuccess {String} pass  Mot de passe de l'utilisateur.
 * @apiSuccess {Int} typeUser  Type de l'utilisateur.
 * @apiSuccess {String} picPath  Photo de l'utilisateur.
 * @apiSuccess {Text} access_token  Token de l'utilisateur.
 * @apiSuccess {String} device_type  Type de device utilisé.
 *
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "error": null,
 *     "response": [
 *         {
 *             "idUser": 0,
 *             "nomUser": "blank",
 *             "prenomUser": "blank",
 *             "emailUser": "blank@blank.com",
 *             "pass": "04b2c7d23cdd19843241b20b331992a7",
 *             "typeUser": 3,
 *             "picPath": null,
 *             "access_token": "n/a",
 *             "device_type": "web"
 *         }
 *     ]
 * }
 *
 * @apiDescription Route permettant la récupération d'un utilisateur.
 */

router.get('/infos', function(req, res, next) {
  req.mysql.query(
    'SELECT * from d_users WHERE idUser = ' + req.currUser.idUser,
    function(error, results, fields) {
      if (error) {
        tools.dSend(res, 'NOK', 'Users', 'infos', 500, error, null);
      } else {
        tools.dSend(res, 'OK', 'Users', 'infos', 200, null, results);
      }
    }
  );
});

/**
 * @api {post} /users/add Create new User
 * @apiName AddUser
 * @apiGroup Users
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token Token auth
 * @apiParam {String} nom Nome de l'utilisateur.
 * @apiParam {String} prenom Prénom de l'utilisateur.
 * @apiParam {String} email Email de l'utilisateur
 * @apiParam {Int} directorId Id du directeur
 *
 *
 * @apiDescription Route permettant la création d'un utilisateur.
 *
 */

router.post('/add', function(req, res, next) {
  if (req.currUser.typeUser == 2) {
    var query = 'SELECT * FROM ?? WHERE ??=?';
    var table = ['d_users', 'emailUser', req.body.email];
    query = mysql.format(query, table);

    req.mysql.query(query, function(err, rows) {
      if (err) {
        tools.dSend(res, 'NOK', 'Users', 'add', 500, err, null);
      } else {
        if (rows.length == 0) {
          var password = generator.generate({
            length: 8,
            numbers: true
          });
          var directorId = req.body.directorId;
          var postData = {
            nomUser: req.body.nom,
            prenomUser: req.body.prenom,
            emailUser: req.body.email,
            pass: md5(password),
            typeUser: 1,
            access_token: 'n/a',
            device_type: 'web'
          };
          var query = 'INSERT INTO ?? SET ?';
          var table = ['d_users'];
          query = mysql.format(query, table);

          req.mysql.query(query, postData, function(error, results, fields) {
            if (error) {
              tools.dSend(res, 'NOK', 'Users', 'add', 500, error, null);
            } else {
              let query = 'INSERT INTO ?? (idEcole, idProf) VALUES (?,?)';
              let data = [
                'd_profsAppEcole',
                req.currUser.idEcole,
                results.insertId
              ];
              query = mysql.format(query, data);
              req.mysql.query(query, function(error, results2, fields) {
                if (error) {
                  tools.dSend(res, 'NOK', 'Users', 'add', 500, error, null);
                } else {
                  manageAccount.sendCreateAccount(req.body.email, password);
                  res.send(
                    JSON.stringify({ status: 200, error: null, pass: password })
                  );
                  tools.dLog('OK', 'Store', 'add', 200, null, postData);
                }
              });
            }
            res.end(JSON.stringify(results));
          });
        } else {
          tools.dSend(
            res,
            'NOK',
            'Users',
            'add',
            501,
            err,
            'Un utilisateur est déja inscrit avec cet Email.'
          );
        }
      }
    });
  } else {
    tools.dSend(res, 'NOK', 'Users', 'add', 500, 'Access denied.', null);
  }
});

/**
 * @api {put} /users/update Update an User
 * @apiName updateUser
 * @apiGroup Users
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token Token auth
 * @apiParam {Int} idUser Id de l'utilisateur.
 * @apiParam {String} nomUser Nom de l'utilisateur.
 * @apiParam {String} prenomUser Prénom de l'utilisateur.
 *
 *
 * @apiDescription Route permettant la mise à jour d'un utilisateur.
 *
 */

router.put('/update', function(req, res, next) {
  if (!req.body.idUser) {
    var id = req.currUser.idUser;
  } else {
    var id = req.body.idUser;
  }

  var query = 'UPDATE ?? SET nomUser = ?, prenomUser = ? WHERE idUser = ?';
  var data = ['d_users', req.body.nomUser, req.body.prenomUser, id];
  query = mysql.format(query, data);

  req.mysql.query(query, function(error, results, fields) {
    if (error) {
      tools.dSend(
        res,
        'NOK',
        'Users',
        '/users/update',
        500,
        error,
        'Impossible de mettre a jour cet utilisateur.'
      );
    } else {
      tools.dSend(
        res,
        'OK',
        'Users',
        '/users/update',
        200,
        null,
        'User Updated'
      );
    }
    res.end(JSON.stringify(results));
  });
});

/**
 * @api {put} /users/picProf Uploading an Users picture
 * @apiName picProf
 * @apiGroup Users
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token Token auth
 * @apiParam {File} picProf Image de l'utilisateur a uploader.
 *
 *
 * @apiDescription Route permettant l'upload de la photo d'un utilisateur.
 *
 */

router.put('/picProf', function(req, res, next) {
  if (Object.keys(req.files).length != 0) {
    var id = req.currUser.idUser;
    let file;

    file = req.files.picProf;
    var fileName = id + '-prof.png';
    if (filez.filesGest(file, 'profs/', fileName)) {
      var query = 'UPDATE ?? SET picPath = ? WHERE idUser = ?';
      var data = ['d_users', fileName, id];
      query = mysql.format(query, data);

      req.mysql.query(query, function(error, results, fields) {
        if (error) {
          tools.dSend(
            res,
            'NOK',
            'Users',
            'picProf',
            500,
            error,
            'Impossible de mettre a jour cet utilisateur.'
          );
        } else {
          tools.dSend(
            res,
            'OK',
            'Users',
            'picProf',
            200,
            null,
            'User Picture Updated'
          );
        }
        res.end(JSON.stringify(results));
      });
    } else {
      tools.dSend(res, 'NOK', 'Users', 'picProf', 500, 'Dir Problem', null);
    }
  } else {
    tools.dSend(
      res,
      'NOK',
      'Users',
      'picProf',
      500,
      'Error uploading File',
      null
    );
  }
});

/**
 * @api {put} /users/changePassword Changing an Users password
 * @apiName changePassword
 * @apiGroup Users
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token Token auth
 * @apiParam {String} oldPassword Ancien mot de passe.
 * @apiParam {String} newPassword Nouveau mot de passe.
 *
 *
 * @apiDescription Route permettant le changement de mot de passe d'un utilisateur.
 *
 */

router.put('/changePassword', function(req, res, next) {
  var idUser = req.currUser.idUser;
  var oldPassword = req.body.oldPassword;
  var newPassword = req.body.newPassword;

  if (idUser && oldPassword && newPassword) {
    if (newPassword.length >= 8) {
      var query = 'SELECT ?? FROM ?? WHERE idUser = ?';
      var data = ['pass', 'd_users', idUser];
      query = mysql.format(query, data);
      req.mysql.query(query, function(err, rows) {
        if (err) {
          tools.dSend(res, 'NOK', 'Users', 'changePassword', 500, err, null);
        } else {
          if (rows[0].pass == md5(oldPassword)) {
            var query = 'UPDATE ?? SET pass = ?? WHERE idUser = ?';
            var data = ['d_users', md5(newPassword), idUser];
            query = mysql.format(query, data);
            req.mysql.query(query, function(err, rows) {
              if (err) {
                tools.dSend(
                  res,
                  'NOK',
                  'Users',
                  'changePassword',
                  500,
                  err,
                  null
                );
              } else {
                manageAccount.sendChangePassword(req.currUser.emailUser);
                tools.dSend(
                  res,
                  'OK',
                  'Users',
                  'changePassword',
                  200,
                  null,
                  'Password changed.'
                );
              }
            });
          } else {
            tools.dSend(
              res,
              'NOK',
              'Users',
              'changePassword',
              500,
              'Invalid old password.',
              null
            );
          }
        }
      });
    } else {
      tools.dSend(
        res,
        'NOK',
        'Users',
        'changePassword',
        500,
        'Votre mot de passe doit être supérieur ou égal à 8 caractères.',
        null
      );
    }
  } else {
    tools.dSend(
      res,
      'NOK',
      'Users',
      'changePassword',
      500,
      'Un de ces paramètres manquent dans le body: idUser, oldPassword, newPassword.',
      null
    );
  }
});

/**
 * @api {put} /users/changeEmail Changing an Users Email
 * @apiName changeEmail
 * @apiGroup Users
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token Token auth
 * @apiParam {String} password Mot de passe de l'utilisateur.
 * @apiParam {String} newEmail Nouvel Emai lde l'utilisateur.
 *
 *
 * @apiDescription Route permettant le changement de l'email d'un utilisateur.
 *
 */

router.put('/changeEmail', function(req, res, next) {
  var idUser = req.currUser.idUser;
  var password = req.body.password;
  var newEmail = req.body.newEmail;

  if (idUser && password && newEmail) {
    var query = 'SELECT ?? FROM ?? WHERE idUser = ?';
    var data = ['pass', 'd_users', idUser];
    query = mysql.format(query, data);
    req.mysql.query(query, function(err, rows) {
      if (err) {
        tools.dSend(res, 'NOK', 'Users', 'changeEmail', 500, err, null);
      } else {
        if (rows[0].pass == md5(password)) {
          var query2 = 'SELECT ?? FROM ?? WHERE emailUser = ?';
          var data = ['pass', 'd_users', newEmail];
          query2 = mysql.format(query2, data);
          req.mysql.query(query2, function(err, rows) {
            if (err) {
              tools.dSend(res, 'NOK', 'Users', 'changeEmail', 500, err, null);
            } else {
              if (rows.length == 0) {
                var query3 = 'UPDATE ?? SET emailUser = ? WHERE idUser = ?';
                var data = ['d_users', newEmail, idUser];
                query3 = mysql.format(query3, data);
                req.mysql.query(query3, function(err, rows) {
                  if (err) {
                    tools.dSend(
                      res,
                      'NOK',
                      'Users',
                      'changeEmail',
                      500,
                      err,
                      null
                    );
                  } else {
                    manageAccount.sendChangeEmail(newEmail);
                    tools.dSend(
                      res,
                      'OK',
                      'Users',
                      'changeEmail',
                      200,
                      'Email changed.',
                      null
                    );
                  }
                });
              } else {
                tools.dSend(
                  res,
                  'NOK',
                  'Users',
                  'changeEmail',
                  500,
                  'This Email already exist.',
                  null
                );
              }
            }
          });
        } else {
          tools.dSend(
            res,
            'NOK',
            'Users',
            'changeEmail',
            500,
            'Invalid password.',
            null
          );
        }
      }
    });
  } else {
    tools.dSend(
      res,
      'NOK',
      'Users',
      'changeEmail',
      500,
      'Un de ces paramètres manquent dans le body: idUser, oldPassword, newPassword.',
      null
    );
  }
});
module.exports = router;
