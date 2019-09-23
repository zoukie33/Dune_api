var express = require('express');
var mysql = require('mysql');
var serial = require('generate-serial-key');
var md5 = require('MD5');
var router = express.Router();
var filez = require('../../functions/files/files');
var tools = require('../../functions/tools');

/**
 * @api {post} /admin/create/createSchool/ Create a school
 * @apiName createSchool
 * @apiGroup AdminCreate
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token AdminToken auth
 * @apiParam {String} nomEcole Nom de l'école
 * @apiParam {String} rueEcole Nom de rue de l'école
 * @apiParam {Int} numRueEcole Numéro batiment de l'école
 * @apiParam {String} villeEcole Ville de l'école
 * @apiParam {String} departementEcole Département de l'école
 * @apiParam {String} telEcole Numero de téléphone de l'école
 * @apiParam {String} emailEcole Email de l'école
 *
 * @apiError 500 SQL Error.
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *    "status": 200,
 *    "error": null,
 *       "response": {
 *           "fieldCount": 0,
 *           "affectedRows": 1,
 *           "insertId": 11,
 *           "serverStatus": 2,
 *           "warningCount": 0,
 *           "message": "",
 *           "protocol41": true,
 *           "changedRows": 0
 *       }
 * }
 * @apiErrorExample {json} Error-Response:
 * {
 *    "Cette route necessite que trous les champs soient remplis."
 * }
 */

router.post('/createSchool', function(req, res, next) {
  var name = req.body.nomEcole,
    rue = req.body.rueEcole,
    numRue = req.body.numRueEcole,
    ville = req.body.villeEcole,
    departement = req.body.departementEcole,
    tel = req.body.telEcole;
  email = req.body.emailEcole;

  if (name && rue && numRue && ville && departement && tel) {
    var query =
      'INSERT INTO ?? (nomEcole, rue, numRue, ville, departement, tel, email) VALUES (?,?,?,?,?,?,?)';
    var data = ['d_ecole', name, rue, numRue, ville, departement, tel, email];
    query = mysql.format(query, data);
    req.mysql.query(query, function(error, results, fields) {
      if (error) {
        tools.dSend(
          res,
          'NOK',
          'Admin-Create',
          'createSchool',
          500,
          error,
          null
        );
      } else {
        let datas = {
          address: rue + ' ' + numRue + ' ' + ville + ' ' + departement,
          ecoleName: name,
          email: email,
          idEcole: results.insertId
        };
        if (stripe.addCustomer(req, res, datas)) {
          tools.dSend(
            res,
            'NOK',
            'Admin-Create/stripe',
            'createSchool',
            201,
            null,
            results
          );
        } else {
          tools.dSend(
            res,
            'OK',
            'Admin-Create/stripe',
            'createSchool',
            200,
            null,
            results
          );
        }
      }
    });
  } else {
    tools.dSend(
      res,
      'NOK',
      'Admin-Create',
      'createSchool',
      500,
      null,
      'Cette route necessite que trous les champs soient remplis.'
    );
  }
});

/**
 * @api {post} /admin/create/genLicence Generating licences
 * @apiName genLicence
 * @apiGroup AdminCreate
 * @apiPermission notLogged
 * @apiVersion 1.0.0
 * @apiSuccessExample {json} Success-Response:
 * {
 *    "status": 200,
 *    "error": null,
 *       "response": [
 *         "Q6M8-P6V5-E9GN-VWER",
 *         "4LV9-Q3DL-GMAH-UAKT",
 *         "XC62-P44M-RGFE-TAZA",
 *         "9MSX-A787-J4R4-ZQ4K",
 *         "AQ7X-N9T2-XEEH-DX2X"
 *     ]
 * }
 * @apiHeader {String} token AdminToken auth
 * @apiParam {Int} nbLicences
 * @apiParam {Int} idEcole
 */

