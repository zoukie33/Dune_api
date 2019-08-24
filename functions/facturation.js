var tools = require('./tools');

exports.factureAbonnement = function (req, idGP) {
  var query = "UPDATE d_gamesPlayed SET isPlayed = 1 WHERE idGP = " + idGP;
  req.mysql.query(query, function (error, results, fields) {
    if(error){
      tools.dSend(res, "NOK", "Play", "createGame", 500, error, results);
    } else {
      return (true);
    }
  });
};

exports.factureGame = function (req, idGame, idEcole) {
  var query = "SELECT prix, prixTTC FROM ?? WHERE idGame = ?";
  var data = ["d_classeEleve", idGame];
  query = mysql.format(query, data);
  req.mysql.query(query, function (error, results, fields) {
    if(error){
      tools.dSend(res, "NOK", "Facturation", "factureGame", 500, error, results);
    } else {
      var prixHT = results[0].prix == NULL ? 0 : results[0].prix,
        prixTTC = results[0].prixTTC == NULL ? 0 : results[0].prixTTC,
        date = new Date().now(),
        typeFacture = 2;
        query = "INSERT INTO ?? VALUES (?,?,?,?,?)";
        data = ["d_facturation", idEcole, typeFacture, date, prixHT, prixTTC];
        req.mysql.query(query, function (error, results, fields) {
          if(error){
            tools.dSend(res, "NOK", "Facturation", "factureGame", 500, error, results);
          } else {
            tools.dSend(res, "OK", "Facturation", "factureGame", 200, null, results);
          }
        });
    }
  });
};
