var express = require('express');
var mysql = require('mysql2');
var router = express.Router();
var doNotif = require('../../functions/notifications');
var store = require('../../functions/store');
var tools = require('../../functions/tools');
var facturation = require('../../functions/facturation');

/**
 * @api {post} /store/ Getting all items in store
 * @apiName Store
 * @apiGroup Store
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {Int} idType Id du type d'application voulue.
 * @apiDescription Route permettant de récupérer toutes les applications par rapport à un Type d'application.
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "error": null,
 *     "response": [
 *        {
 *            "id": 1,
 *            "nomApp": "testApp",
 *            "nomCreator": "test",
 *            "picPath": "1-app.png"
 *        }
 *    ]
 * }
 */

router.post('/', function(req, res, next) {
  var idType = req.body.idType;
  var search = req.body.search;
  if (search) {
    if (idType == 0) {
      var query =
        "SELECT g.id, g.name as 'nomApp', c.nom as 'nomCreator', g.picPath FROM d_games AS g, d_creator as c WHERE g.creator = c.idCreator AND ((g.name LIKE '" +
        search +
        "%') OR (c.nom LIKE '" +
        search +
        "%'))";
    } else {
      var query =
        "SELECT g.id, g.name as 'nomApp', c.nom as 'nomCreator', g.picPath FROM d_games AS g, d_creator as c WHERE g.creator = c.idCreator AND ((g.name LIKE '" +
        search +
        "%') OR (c.nom LIKE '" +
        search +
        "%')) AND idType = " +
        idType;
    }
  } else {
    if (idType == 0) {
      var query =
        "SELECT g.id, g.name as 'nomApp', c.nom as 'nomCreator', g.picPath FROM d_games AS g, d_creator as c WHERE g.creator = c.idCreator";
    } else {
      var query =
        "SELECT g.id, g.name as 'nomApp', c.nom as 'nomCreator', g.picPath FROM d_games AS g, d_creator as c WHERE g.creator = c.idCreator AND idType = " +
        idType;
    }
  }

  req.mysql.query(query, function(error, results, fields) {
    if (error) {
      tools.dSend(res, 'NOK', 'Store', 'Store', 500, error, null);
    } else {
      tools.dSend(res, 'OK', 'Store', 'Store', 200, null, results);
    }
  });
});

/**
 * @api {post} /store/getApp Getting an app by id
 * @apiName getApp
 * @apiGroup Store
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {Int} idApp Id de l'application voulue.
 * @apiDescription Route permettant de récupérer les informations d'une application.
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "error": null,
 *     "response": [
 *        {
 *            "id": 1,
 *            "nomApp": "testApp",
 *            "nomCreator": "test",
 *            "picPath": "1-app.png",
 *            "path": "NULL",
 *            "prix": "50euros",
 *            "nb_joueurs": 4,
 *            "current_version": "1.0",
 *            "niveau": 2
 *        }
 *    ]
 * }
 */

router.post('/getApp', function(req, res, next) {
  if (store.isFreeApps(req, req.currUser.idEcole)) {
    console.log('FODID');
  } else {
    console.log('NOT FODID');
  }
  var idApp = req.body.idApp;
  if (idApp) {
    req.mysql.query(
      'SELECT g.id, g.name as "nomApp", c.nom as "nomCreator", g.picPath, g.path, g.prix, g.nb_joueurs, g.current_version, g.niveau, g.description ' +
        'FROM d_games AS g, d_creator as c ' +
        'WHERE g.creator = c.idCreator AND g.id = ' +
        idApp,
      function(error, results, fields) {
        if (error) {
          tools.dSend(res, 'NOK', 'Store', 'getApp', 500, error, null);
        } else {
          tools.dSend(res, 'OK', 'Store', 'getApp', 200, null, results);
        }
      }
    );
  } else {
    tools.dSend(
      res,
      'NOK',
      'Store',
      'getApp',
      500,
      'Parametre manquant : idApp',
      null
    );
  }
});

