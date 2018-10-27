var express = require('express');
var mysql   = require("mysql");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	req.mysql.query('SELECT * from d_games', function (error, results, fields) {
	  	if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
  			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  			//If there is no error, all is good and response is 200OK.
	  	}
  	});
});

router.get('/:id?', function(req, res, next) {
	req.mysql.query('SELECT * from d_games WHERE id = ' + req.params.id , function (error, results, fields) {
	  	if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
  			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  			//If there is no error, all is good and response is 200OK.
	  	}
  	});
});

router.post('/add', function(req, res, next) {
  var name  = req.body.name;
  var creator  = req.body.creator;

  var query = "INSER INTO d_games (name, creator, path) VALUES ('"+ name +"', '"+ creator +"', 'NULL')";

  req.mysql.query(query, function(error, results, fields) {
    if (error){
      res.send(JSON.stringify({"status": 500, "error": error, "response": "Impossible d'ajouter ce jeu."}));
    } else {
      res.send(JSON.stringify({"status": 200, "response": "Game Added"}));
      console.log("Un jeu a été ajouté : [" + name + " - by : " + creator + "]");
    }
    res.end(JSON.stringify(results));
  });
});

router.post('/update', function(req, res, next) {
  var id  = req.body.id;
  var name  = req.body.name;
  var creator  = req.body.creator;

  var query = "UPDATE d_games SET name = '"+ name +"', creator = '"+ creator +"' WHERE id = " + id;

  req.mysql.query(query, function(error, results, fields) {
    if (error){
      res.send(JSON.stringify({"status": 500, "error": error, "response": "Impossible de mettre a jour ce jeu."}));
    } else {
      res.send(JSON.stringify({"status": 200, "response": "Game Updated"}));
      console.log("Un jeu a été mis a jour : [" + id + " - " + name + " - by : " + creator + "]");
    }
    res.end(JSON.stringify(results));
  });
});

module.exports = router;
