var express = require('express');
var mysql   = require("mysql");
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require('../../config');

router.post('/verifyToken', function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['token'];
   if (token) {
    jwt.verify(token, config.secret, function (err, currUser) {
      if (err) {
        res.send(err);
      } else {
        res.send(JSON.stringify({"status": 200, "response": "Token valid"}));
        req.currUser = currUser;
      }
    });
  }
   else {
     res.send(JSON.stringify({"status": 401, "response": "Invalid Access"}));
  }
});


module.exports = router;