/**
 * @api {get} /store/getAppsEcole Getting apps already buyed by a school
 * @apiName getAppsEcole
 * @apiGroup Store
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiDescription Route permettant de récupérer les applications déjà achetées pour une école.
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "error": null,
 *     "response": [
 *        {
 *            "id": 1,
 *            "nomApp": "testApp",
 *            "nomCreator": "test",
 *            "picPath": "1-app.png",
 *            "path": "NULL"
 *        }
 *    ]
 * }
 */

router.get('/getAppsEcole', function(req, res, next) {
  var idEcole = req.currUser.idEcole;
  if (idEcole) {
    req.mysql.query(
      'SELECT g.id, g.name as "nomApp", c.nom as "nomCreator", g.picPath, g.path ' +
        'FROM d_games AS g, d_gamesAppEcole AS ga, d_creator as c ' +
        'WHERE g.id = ga.idGame AND g.creator = c.idCreator AND ga.idEcole = ' +
        idEcole,
      function(error, results, fields) {
        if (error) {
          tools.dSend(res, 'NOK', 'Store', 'getAppsEcole', 500, error, null);
        } else {
          tools.dSend(res, 'OK', 'Store', 'getAppsEcole', 200, null, results);
        }
      }
    );
  } else {
    tools.dSend(
      res,
      'NOK',
      'Store',
      'getAppsEcole',
      500,
      'Parametre manquant : idEcole',
      null
    );
  }
});

/**
 * @api {get} /store/getAppStatus/:id Getting app status (if buyed by the school)
 * @apiName getAppStatus
 * @apiGroup Store
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {Int} idApp Id de l'application demandée.
 * @apiDescription Route permettant de savoir si l'application est détenue par l'école ou non.
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "error": null,
 *     "appStatus": "1"
 * }
 */
router.get('/getAppStatus/:idApp', function(req, res, next) {
  var idEcole = req.currUser.idEcole;
  var idApp = req.params.idApp;
  if (idEcole && idApp) {
    req.mysql.query(
      'SELECT ga.* ' +
        'FROM d_gamesAppEcole AS ga ' +
        'WHERE ga.idGame = ' +
        idApp +
        ' AND ga.idEcole = ' +
        idEcole,
      function(error, results, fields) {
        if (error) {
          tools.dSend(res, 'NOK', 'Store', 'getAppStatus', 500, error, null);
        } else {
          if (results.length == 1) {
            tools.dLog(
              'OK',
              'Store',
              'getAppStatus',
              200,
              null,
              '"appStatus": "1"'
            );
            res.send(
              JSON.stringify({ status: 200, error: null, appStatus: '1' })
            );
          } else {
            let query_apps_left =
              'SELECT (a.nb_app - ae.nb_app) AS free_apps_left ' +
              'FROM d_abonnement a ' +
              'INNER JOIN d_abonnement_ecole ae ON ae.id_abonnement=a.id_Abonnement ' +
              'WHERE ae.id_ecole=' +
              idEcole;
            req.mysql.query(query_apps_left, function(error, results, fields) {
              if (error) {
                tools.dSend(
                  res,
                  'NOK',
                  'Store',
                  'getAppStatus',
                  500,
                  error,
                  null
                );
              } else {
                tools.dLog(
                  'OK',
                  'Store',
                  'getAppStatus',
                  200,
                  null,
                  '"appStatus": "0", "apps_left":' + results[0].free_apps_left
                );
                res.send(
                  JSON.stringify({
                    status: 200,
                    error: null,
                    appStatus: '0',
                    apps_left: results[0].free_apps_left
                  })
                );
              }
            });
          }
        }
      }
    );
  } else {
    tools.dSend(
      res,
      'NOK',
      'Store',
      'getAppStatus',
      500,
      'Parametre manquant : idEcole',
      null
    );
  }
});

