var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { helpCodes: 'Status Codes', typeUser: 'Type utilisateur', post: 'Routes Post', get: 'Routes Get' });
});

router.get('/doc/get', function(req, res, next) {
  res.render('get', { helpCodes: 'Status Codes', typeUser: 'Type utilisateur', post: 'Routes Post', get: 'Routes Get' });
});

router.get('/doc/post', function(req, res, next) {
  res.render('post', { helpCodes: 'Status Codes', typeUser: 'Type utilisateur', post: 'Routes Post', get: 'Routes Get' });
});

router.get('/doc/helpCodes', function(req, res, next) {
  res.render('helpCodes', { helpCodes: 'Status Codes', typeUser: 'Type utilisateur', post: 'Routes Post', get: 'Routes Get' });
});

router.get('/doc/typeUsers', function(req, res, next) {
  res.render('typeUsers', { helpCodes: 'Status Codes', typeUser: 'Type utilisateur', post: 'Routes Post', get: 'Routes Get' });
});

module.exports = router;
