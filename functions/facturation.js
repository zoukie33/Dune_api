var tools = require('./tools');
var mysql = require('mysql2');

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

exports.factureGameFree = function(req, res, idGame, idEcole) {

    let query_app = "SELECT name from d_games WHERE id="+idGame;
    query_app = mysql.format(query_app);

    req.mysql.query(query_app, function(error, results, fields) {
        if (error) {
            tools.dLog('NOK', 'Facturation', 'factureGameFree', 500, error, results);
        } else {
            let queryFact = 'INSERT INTO ?? (idEcole, id_app, id_abonnement, entity_name, typeFacture, prixHT, prixTTC, free_app, paid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
            let data = ['d_facturation', idEcole, idGame, 0, results[0].name, 2, 0, 0, 1, 1];
            queryFact = mysql.format(queryFact, data);
            req.mysql.query(queryFact, function(error, results, fields) {
                if (error) {
                    tools.dLog('NOK', 'Facturation', 'factureGameFree', 500, error, results);
                } else {
                    tools.dLog('OK', 'Facturation', 'factureGameFree', 200, null, results);
                }
            });
        }
    });
};
