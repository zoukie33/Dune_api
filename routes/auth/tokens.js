var express = require('express');
var mysql   = require("mysql");
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require('../../config');

/**
 * @api {post} /tokens/verifyToken Verifying a jwt token
 * @apiName verifyToken
 * @apiGroup Auth
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiError 401 Invalid Access
 * @apiHeader {String} token Token auth
 * @apiParam {String} token Token d'authentification
 * @apiDescription Route permettant la vérification d'un JWT Token.
 */

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

/**
 * @api {post} /tokens/verifyTokenAdmin Verifying an Admin jwt token
 * @apiName verifyTokenAdmin
 * @apiGroup Auth
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiError 401 Invalid Access
 * @apiHeader {String} token AdminToken auth 
 * @apiParam {String} token Token d'authentification
 * @apiDescription Route permettant la vérification d'un JWT Token.
 */

router.post('/verifyTokenAdmin', function(req, res, next) {
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
