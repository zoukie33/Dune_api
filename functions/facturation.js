var tools = require('./tools');
var mysql = require('mysql');

exports.factureAbonnement = function(req, idGP) {
  var query = 'UPDATE d_gamesPlayed SET isPlayed = 1 WHERE idGP = ' + idGP;
  req.mysql.query(query, function(error, results, fields) {
    if (error) {
      tools.dLog(res, 'NOK', 'Play', 'createGame', 500, error, results);
    } else {
      return true;
    }
  });
};

exports.factureGame = function(req, res, idGame, idEcole) {
  var query = 'SELECT prix, prixTTC FROM ?? WHERE id = ?';
  var data = ['d_games', idGame];
  query = mysql.format(query, data);
  req.mysql.query(query, function(error, results, fields) {
    if (error) {
      tools.dLog('NOK', 'Facturation', 'factureGame', 500, error, results);
    } else {
      var prixHT = results[0].prix == null ? 0 : results[0].prix,
        prixTTC = results[0].prixTTC == null ? 0 : results[0].prixTTC,
        date = new Date(),
        typeFacture = 2;

      query =
        'INSERT INTO ?? (idEcole, typeFacture, date, prixHT, prixTTC) VALUES (?,?,?,?,?)';
      data = ['d_facturation', idEcole, typeFacture, date, prixHT, prixTTC];
      query = mysql.format(query, data);
      req.mysql.query(query, function(error, results, fields) {
        if (error) {
          tools.dLog('NOK', 'Facturation', 'factureGame', 500, error, results);
        } else {
          tools.dLog('OK', 'Facturation', 'factureGame', 200, null, results);
        }
      });
    }
  });
};
