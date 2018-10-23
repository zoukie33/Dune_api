var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	req.mysql.query('SELECT * from d_eleves', function (error, results, fields) {
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
	req.mysql.query('SELECT * from d_eleves WHERE idEleve = ' + req.params.id , function (error, results, fields) {
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
  var directorId = req.body.directorId;
	var postData = {
    nomEleve:req.body.nom,
    prenomEleve:req.body.prenom
  }
	console.log(postData);

  var query = "INSERT INTO ?? SET ?";
  var table = ["d_eleves"];
  query = mysql.format(query,table);

	req.mysql.query(query, postData, function(error, results, fields) {
		if (error){
			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
		} else {
			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
      console.log("Un Prof a été ajouté: " + postData);
		}
	  res.end(JSON.stringify(results));
	});
});

router.post('/update', function(req, res, next) {
  res.json({"Error" : true, "Message" : "This route is not working now"});
  /*var query = "SELECT * FROM ?? WHERE ??=?";
  var table = ["d_profs", "emailProf", req.body.email];
  query = mysql.format(query,table);

  req.mysql.query(query,function(err,rows){
  if(err) {
    res.json({"Error" : true, "Message" : "Error executing MySQL query"});
  }
  else {
    if(rows.length==0){
      var password = generator.generate({
        length: 8,
        numbers: true
      });
      var directorId = req.body.directorId;
    	var postData = {
        nomProf:req.body.nom,
        prenomProf:req.body.prenom,
        emailProf:req.body.email,
        pass: md5(password),
        access_token:"n/a",
        device_type:"web"
      }
    	console.log(postData);

      var query = "UPDATE ?? SET ?";
      var table = ["d_profs"];
      query = mysql.format(query,table);

    	req.mysql.query(query, postData, function(error, results, fields) {
    		if (error){
    			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
    		} else {
    			res.send(JSON.stringify({"status": 200, "error": null, "pass": password}));
          console.log("Un Prof a été ajouté: " + postData);
    		}
    	  res.end(JSON.stringify(results));
    	});
    }
    else {
      res.send(JSON.stringify({"status": 501, "error": err, "response": "Un utilisateur est déja inscrit avec cet Email."}));
    }
  }
});*/
});

module.exports = router;

// {"nomEleve""la","prenomEleve":chatte}