router.post('/genLicence', function(req, res, next) {
  var nbLicences = req.body.nbLicences;
  var tabLicence = [];
  var idEcole = req.body.idEcole;
  var expDate = new Date();
  expDate =
    expDate.getUTCFullYear() +
    1 +
    '-' +
    ('00' + (expDate.getUTCMonth() + 1)).slice(-2) +
    '-' +
    ('00' + expDate.getUTCDate()).slice(-2) +
    ' ' +
    ('00' + expDate.getUTCHours()).slice(-2) +
    ':' +
    ('00' + expDate.getUTCMinutes()).slice(-2) +
    ':' +
    ('00' + expDate.getUTCSeconds()).slice(-2);
  if (nbLicences == 0) {
    res.send(
      JSON.stringify({
        status: 500,
        error: error,
        response: 'nbLicences doit être supérieur à 0.'
      })
    );
  } else if (nbLicences > 50) {
    res.send(
      JSON.stringify({
        status: 500,
        error: error,
        response: 'nbLicences doit être inférieur ou égal à 50.'
      })
    );
  } else if (idEcole == '') {
    res.send(
      JSON.stringify({
        status: 500,
        error: error,
        response: 'idEcole manquant.'
      })
    );
  } else {
    for (var i = nbLicences; i > 0; i--) {
      let lic = serial.generate();
      tabLicence.push(lic);
      req.mysql.query(
        "INSERT INTO d_licencesTables (idEcole, serial, used, dateExpire) VALUES ('" +
          idEcole +
          "', '" +
          lic +
          "', 0, '" +
          expDate +
          "')",
        function(error, results, fields) {
          if (error) {
            console.log(error);
            tools.dSend(
              res,
              'NOK',
              'Admin-Create',
              'genLicence',
              500,
              error,
              null
            );
          }
        }
      );
    }
    tools.dSend(res, 'OK', 'Admin-Create', 'genLicence', 200, null, tabLicence);
  }
});

/**
 * @api {post} /admin/create/createGame Creating a game
 * @apiName createGame
 * @apiGroup AdminCreate
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token AdminToken auth
 * @apiParam {String} name Nom de l'application/jeu.
 * @apiParam {Int} idCreator Id du créateur
 * @apiParam {Int} idType Id du type de jeu
 * @apiParam {String} description Description de l'application
 * @apiParam {Int} nbJoueurs Nombre de joueurs possibles (2-4 ou encore 4-6).
 * @apiParam {String} currVersion Version actuelle de l'app/jeu (1.0)
 * @apiParam {Int} niveau Niveau de difficulté de l'app/jeu (1 ou 2)
 * @apiParam {Int} prix Prix de l'app/jeu (0 = free)
 * @apiError 500 SQL Error.
 * @apiSuccessExample {json} Success-Response:
 * {
 *    "Game Added"
 * }
 * @apiErrorExample {json} Error-Response:
 * {
 *    "un des champs est manquant"
 * }
 */

router.post('/createGame', function(req, res, next) {
  var name = req.body.name;
  var idType = req.body.idType;
  var idCreator = req.body.idCreator;
  var description = req.body.description;
  var nbJoueurs = req.body.nbJoueurs;
  var currVersion = req.body.currVersion;
  var niveau = req.body.niveau;
  var prix = req.body.prix;

  var query =
    'INSERT INTO d_games (idType, name, creator, path, picPath, prix, nb_joueurs, current_version, niveau, description) VALUES ("' +
    idType +
    '", "' +
    name +
    '", "' +
    idCreator +
    '", "NULL", "NULL", "' +
    prix +
    '", ' +
    nbJoueurs +
    ', "' +
    currVersion +
    '", ' +
    niveau +
    ',  "' +
    description +
    '")';
  if (
    name &&
    idType &&
    idCreator &&
    description &&
    nbJoueurs &&
    currVersion &&
    niveau &&
    prix
  ) {
    req.mysql.query(query, function(error, results, fields) {
      if (error) {
        tools.dSend(res, 'NOK', 'Admin-Create', 'createGame', 500, error, null);
      } else {
        tools.dSend(
          res,
          'OK',
          'Admin-Create',
          'createGame',
          200,
          null,
          'Game Added'
        );
      }
    });
  } else {
    tools.dSend(
      res,
      'NOK',
      'Admin-Create',
      'createGame',
      500,
      'un des champs est manquant',
      null
    );
  }
});

