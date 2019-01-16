var jwt = require('jsonwebtoken');

exports.createNotif = function (req, idUser, idToNotify, typeNotif, textNotif) {
  let query = 'INSERT INTO d_notifications (idUser, idToNotify, typeNotif, textNotif) VALUES ("' + idUser + '", "' + idToNotify + '", "' + typeNotif + '", "' + textNotif + '")';
  req.mysql.query(query, function(error, results, fields) {
    if(error){
      return (error);
    } else {
      console.log("Une notification a été ajoutée : [" + idUser + " - " + idToNotify + " - " + typeNotif + " - " + textNotif +"]");
      return ("TRUE");
    }
  });
};

exports.createNotifDirecteur = function (req, idEcole, idToNotify, typeNotif, textNotif) {
  let query1 = "SELECT idDirecteur FROM d_ecole WHERE id = " + idEcole;
    req.mysql.query(query1, function(error, results, fields) {
    if(error){
      return (error);
    } else {
      let idUser = results[0].idDirecteur;
      let query2 = 'INSERT INTO d_notifications (idUser, idToNotify, typeNotif, textNotif) VALUES ("' + idUser + '", "' + idToNotify + '", "' + typeNotif + '", "' + textNotif + '")';
      req.mysql.query(query2, function(error, results, fields) {
        if(error){
          return (error);
        } else {
          console.log("Une notification a été ajoutée : [" + idUser + " - " + idToNotify + " - " + typeNotif + " - " + textNotif +"]");
          return ("TRUE");
        }
      });
    }
  });

};
