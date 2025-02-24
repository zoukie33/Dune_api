var jwt = require('jsonwebtoken');
var mysql = require('mysql2');
var config = require('./config');

var verifyToken = function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['token'];
  if (token) {
    jwt.verify(token, config.secret, function(err, currUser) {
      if (err) {
        res.send(err);
      } else {
        req.currUser = currUser;
        next();
      }
    });
  } else {
    res.status(401).send('Invalid Access');
  }
};
module.exports = verifyToken;
