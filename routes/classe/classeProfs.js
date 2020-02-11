var express = require('express');
var mysql = require('mysql2');
var config = require('../../config');
var tools = require('../../functions/tools');
var router = express.Router();

/**
 * @api {get} /classes/profs Get Classes for an User
 * @apiName getClasses
 * @apiGroup ClassesProfs
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token Token auth
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "idProf": 1,
 *     "response": [
 *      {
 *          "idClasse": 3,
 *          "level": 5,
 *          "num": 1,
 *          "annee": "2017/2018",
 *          "effectif": 3
 *      },
 *      {
 *          "idClasse": 5,
 *          "level": 7,
 *          "num": 1,
 *          "annee": "2017/2018",
 *          "effectif": 2
 *      }
 *  ]
 * }
 */

router.get('/', function(req, res, next) {
  var idProf = req.currUser.idUser;

  if (req.currUser.typeUser == 2) {
    var query =
      'SELECT c.idClasse, c.level, c.num, c.annee, COUNT(ce.idEleve) AS effectif FROM d_profsAppEcole AS ape, d_classeEcole AS cee, d_classe AS c, d_classeEleve AS ce WHERE ape.idEcole = cee.idEcole AND cee.idClasse = c.idClasse AND c.idClasse = ce.idClasse AND ape.idProf = ' +
      idProf +
      ' GROUP BY c.idClasse ORDER BY c.level, c.num ASC';
  } else {
    var query =
      'SELECT c.idClasse, c.level, c.num, c.annee, COUNT(ce.idEleve) AS effectif from d_profsAppClasse AS apc, d_classe AS c, d_classeEleve AS ce WHERE apc.idClasse = c.idClasse AND c.idClasse = ce.idClasse AND apc.idProf = ' +
      idProf +
      ' GROUP BY c.idClasse ORDER BY c.level, c.num ASC';
  }

  req.mysql.query(query, function(error, results, fields) {
    if (error) {
      tools.dSend(
        res,
        'NOK',
        'ClasseProfs',
        '/classes/profs',
        500,
        error,
        null
      );
    } else {
      tools.dSend(
        res,
        'OK',
        'ClasseProfs',
        '/classes/profs',
        200,
        null,
        results
      );
    }
  });
});

module.exports = router;
