const tools = require('./tools');
const mysql = require('mysql2');

let updateAppCount = (exports.updateAppCount = function(req, idEcole) {
  let query =
    'SELECT COUNT(idGame) AS nbAppBuyed FROM d_gamesAppEcole ae WHERE ae.idEcole = ' +
    idEcole;
  query = mysql.format(query);

  req.mysql.query(query, function(error, results, fields) {
    if (error) {
      tools.dLog('NOK', 'Func', 'updateAppCount', 500, error, null);
    } else {
      let query2 =
        'UPDATE d_abonnement_ecole SET nb_app = ' +
        results[0].nbAppBuyed +
        ' WHERE id_ecole = ' +
        idEcole;
      query2 = mysql.format(query2);
      req.mysql.query(query2, function(error) {
        if (error) {
          tools.dLog('NOK', 'Func', 'updateAppCount', 500, error, 2);
        } else {
          return true;
        }
      });
    }
  });
});

exports.isFreeApps = function(req, idEcole) {
  let query =
    'SELECT a.nb_app AS nbAppMax, ae.nb_app AS nbAppBuyed FROM d_abonnement AS a, d_abonnement_ecole AS ae WHERE a.id_abonnement = ae.id_abonnement AND ae.id_ecole = ' +
    idEcole;
  query = mysql.format(query);
  req.mysql.query(query, function(error, results, fields) {
    if (error) {
      tools.dLog('NOK', 'Func', 'isFreeApps', 500, error, null);
      return false;
    } else {
      if (results[0].nbAppMax > results[0].nbAppBuyed) return true;
      else return false;
    }
  });
};
