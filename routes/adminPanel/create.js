const express = require('express');
const mysql = require('mysql2');
const fs = require('fs');
const { dirname } = require('../../config');
const serial = require('generate-serial-key');
const md5 = require('MD5');
const generator = require('generate-password');
const manageAccount = require('../../functions/mails/manageAccount');
const router = express.Router();
// const filez = require('../../functions/files/files');
const stripe = require('../../functions/stripe');
const tools = require('../../functions/tools');

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
  var emailReg = new RegExp(/^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/i);
  let name = req.body.nomEcole,
    rue = req.body.rueEcole,
    numRue = req.body.numRueEcole,
    ville = req.body.villeEcole,
    departement = req.body.departementEcole,
    tel = req.body.telEcole;
  email = req.body.emailEcole;

  if (name && rue && numRue && ville && departement && tel) {
    if (emailReg.test(email)) {
      let query =
        'INSERT INTO ?? (nomEcole, rue, numRue, ville, departement, tel, email) VALUES (?,?,?,?,?,?,?)';
      let data = ['d_ecole', name, rue, numRue, ville, departement, tel, email];
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
            /* if (!fs.existsSync(dirname + '/files/' + datas.idEcole)) {
              fs.mkdirSync(dirname + '/files/' + datas.idEcole);
            } */
            tools.dSend(
              res,
              'OK',
              'Admin-Create/stripe',
              'createSchool',
              200,
              null,
              results
            );
          } else {
            tools.dSend(
              res,
              'OK',
              'Admin-Create/stripe',
              'createSchool',
              201,
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
        400,
        null,
        "l'Email n'est pas un format Email."
      );
    }
  } else {
    tools.dSend(
      res,
      'NOK',
      'Admin-Create',
      'createSchool',
      400,
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
  let nbLicences = req.body.nbLicences;
  let tabLicence = [];
  let idEcole = req.body.idEcole;
  let expDate = new Date();
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
    for (let i = nbLicences; i > 0; i--) {
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
 * @apiParam {String} description Description de l'application
 * @apiParam {Int} nbJoueurs Nombre de joueurs possibles (2-4 ou encore 4-6).
 * @apiParam {String} currVersion Version actuelle de l'app/jeu (1.0)
 * @apiParam {Int} niveau Niveau de difficulté de l'app/jeu (1 ou 2)
 * @apiParam {Int} prix Prix de l'app/jeu (0 = free)
 * @apiParam {Array[int]} competences Array de compétences a ajouter
 *
 * @apiError 400 Bad request.
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
  console.log(req.body);
  let name = req.body.name;
  let idCreator = req.body.idCreator;
  let description = req.body.description;
  let nbJoueurs = req.body.nbJoueurs;
  let currVersion = req.body.currVersion;
  let niveau = req.body.niveau;
  let prix = req.body.prix;
  let comps = req.body.competences;

  let query = `INSERT INTO d_games (name, creator, prix, nb_joueurs, current_version, niveau, description) VALUES ("
    ${name}", "${idCreator}", ${prix}, ${nbJoueurs}, ${currVersion}, ${niveau}, "${description}")`;
  if (
    typeof name != 'undefined' &&
    typeof idCreator != 'undefined' &&
    typeof description != 'undefined' &&
    typeof nbJoueurs != 'undefined' &&
    typeof currVersion != 'undefined' &&
    typeof niveau != 'undefined' &&
    typeof prix != 'undefined' &&
    typeof comps != 'undefined'
  ) {
    req.mysql.query(query, function(error, results, fields) {
      if (error) {
        tools.dSend(res, 'NOK', 'Admin-Create', 'createGame', 500, error, null);
      } else {
        for (let i = 0; i < comps.length; i++) {
          const comp = comps[i];
          let q = `INSERT INTO d_compGame (idComp, idGame) VALUES (${comp}, ${results.insertId})`;
          q = mysql.format(q);
          req.mysql.query(q, function(error, results, fields) {
            if (error) {
              tools.dSend(
                res,
                'NOK',
                'Admin-Create',
                'createGame',
                500,
                error,
                null
              );
              return;
            } else {
              if (i == comps.length - 1) {
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
            }
          });
        }
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
      400,
      'Bad request',
      'un des champs est manquant'
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
  let pass = generator.generate({
    length: 8,
    numbers: true
  });
  if (nom && prenom && email && typeUser && idEcole) {
    let query =
      'INSERT INTO ?? (nomUser, prenomUser, emailUser, pass, typeUser) VALUES (?,?,?,?,?)';
    let data = ['d_users', nom, prenom, email, md5(pass), typeUser];
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
                manageAccount.sendCreateAccount(req.body.email, pass);
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
  let idEcole = req.body.idEcole,
    levelClass = req.body.level,
    numClasse = req.body.num,
    anneeClasse = req.body.annee;

  if (idEcole && levelClass && numClasse && anneeClasse) {
    let query = 'INSERT INTO ?? (level, num, annee) VALUES (?,?,?)';
    let data = ['d_classe', levelClass, numClasse, anneeClasse];
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
        let query = 'INSERT INTO ?? (idClasse, idEcole) VALUES (?,?)';
        let data = ['d_classeEcole', results.insertId, idEcole];
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
 * @api {post} /admin/create/addStudent/ Creating one student
 * @apiName addStudent
 * @apiGroup AdminCreate
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token AdminToken auth
 * @apiParam {Int} idEcole Id de l'école
 * @apiParam {String} nomEleve Nom de l'élève
 * @apiParam {String} prenomEleve Prénom de l'élève

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

router.post('/addStudent', function(req, res, next) {
  let idEcole = req.body.idEcole,
    nomEleve = req.body.nomEleve,
    prenomEleve = req.body.prenomEleve;
  if (idEcole && nomEleve && prenomEleve) {
    let query = 'INSERT INTO ?? (nomEleve, prenomEleve) VALUES (?,?)';
    let data = ['d_eleves', nomEleve, prenomEleve];
    query = mysql.format(query, data);
    req.mysql.query(query, function(error, results, fields) {
      if (error) {
        tools.dSend(res, 'NOK', 'Admin-Create', 'addStudent', 500, error, null);
      } else {
        let query = 'INSERT INTO ?? (idEleve, idEcole) VALUES (?,?)';
        let data = ['d_elevesEcole', results.insertId, idEcole];
        query = mysql.format(query, data);
        req.mysql.query(query, function(error, results, fields) {
          if (error) {
            tools.dSend(
              res,
              'NOK',
              'Admin-Create',
              'addStudent',
              500,
              error,
              null
            );
          } else {
            tools.dSend(
              res,
              'OK',
              'Admin-Create',
              'addStudent',
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
      'addStudent',
      500,
      null,
      'Cette route necessite que trous les champs soient remplis.'
    );
  }
});

/**
 * @api {post} /admin/create/addAllStudents/ Pushing all studients in one time
 * @apiName addAllStudents
 * @apiGroup AdminCreate
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token AdminToken auth
 * @apiParam {Int} idClasse Id de la classe
 * @apiParam {Array[int]} idEleves Id des eleves
 *
 * @apiError 500 SQL Error.
 * @apiError 400 Bad Request.
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
 *    "idClasse": 1,
 *    "idEleves": [1, 2, 3, 4, 5, 6]
 *  }
 * @apiErrorExample {json} Error-Response:
 * {
 *    "Cette route necessite que tous les champs soient remplis."
 * }
 */

router.post('/addAllStudents', function(req, res, next) {
  let idClasses = req.body.idClasse,
    idEleves = req.body.idEleves;

  if (typeof idClasses != 'undefined' && typeof idEleves != 'undefined') {
    let queryDel = `DELETE FROM d_classeEleve WHERE idClasse = ${idClasses}`;
    queryDel = mysql.format(queryDel);
    req.mysql.query(queryDel, function(err, results) {
      if (err) {
        tools.dSend(
          res,
          'NOK',
          'Admin-Create',
          'addAllStudents',
          500,
          err,
          null
        );
      } else {
        if (typeof idEleves[0] == 'undefined') {
          tools.dSend(
            res,
            'OK',
            'Admin-Create',
            'addAllStudents',
            200,
            null,
            "Plus d'élèves dans cette classe."
          );
        } else {
          for (let i = 0; i < idEleves.length; i++) {
            const element = idEleves[i];
            let query = `INSERT INTO d_classeEleve(idClasse, idEleve) VALUES (${idClasses}, ${element})`;
            query = mysql.format(query);
            req.mysql.query(query, function(err, results) {
              if (err) {
                tools.dSend(
                  res,
                  'NOK',
                  'Admin-Create',
                  'addAllStudents',
                  500,
                  err,
                  null
                );
              } else {
                if (i == idEleves.length - 1) {
                  tools.dSend(
                    res,
                    'OK',
                    'Admin-Create',
                    'addAllStudents',
                    200,
                    null,
                    results
                  );
                }
              }
            });
          }
        }
      }
    });
  } else {
    tools.dSend(
      res,
      'NOK',
      'Admin-Create',
      'addAllStudents',
      400,
      'Bad request.',
      'Cette route necessite que tous les champs soient remplis.'
    );
  }
});

/**
 * @api {post} /admin/create/addProfToAClasse/ Adding A prof to a class
 * @apiName addProfToAClasse
 * @apiGroup AdminCreate
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token AdminToken auth
 * @apiParam {Int} idClasse Id de la classe
 * @apiParam {Int} idProf Id du prof a ajouter dans la classe
 *
 * @apiError 500 SQL Error.
 * @apiError 400 Bad Request.
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
 *    "Cette route necessite que tous les champs soient remplis."
 * }
 */

router.post('/addProfToAClasse', function(req, res, next) {
  let idClasse = req.body.idClasse,
    idProf = req.body.idProf;
  if (typeof idClasse != 'undefined' && typeof idProf != 'undefined') {
    let query = `INSERT INTO d_profsAppClasse(idProf,idClasse) VALUES (${idProf}, ${idClasse})`;
    query = mysql.format(query);
    req.mysql.query(query, function(err, results) {
      if (err) {
        tools.dSend(
          res,
          'NOK',
          'Admin-Create',
          'addProfToAClasse',
          500,
          err,
          null
        );
      } else {
        tools.dSend(
          res,
          'OK',
          'Admin-Create',
          'addProfToAClasse',
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
      'Admin-Create',
      'addProfToAClasse',
      400,
      'Bad request.',
      'Cette route necessite que tous les champs soient remplis.'
    );
  }
});

/**
 * @api {post} /admin/create/addProfToMultipleClasses/ Adding A prof to multiples class
 * @apiName addProfToMultipleClasses
 * @apiGroup AdminCreate
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token AdminToken auth
 * @apiParam {Array[int]} idClasses Id des classe
 * @apiParam {int} idProf Id du prof a ajouter dans la classe
 *
 * @apiError 500 SQL Error.
 * @apiError 400 Bad Request.
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
 *    "Cette route necessite que tous les champs soient remplis."
 * }
 */

router.post('/addProfToMultipleClasses', function(req, res, next) {
  console.log(req.body.idClasses + ' ' + req.body.idProf);
  let idClasses = req.body.idClasses,
    idProf = req.body.idProf;
  if (typeof idClasses != 'undefined' && typeof idProf != 'undefined') {
    let queryDel = `DELETE FROM d_profsAppClasse WHERE idProf = ${idProf}`;
    queryDel = mysql.format(queryDel);
    req.mysql.query(queryDel, function(err, results) {
      if (err) {
        tools.dSend(
          res,
          'NOK',
          'Admin-Create',
          'addProfToMultipleClasses',
          500,
          err,
          null
        );
      } else {
        if (typeof idClasses[0] == 'undefined') {
          tools.dSend(
            res,
            'OK',
            'Admin-Create',
            'addProfToMultipleClasses',
            200,
            null,
            "Le prof n'a plus de classes."
          );
        } else {
          for (let i = 0; i < idClasses.length; i++) {
            const element = idClasses[i];
            let query = `INSERT INTO d_profsAppClasse(idProf,idClasse) VALUES (${idProf}, ${element})`;
            query = mysql.format(query);
            req.mysql.query(query, function(err, results) {
              if (err) {
                tools.dSend(
                  res,
                  'NOK',
                  'Admin-Create',
                  'addProfToMultipleClasses',
                  500,
                  err,
                  null
                );
              } else {
                if (i == idClasses.length - 1) {
                  tools.dSend(
                    res,
                    'OK',
                    'Admin-Create',
                    'addProfToMultipleClasses',
                    200,
                    null,
                    results
                  );
                }
              }
            });
          }
        }
      }
    });
  } else {
    tools.dSend(
      res,
      'NOK',
      'Admin-Create',
      'addProfToMultipleClasses',
      400,
      'Bad request.',
      'Cette route necessite que tous les champs soient remplis.'
    );
  }
});

/**
 * @api {post} /admin/create/createProf/ Creating a professor
 * @apiName createProf
 * @apiGroup AdminCreate
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token AdminToken auth
 * @apiParam {String} nom Nome de l'utilisateur.
 * @apiParam {String} prenom Prénom de l'utilisateur.
 * @apiParam {String} email Email de l'utilisateur.
 * @apiParam {Int} idEcole Id de l'école.
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

router.post('/createProf', function(req, res, next) {
  let query = 'SELECT * FROM ?? WHERE ??=?';
  let table = ['d_users', 'emailUser', req.body.email];
  query = mysql.format(query, table);
  let idEcole = req.body.idEcole;
  (nom = req.body.nom), (prenom = req.body.prenom), (email = req.body.email);

  if (
    typeof idEcole != 'undefined' &&
    typeof nom != 'undefined' &&
    typeof prenom != 'undefined' &&
    typeof email != 'undefined'
  ) {
    req.mysql.query(query, function(err, rows) {
      if (err) {
        tools.dSend(res, 'NOK', 'Admin-Create', 'createProf', 500, err, null);
      } else {
        if (rows.length == 0) {
          let password = generator.generate({
            length: 8,
            numbers: true
          });
          let postData = {
            nomUser: nom,
            prenomUser: prenom,
            emailUser: email,
            pass: md5(password),
            typeUser: 1,
            access_token: 'n/a',
            device_type: 'web',
            cgu: 0
          };
          let query = 'INSERT INTO ?? SET ?';
          let table = ['d_users', postData];
          query = mysql.format(query, table);

          req.mysql.query(query, function(error, results, fields) {
            if (error) {
              tools.dSend(
                res,
                'NOK',
                'Admin-Create',
                'createProf',
                500,
                error,
                null
              );
            } else {
              let query = 'INSERT INTO ?? (idEcole, idProf) VALUES (?,?)';
              let data = [
                'd_profsAppEcole',
                req.body.idEcole,
                results.insertId
              ];
              query = mysql.format(query, data);
              req.mysql.query(query, function(error, results2, fields) {
                if (error) {
                  tools.dSend(
                    res,
                    'NOK',
                    'Users',
                    'createProf',
                    500,
                    error,
                    null
                  );
                } else {
                  manageAccount.sendCreateAccount(req.body.email, password);
                  res.send(
                    JSON.stringify({ status: 200, error: null, pass: password })
                  );
                  tools.dLog(
                    'OK',
                    'Admin-Create',
                    'createProf',
                    200,
                    null,
                    postData
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
            'createProf',
            501,
            err,
            'Un utilisateur est déja inscrit avec cet Email.'
          );
        }
      }
    });
  } else {
    tools.dSend(
      res,
      'NOK',
      'Admin-Create',
      'createProf',
      400,
      'Bad Request',
      null
    );
  }
});

/**
 * @api {post} /admin/create/createComp/ Creating Competence
 * @apiName createComp
 * @apiGroup AdminCreate
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token AdminToken auth
 * @apiParam {String} libelleComp Libelle de la compétence a ajouter
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
 *    "libelleComp": "Reconnaitre les chiffres"
 *  }
 * @apiErrorExample {json} Error-Response:
 * {
 *    "Cette route necessite que trous les champs soient remplis."
 * }
 */

router.post('/createComp', function(req, res, next) {
  let libelleComp = req.body.libelleComp;
  let errVar = 'Cette route necessite que trous les champs soient remplis.';
  if (libelleComp) {
    let query = 'INSERT INTO ?? (libelleComp) VALUES (?)';
    let data = ['d_competences', libelleComp];
    query = mysql.format(query, data);
    req.mysql.query(query, function(error, results, fields) {
      if (error) {
        tools.dSend(res, 'NOK', 'Users', 'createComp', 500, error, null);
      } else {
        tools.dSend(
          res,
          'OK',
          'Admin-Create',
          'createComp',
          200,
          null,
          results
        );
      }
    });
  } else {
    tools.dSend(res, 'NOK', 'Admin-Create', 'createComp', 500, null, errVar);
  }
});

module.exports = router;
