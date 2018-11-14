var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Dune-Api', helpCodes: 'Status Codes', typeUser: 'Type utilisateur', post: 'Routes Post', get: 'Routes Get' });
});

router.get('/doc/get', function(req, res, next) {
  res.render('get', { title: 'Dune-Api', helpCodes: 'Status Codes', typeUser: 'Type utilisateur', post: 'Routes Post', get: 'Routes Get' });
});

router.get('/doc/post', function(req, res, next) {
  res.render('post', { title: 'Dune-Api', helpCodes: 'Status Codes', typeUser: 'Type utilisateur', post: 'Routes Post', get: 'Routes Get' });
});

router.get('/doc/helpCodes', function(req, res, next) {
  res.render('helpCodes', { title: 'Dune-Api', helpCodes: 'Status Codes', typeUser: 'Type utilisateur', post: 'Routes Post', get: 'Routes Get' });
});

router.get('/doc/typeUsers', function(req, res, next) {
  res.render('typeUsers', { title: 'Dune-Api', helpCodes: 'Status Codes', typeUser: 'Type utilisateur', post: 'Routes Post', get: 'Routes Get' });
});

module.exports = router;
