var express = require('express');
var router = express.Router();
var tools = require('../functions/tools');
var help = require('../functions/mails/manageAccount');

/**
 * @api {post} /help/contact Form contact
 * @apiName contact
 * @apiGroup Help
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} token Token auth
 * @apiParam {String} pbType Type du problème
 * @apiParam {String} pbDetail Détail du problème
 * @apiError 500 SQL Error.
 * @apiError 400 Bad Request.
 *
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "error": null,
 *     "response": "Mail send."
 * }
 */

router.post('/contact', function(req, res, next) {
  var pbType = req.body.pbType;
  var pbDetail = req.body.pbDetail;
  if (typeof pbType != 'undefined' && typeof pbDetail != 'undefined') {
    help.sendContactToDune(pbType, pbDetail, req.currUser.emailUser);
    tools.dSend(res, 'OK', 'Help', 'contact', 200, null, 'Form help valid.');
  } else {
    tools.dSend(res, 'NOK', 'Help', 'verifPassword', 400, null, 'Bad Request');
  }
});

module.exports = router;