/**
 * @api {post} /admin/create/createDirecteur Creating a Director
 * @apiName createDirecteur
 * @apiGroup AdminCreate
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token AdminToken auth
 * @apiParam {String} nom Nom du directeur a ajouter.
 * @apiParam {String} prenom Prenom du directeur a ajouter.
 * @apiParam {String} email Email du directeur a ajouter.
 * @apiParam {int} idEcole Id de l'ecole du directeur a ajouter.
 * @apiError 500 SQL Error.
 * @apiSuccessExample {json} Success-Response:
 * {
 *    "Game Added"
 * }
 * @apiErrorExample {json} Error-Response:
 * {
 *    "un des champs est manquant"
 * }
 */

router.post('/createDirecteur', function(req, res, next) {
  let nom = req.body.nom;
  let prenom = req.body.prenom;
  let email = req.body.email;
  let typeUser = 2;
  let idEcole = req.body.idEcole;
  let pass = md5(new Date());

  if (nom && prenom && email && typeUser && idEcole) {
    let query =
      'INSERT INTO ?? (nomUser, prenomUser, emailUser, pass, typeUser) VALUES (?,?,?,?,?)';
    let data = ['d_users', nom, prenom, email, pass, typeUser];
    query = mysql.format(query, data);
    req.mysql.query(query, function(error, results, fields) {
      if (error) {
        tools.dSend(
          res,
          'NOK',
          'Admin-Create',
          'createDirecteur',
          500,
          error,
          null
        );
      } else {
        let idDir = results.insertId;
        let query = 'INSERT INTO ?? (idEcole, idProf) VALUES (?,?)';
        let data = ['d_profsAppEcole', idEcole, idDir];
        query = mysql.format(query, data);
        req.mysql.query(query, function(error, results2, fields) {
          if (error) {
            tools.dSend(
              res,
              'NOK',
              'Admin-Create',
              'createDirecteur',
              500,
              error,
              null
            );
          } else {
            let query = 'UPDATE ?? SET idDirecteur = ? WHERE id = ?';
            let data = ['d_ecole', idDir, idEcole];
            query = mysql.format(query, data);
            req.mysql.query(query, function(error, results2, fields) {
              if (error) {
                tools.dSend(
                  res,
                  'NOK',
                  'Admin-Create',
                  'createDirecteur',
                  500,
                  error,
                  null
                );
              } else {
                manageAccount.sendCreateAccount(req.body.email, password);
                tools.dSend(
                  res,
                  'OK',
                  'Admin-Create',
                  'createDirecteur',
                  200,
                  null,
                  'Director Added'
                );
              }
            });
          }
        });
      }
    });
  } else {
    tools.dSend(
      res,
      'NOK',
      'Admin-Create',
      'createDirecteur',
      500,
      'un des champs est manquant',
      null
    );
  }
});

/**
 * @api {post} /admin/create/createClass/ Create a class
 * @apiName createClass
 * @apiGroup AdminCreate
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token AdminToken auth
 * @apiParam {Int} idEcole Id de l'école
 * @apiParam {Int} level Niveau de la classe
 * @apiParam {Int} num Numero de la classe
 * @apiParam {String} annee Année de la classe (2019/2020)
 *
 * @apiError 500 SQL Error.
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *    "status": 200,
 *    "error": null,
 *       "response": {
 *           "fieldCount": 0,
 *           "affectedRows": 1,
 *           "insertId": 11,
 *           "serverStatus": 2,
 *           "warningCount": 0,
 *           "message": "",
 *           "protocol41": true,
 *           "changedRows": 0
 *       }
 * }
 * @apiErrorExample {json} Error-Response:
 * {
 *    "Cette route necessite que trous les champs soient remplis."
 * }
 */

