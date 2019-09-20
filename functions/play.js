var tools = require('./tools');

exports.validPlayed = function (req, idGP) {
  var query = "UPDATE d_gamesPlayed SET isPlayed = 1 WHERE idGP = " + idGP;
  req.mysql.query(query, function (error, results, fields) {
    if(error){
      tools.dSend(res, "NOK", "Play", "createGame", 500, error, results);
    } else {
      return (true);
    }
  });
};
