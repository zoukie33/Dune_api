var express = require('express');
var mysql   = require("mysql");
var router = express.Router();
const fileUpload = require('express-fileupload');
var filez = require('../../functions/files/files');

/**
 * @api {get} /games/ Getting all the games
 * @apiName games
 * @apiGroup Games
 * @apiPermission Logged
 * @apiVersion 1.0.0
 */

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

/**
 * @api {get} /games/:id Getting a game
 * @apiName gamesById
 * @apiGroup Games
 * @apiPermission Logged
 * @apiVersion 1.0.0
 */

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

/**
 * @api {post} /games/add Creating a game
 * @apiName addGame
 * @apiGroup Games
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {String} name
 * @apiParam {String} creator
 */

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

/**
 * @api {post} /games/update Updating a game
 * @apiName updateGame
 * @apiGroup Games
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {Int} id
 * @apiParam {String} name
 * @apiParam {String} creator
 */

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

/**
 * @api {post} /games/picGame Uploading a picture for the game
 * @apiName picGame
 * @apiGroup Games
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {Int} idGame
 * @apiParam {File} picGame
 */

router.post('/picGame', function(req, res, next) {
	if (Object.keys(req.files).length != 0) {
		var id  = req.body.idGame;
		let file;

		file = req.files.picGame;
		var fileName = id + "-app.png";
		if (filez.filesGest(file, "apps/", fileName)) {
			var query = "UPDATE d_games SET picPath = '" + fileName + "'  WHERE id = " + id;
						req.mysql.query(query, function(error, results, fields) {
							if (error){
								res.send(JSON.stringify({"status": 500, "error": error, "response": "Impossible de mettre a jour cet utilisateur."}));
							} else {
								res.send(JSON.stringify({"status": 200, "response": "User Updated"}));
								console.log("Une photo User a été mis a jour : [" + fileName + "]");
							}
							res.end(JSON.stringify(results));
						});
		} else {
			res.send(JSON.stringify({"status": 500, "error": "shut"}));
		}
	} else {
		res.send(JSON.stringify({"status": 500, "error": "Error uploading File"}));
	}
});

module.exports = router;