router.post('/createClass', function(req, res, next) {
  var idEcole = req.body.idEcole,
    levelClass = req.body.level,
    numClasse = req.body.num,
    anneeClasse = req.body.annee;

  if (idEcole && levelClass && numClasse && anneeClasse) {
    var query = 'INSERT INTO ?? (level, num, annee) VALUES (?,?,?)';
    var data = ['d_classe', levelClass, numClasse, anneeClasse];
    query = mysql.format(query, data);
    req.mysql.query(query, function(error, results, fields) {
      if (error) {
        tools.dSend(
          res,
          'NOK',
          'Admin-Create',
          'createClass',
          500,
          error,
          null
        );
      } else {
        var query = 'INSERT INTO ?? (idClasse, idEcole) VALUES (?,?)';
        var data = ['d_classeEcole', results.insertId, idEcole];
        query = mysql.format(query, data);
        req.mysql.query(query, function(error, results, fields) {
          if (error) {
            tools.dSend(
              res,
              'NOK',
              'Admin-Create',
              'createClass',
              500,
              error,
              null
            );
          } else {
            tools.dSend(
              res,
              'OK',
              'Admin-Create',
              'createClass',
              200,
              null,
              results
            );
          }
        });
      }
    });
  } else {
    tools.dSend(
      res,
      'NOK',
      'Admin-Create',
      'createClass',
      500,
      null,
      'Cette route necessite que trous les champs soient remplis.'
    );
  }
});

/**
 * @api {post} /admin/create/addAllStudents/ Pushing all studients in one time
 * @apiName createClass
 * @apiGroup AdminCreate
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token AdminToken auth
 * @apiParam {Int} idEcole Id de l'école
 * @apiParam {Int} level Niveau de la classe
 * @apiParam {Int} num Numero de la classe
 * @apiParam {String} annee Année de la classe (2019/2020)
 *
 * @apiError 500 SQL Error.
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *    "status": 200,
 *    "error": null,
 *       "response": {
 *           "fieldCount": 0,
 *           "affectedRows": 1,
 *           "insertId": 11,
 *           "serverStatus": 2,
 *           "warningCount": 0,
 *           "message": "",
 *           "protocol41": true,
 *           "changedRows": 0
 *       }
 * }
 * @apiParamExample {json} Request-Example:
 *  {
 *    "idEcole": 1,
 *    "Eleves": [
 *      {
 *        "nomEleve":"Fodid",
 *        "prenomEleve":"Patrick"
 *      },
 *      {
 *        "nomEleve":"Pastis",
 *        "prenomEleve":"Landais"
 *      }
 *    ]
 *  }
 * @apiErrorExample {json} Error-Response:
 * {
 *    "Cette route necessite que trous les champs soient remplis."
 * }
 */

router.post('/addAllStudents', function(req, res, next) {
  var idEcole = req.body.idEcole,
    levelClass = req.body.level,
    numClasse = req.body.num,
    anneeClasse = req.body.annee;

  if (idEcole && levelClass && numClasse && anneeClasse) {
    var query = 'INSERT INTO ?? (level, num, annee) VALUES (?,?,?)';
    var data = ['d_classe', levelClass, numClasse, anneeClasse];
    query = mysql.format(query, data);
    req.mysql.query(query, function(error, results, fields) {
      if (error) {
        tools.dSend(
          res,
          'NOK',
          'Admin-Create',
          'createClass',
          500,
          error,
          null
        );
      } else {
        var query = 'INSERT INTO ?? (idClasse, idEcole) VALUES (?,?)';
        var data = ['d_classeEcole', results.insertId, idEcole];
        query = mysql.format(query, data);
        req.mysql.query(query, function(error, results, fields) {
          if (error) {
            tools.dSend(
              res,
              'NOK',
              'Admin-Create',
              'createClass',
              500,
              error,
              null
            );
          } else {
            tools.dSend(
              res,
              'OK',
              'Admin-Create',
              'createClass',
              200,
              null,
              results
            );
          }
        });
      }
    });
  } else {
    tools.dSend(
      res,
      'NOK',
      'Admin-Create',
      'createClass',
      500,
      null,
      'Cette route necessite que trous les champs soient remplis.'
    );
  }
});

module.exports = router;