/**
 * @api {post} /store/buyApp Asking for buying an app by a prof
 * @apiName buyApp
 * @apiGroup Store
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {Int} idApp Id de l'application à acheter.
 * @apiParam {String} commentaire Commantaide de demande d'achat.
 * @apiDescription Route permettant de faire une demande d'achat d'application.
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "error": null,
 *     "response": {
 *         "fieldCount": 0,
 *         "affectedRows": 1,
 *         "insertId": 1,
 *         "serverStatus": 2,
 *         "warningCount": 0,
 *         "message": "",
 *         "protocol41": true,
 *         "changedRows": 0
 *     }
 * }
 *
 */

router.post('/buyApp', function(req, res, next) {
  var idApp = req.body.idApp;
  var idProf = req.currUser.idUser;
  var idEcole = req.currUser.idEcole;
  var commentaire = req.body.commentaire;
  var quer =
    'SELECT da.idDemande FROM d_demandeAchatGame AS da WHERE da.idGame = ' +
    idApp +
    ' AND da.idEcole = ' +
    idEcole +
    ' AND da.isAccepted = 2';
  if (idApp && idProf && idEcole) {
    req.mysql.query(quer, function(error, results, fields) {
      if (results.length == 1) {
        if (commentaire) {
          var query2 =
            'INSERT INTO d_partDemandeAchat(idDemande, idProf, commentaire) VALUES (' +
            results[0].idDemande +
            ',' +
            idProf +
            ',"' +
            commentaire +
            '")';
        } else {
          var query2 =
            'INSERT INTO d_partDemandeAchat(idDemande, idProf) VALUES (' +
            results[0].idDemande +
            ',' +
            idProf +
            ')';
        }
        req.mysql.query(query2, function(error, results2, fields) {
          if (error) {
            tools.dSend(res, 'NOK', 'Store', 'buyApp', 500, error, 1);
          } else {
            //doNotif.createNotifDirecteur(req, idEcole, results[0].idDemande, 1, "Une demande d'achat d'application a été faite.1");
            tools.dSend(res, 'OK', 'Store', 'buyApp', 200, null, results2);
          }
        });
      } else {
        var query =
          "INSERT INTO d_demandeAchatGame (idGame, idEcole) VALUES ('" +
          idApp +
          "', '" +
          idEcole +
          "')";
        req.mysql.query(query, function(error, results, fields) {
          if (error) {
            tools.dSend(res, 'NOK', 'Store', 'buyApp', 500, error, 2);
          } else {
            if (commentaire) {
              var query2 =
                'INSERT INTO d_partDemandeAchat(idDemande, idProf, commentaire) VALUES (' +
                results.insertId +
                ',' +
                idProf +
                ',"' +
                commentaire +
                '")';
            } else {
              var query2 =
                'INSERT INTO d_partDemandeAchat(idDemande, idProf) VALUES (' +
                results.insertId +
                ',' +
                idProf +
                ')';
            }
            doNotif.createNotifDirecteur(
              req,
              idEcole,
              results.insertId,
              1,
              "Une demande d'achat d'application a été faite."
            );
            req.mysql.query(query2, function(error, results2, fields) {
              if (error) {
                tools.dSend(res, 'NOK', 'Store', 'buyApp', 500, error, 2);
              } else {
                tools.dSend(res, 'OK', 'Store', 'buyApp', 200, null, results2);
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
      'Store',
      'buyApp',
      500,
      'Parametres necessaires: idApp, idProf, idEcole',
      null
    );
  }
});

/**
 * @api {post} /store/buyAppFree Buying directly an App for free
 * @apiName buyAppFree
 * @apiGroup Store
 * @apiPermission Logged + Director
 * @apiVersion 1.0.0
 *
 * @apiParam {Int} idApp Id de l'application a acheter.
 * @apiDescription Route permettant l'achat d'une application sans vérification nécessaire. Cette route n'est appelee que dans le cas ou
 * il reste des applications gratuites dans l'abonnement de l'école. Sinon, c'est la route createCheckoutPayment qui est utilisee pour le paiement via stripe.
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "error": null,
 *     "response": {
 *         "fieldCount": 0,
 *         "affectedRows": 1,
 *         "insertId": 0,
 *         "serverStatus": 2,
 *         "warningCount": 0,
 *         "message": "",
 *         "protocol41": true,
 *         "changedRows": 0
 *     }
 * }
 */

router.post('/buyAppFree', function(req, res, next) {
  var idApp = req.body.idApp;
  var idEcole = req.currUser.idEcole;
  var query =
    'SELECT * FROM d_gamesAppEcole WHERE idGame = ' +
    idApp +
    ' AND idEcole = ' +
    idEcole;
  var query2 =
    "INSERT INTO d_gamesAppEcole (idGame, idEcole) VALUES ('" +
    idApp +
    "', '" +
    idEcole +
    "')";

  if (idApp && idEcole) {
    req.mysql.query(query, function(error, results, fields) {
      if (results.length == 0) {
        req.mysql.query(query2, function(error, results, fields) {
          if (error) {
            tools.dSend(
              res,
              'NOK',
              'Store',
              'buyAppDirecteur',
              500,
              error,
              null
            );
          } else {
            facturation.factureGameFree(req, res, idApp, idEcole);
            store.updateAppCount(req, idEcole); //on met a jour le nbr d'app dont l'ecole peut envore beneficier gratos
            tools.dSend(
              res,
              'OK',
              'Store',
              'buyAppDirecteur',
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
          'Store',
          'buyAppDirecteur',
          500,
          'Application déjà achetée',
          null
        );
      }
    });
  } else {
    tools.dSend(
      res,
      'NOK',
      'Store',
      'buyAppDirecteur',
      500,
      'Parametres necessaires: idApp, idEcole',
      null
    );
  }
});

/**
 * @api {get} /store/typesGames Getting all games types
 * @apiName typesGames
 * @apiGroup Store
 * @apiPermission Logged + Director
 * @apiVersion 1.0.0
 * @apiDescription Route permettant de récupérer tous les types de jeux disponibles.
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "error": null,
 *     "response": [
 *        {
 *            "idType": 1,
 *            "labelType": "Jeux"
 *        }
 *    ]
 * }
 */

router.get('/typesGames', function(req, res, next) {
  var query = 'SELECT * FROM d_typeGames';
  req.mysql.query(query, function(error, results, fields) {
    if (error) {
      tools.dSend(res, 'NOK', 'Store', 'typesGames', 500, error, null);
    } else {
      tools.dSend(res, 'OK', 'Store', 'typesGames', 200, null, results);
    }
  });
});

/**
 * @api {post} /store/validating Validating an appAsk
 * @apiName Validating
 * @apiGroup Store
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {Int} idDemande Id de la demande d'achat.
 * @apiParam {Int} validate Bool (0 ou 1) signifiant si l'achat d'application est validé ou non.
 * @apiDescription Route permettant la validation d'un achat demandé par un professeur.
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "error": null,
 *     "response": [
 *        {
 *            "idGame": 1,
 *            "idEcole": 1
 *        }
 *    ]
 * }
 */

router.post('/validating', function(req, res, next) {
  let typeUser = req.currUser.typeUser;
  let idDemande = req.body.idDemande;
  let validate = req.body.validate;

  if (typeUser && idDemande && validate) {
    if (typeUser == 2) {
      var query =
        'SELECT idGame, idEcole FROM d_demandeAchatGame WHERE idDemande = ' +
        idDemande;
    } else {
      tools.dSend(
        res,
        'NOK',
        'Store',
        'Validating',
        500,
        'Seulement un directeur peut utiliser cette fonction.',
        null
      );
    }

    req.mysql.query(query, function(error, results1, fields) {
      if (error) {
        tools.dSend(res, 'NOK', 'Store', 'Validating', 500, error, null);
      } else {
        if (validate == 1) {
          var query2 =
            "UPDATE d_demandeAchatGame SET isAccepted = '1' WHERE idDemande = " +
            idDemande;
          req.mysql.query(query2, function(error, results2, fields) {
            if (error) {
              tools.dSend(res, 'NOK', 'Store', 'Validating', 500, error, null);
            } else {
              doNotif.createPoolNotif(
                req,
                idDemande,
                1,
                "Votre demande d'achat a été validée par le directeur."
              );
              tools.dSend(
                res,
                'OK',
                'Store',
                'Validating',
                200,
                null,
                results2
              );
            }
          });
        } else {
          var query2 =
            "UPDATE d_demandeAchatGame SET isAccepted = '0' WHERE idDemande = " +
            idDemande;
          req.mysql.query(query2, function(error, results2, fields) {
            if (error) {
              tools.dSend(res, 'NOK', 'Store', 'Validating', 500, error, null);
              res.send(
                JSON.stringify({ status: 500, error: error, response: null })
              );
            } else {
              doNotif.createPoolNotif(
                req,
                idDemande,
                1,
                "Votre demande d'achat n'a pas été validée par le directeur."
              );
              tools.dSend(
                res,
                'OK',
                'Store',
                'Validating',
                200,
                null,
                results2
              );
            }
          });
        }
      }
    });
  } else {
    tools.dSend(
      res,
      'NOK',
      'Store',
      'Validating',
      500,
      'Parametres demandées : typeUser, idDemande',
      null
    );
  }
});

/**
 * @api {post} /store/addAvis Add a view to a game in the store
 * @apiName addAvis
 * @apiGroup Store
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {Int} idGame Id du jeu sur lequel poster un avis.
 * @apiParam {Int} note int correspondant a la note attribuee au jeu.
 * @apiParam {Text} commentaire texte correspondant au commentaire attribuee au jeu.
 * @apiDescription Route permettant l'ajout d'un avis sur un jeu disponible sur le store.
 */

router.post('/addAvis', function(req, res, next) {
  var idProf = req.currUser.idUser;
  var postData = {
    note: req.body.note,
    commentaire: req.body.commentaire,
    idUser: idProf,
    idGame: req.body.idGame
  };

  let idAvis;
  var query = 'INSERT INTO ?? SET ?';
  var table = ['d_gamesAvis', postData];
  query = mysql.format(query, table);

  req.mysql.query(query, function(error, results, fields) {
    if (error) {
      tools.dSend(res, 'NOK', 'Avis', 'add', 500, error, null);
    } else {
      idAvis = results.insertId;
      tools.dSend(res, 'OK', 'Avis', 'add', 200, null, results);
    }
    res.end(JSON.stringify(results));
  });
});

/**
 * @api {post} /store/avis Getting view of app
 * @apiName getAppView
 * @apiGroup Store
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {Int} idApp Id de l'application demandée.
 * @apiParam {Int} depart pour le LIMIT.
 * @apiParam {Int} nbRes pour le LIMIT.
 * @apiDescription Route permettant de voir les avis concernant une application
 * @apiSuccessExample Success-Response:
 * {
    "status": 200,
    "error": null,
    "response": [
        {
            "date": "2019-03-23T17:05:13.000Z",
            "commentaire": "formidable!!",
            "note": 5,
            "nomProf": "Berthaud",
            "prenomProf": "Elodie",
            "photo": "1-prof.png"
        }
    ]
}
 */

router.post('/avis', function(req, res, next) {
  var idApp = req.body.idApp;
  var depart = req.body.depart;
  var nbRes = req.body.nbRes;

  var query =
    'SELECT avis.dateAvis as date, avis.commentaire, avis.note, user.nomUser as nomProf, user.prenomUser as prenomProf, user.picPath as photo ' +
    'FROM d_gamesAvis AS avis ' +
    'INNER JOIN d_users AS user ON user.idUser=avis.idUser ' +
    'WHERE avis.idGame=' +
    idApp +
    ' ' +
    'ORDER BY avis.dateAvis DESC' +
    ' ' +
    'LIMIT ' +
    depart +
    ', ' +
    nbRes;

  req.mysql.query(query, function(error, results, fields) {
    if (error) {
      tools.dSend(res, 'NOK', 'Store', 'typesGames', 500, error, null);
    } else {
      tools.dSend(res, 'OK', 'Store', 'typesGames', 200, null, results);
    }
  });
});

/**
 * @api {get} /store/nbAvis/:idApp Getting number of app views
 * @apiName getNbAppView
 * @apiGroup Store
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {Int} idApp Id de l'application demandée.
 * @apiDescription Route permettant d'avoir le nombre d'avis concernant une application
 * @apiSuccessExample Success-Response:
 * {
    "status": 200,
    "error": null,
    "response": [
        {
            "nbAvis": 59,
            "moyenne": 3.5
        }
    ]
}
 */

router.get('/nbAvis/:idApp', function(req, res, next) {
  var idApp = req.params.idApp;

  var query =
    'SELECT COUNT(avis.idAvis) as nbAvis, AVG(avis.note) as moyenne FROM d_gamesAvis AS avis INNER JOIN d_users AS user ON user.idUser=avis.idUser WHERE avis.idGame=' +
    idApp +
    ' ORDER BY avis.dateAvis DESC';
  req.mysql.query(query, function(error, results, fields) {
    if (error) {
      tools.dSend(res, 'NOK', 'Store', 'typesGames', 500, error, null);
    } else {
      tools.dSend(res, 'OK', 'Store', 'typesGames', 200, null, results);
    }
  });
});

/**
 * @api {get} /store/getUserAvis/:idApp Getting the view of a user
 * @apiName getUserAppView
 * @apiGroup Store
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {Int} idApp Id de l'application demandée.
 * @apiDescription Route permettant de récupérer l'avis d'un utilisateur sur une application, si avis il y a.
 * @apiSuccessExample Success-Response:
 * {
    "status":200,
    "error":null,
    "response":[
        {
            "idAvis":38,
            "note":5,
            "commentaire":"C'est pas mal !!"
        }
    ]
 }
 {
     "status":201,
     "error":null,
     "response":null
 }
 */

router.get('/getUserAvis/:idApp', function(req, res, next) {
  var idApp = req.params.idApp;

  var query =
    'SELECT avis.idAvis, avis.note, avis.commentaire FROM d_gamesAvis AS avis WHERE avis.idGame=' +
    idApp +
    ' AND avis.idUser=' +
    req.currUser.idUser;
  req.mysql.query(query, function(error, results, fields) {
    if (error) {
      tools.dSend(res, 'NOK', 'Avis', 'getUserAvis', 500, error, null);
    } else {
      if (results.length != 0) {
        tools.dSend(res, 'OK', 'Avis', 'getUserAvis', 200, null, results);
      } else {
        tools.dSend(res, 'OK', 'Avis', 'getUserAvis', 201, null, null);
      }
    }
  });
});

/**
 * @api {put} /store/updateUserAvis Update a view
 * @apiName updateUserAvis
 * @apiGroup Store
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {Int} idApp Id de l'application demandée.
 * @apiParam {Int} note note donnée par l'utilisateur.
 * @apiParam {Int} commentaire commentaire donnée par l'utilisateur.
 * @apiDescription Route permettant de modifier l'avis d'un utilisateur
 * @apiSuccessExample Success-Response:
 * {
 * "status":200,
 * "error":null,
 * "response":{
 *      "fieldCount":0,
 *      "affectedRows":1,
 *      "insertId":0,
 *      "serverStatus":34,
 *      "warningCount":0,
 *      "message":"(Rows matched: 1 Changed: 1 Warnings: 0","protocol41":true,"changedRows":1
 *  }
 *}
 */

router.put('/updateUserAvis', function(req, res, next) {
  let idApp = req.body.idApp;
  let note = req.body.note;
  let commentaire = req.body.commentaire;
  let idUser = req.currUser.idUser;

  var query =
    'UPDATE ?? SET note = ?, commentaire = ? WHERE idGame= ? AND idUser = ?';
  var data = ['d_gamesAvis', note, commentaire, idApp, idUser];
  query = mysql.format(query, data);
  req.mysql.query(query, function(error, results, fields) {
    if (error) {
      tools.dSend(res, 'NOK', 'Avis', 'getUserAvis', 500, error, null);
    } else {
      tools.dSend(res, 'OK', 'Avis', 'getUserAvis', 200, null, results);
    }
  });
});
module.exports = router;
