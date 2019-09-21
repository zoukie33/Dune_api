var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var tools = require('../../functions/tools');

/* GET users listing. */
router.get('/', function(req, res, next) {
  req.mysql.query('SELECT * from d_tables', function(error, results, fields) {
    if (error) {
      tools.dSend(res, 'NOK', 'Table', '/', 500, error, null);
    } else {
      tools.dSend(res, 'OK', 'Table', '/', 200, null, results);
    }
  });
});

router.get('/getTableBySchool/:idEcole', function(req, res, next) {
  req.mysql.query('SELECT * from d_tables', function(error, results, fields) {
    if (error) {
      tools.dSend(res, 'NOK', 'Table', '/', 500, error, null);
    } else {
      tools.dSend(res, 'OK', 'Table', '/', 200, null, results);
    }
  });
});

router.post('/update', function(req, res, next) {
  // var id  = req.body.idEleve;
  // var nom  = req.body.nomEleve;
  // var prenom  = req.body.prenomEleve;
  //
  // var query = "UPDATE d_eleves SET nomEleve = '"+ nom +"', prenomEleve = '"+ prenom +"' WHERE idEleve = " + id;
  //
  // req.mysql.query(query, function(error, results, fields) {
  //   if (error){
  //     res.send(JSON.stringify({"status": 500, "error": error, "response": "Impossible de mettre a jour cet élève."}));
  //   } else {
  //     res.send(JSON.stringify({"status": 200, "response": "Student Updated"}));
  //     console.log("Un élève a été mis a jour : [" + id + " - " + nom + " - " + prenom + "]");
  //   }
  //   res.end(JSON.stringify(results));
  // });
});

module.exports = router;
