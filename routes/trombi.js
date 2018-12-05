var express = require('express');
var mysql   = require("mysql");
var router = express.Router();

router.post('/', function(req, res, next) {
  var idUser = req.body.idUser;
  var typeUser = req.body.typeUser;

  if (typeUser && idUser) {
    if (typeUser == 1) {
      var myQuery = 'SELECT e.*, ce.idClasse FROM d_eleves AS e, d_classeEleve AS ce, d_classe AS c, d_profsAppClasse AS ac, d_users AS u WHERE u.idUser = ac.idProf AND ac.idClasse = c.idClasse AND c.idClasse = ce.idClasse AND ce.idEleve = e.idEleve AND u.idUser = ' + idUser;
    } else {
      var myQuery = 'SELECT e.*, ce.idClasse FROM d_eleves AS e, d_classeEleve AS ce, d_classe AS c, d_users AS u, d_classeEcole AS ce2, d_profsAppEcole AS ae WHERE u.idUser = ae.idProf AND ae.idEcole = ce2.idEcole AND ce2.idClasse = c.idClasse AND c.idClasse = ce.idClasse AND ce.idEleve = e.idEleve AND u.idUser = ' + idUser;
    }
    req.mysql.query(myQuery, function (error, results, fields) {
  	  	if(error){
  	  		res.send(JSON.stringify({"status": 500, "error": error}));
  	  	} else {
    			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  	  	}
    	});
  } else {
    res.send(JSON.stringify({"status": 500, "error": "idUser ou typeUser manquants."}));
  }
});

router.post('/classes', function(req, res, next) {
  var idUser = req.body.idUser;
  var typeUser = req.body.typeUser;

  if (typeUser && idUser) {
    if (typeUser == 1) {
      var myQuery = 'SELECT c.idClasse FROM d_classe AS c, d_users AS u, d_profsAppClasse AS ac WHERE u.idUser = ac.idProf AND ac.idClasse = c.idClasse AND u.idUser = ' + idUser;
    } else {
      var myQuery = 'SELECT c.idClasse FROM d_classe AS c, d_users AS u, d_classeEcole AS ce2, d_profsAppEcole AS ae WHERE u.idUser = ae.idProf AND ae.idEcole = ce2.idEcole AND ce2.idClasse = c.idClasse AND u.idUser = ' + idUser;
    }
    req.mysql.query(myQuery, function (error, results, fields) {
  	  	if(error){
  	  		res.send(JSON.stringify({"status": 500, "error": error}));
  	  	} else {
    			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  	  	}
    	});
  } else {
    res.send(JSON.stringify({"status": 500, "error": "idUser ou typeUser manquants."}));
  }
});

router.post('/byClasse', function(req, res, next) {
  var idUser = req.body.idUser;
  var typeUser = req.body.typeUser;
  var idClasse = req.body.idClasse;

  if (typeUser && idUser && idClasse) {
    if (typeUser == 1) {
      var myQuery = 'SELECT e.* FROM d_classe AS c, d_users AS u, d_profsAppClasse AS ac, d_classeEleve as ce, d_eleves as e WHERE u.idUser = ac.idProf AND ac.idClasse = c.idClasse AND c.idClasse = ce.idClasse AND ce.idEleve = e.idEleve AND u.idUser = ' + idUser + ' AND c.idClasse = ' + idClasse;
    } else {
      var myQuery = 'SELECT e.*, ce.idClasse FROM d_eleves AS e, d_classeEleve AS ce, d_classe AS c, d_users AS u, d_classeEcole AS ce2, d_profsAppEcole AS ae WHERE u.idUser = ae.idProf AND ae.idEcole = ce2.idEcole AND ce2.idClasse = c.idClasse AND c.idClasse = ce.idClasse AND ce.idEleve = e.idEleve AND u.idUser = ' + idUser + ' AND c.idClasse = ' + iClasse;
    }
    req.mysql.query(myQuery, function (error, results, fields) {
  	  	if(error){
  	  		res.send(JSON.stringify({"status": 500, "error": error}));
  	  	} else {
    			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  	  	}
    	});
  } else {
    res.send(JSON.stringify({"status": 500, "error": "idUser ou typeUser ou idClasse manquants."}));
  }
});
module.exports = router;
