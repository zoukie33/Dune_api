var express = require('express');
var mysql   = require("mysql");
var router = express.Router();
const fileUpload = require('express-fileupload');
var filez = require('../../functions/files/files');
var tools = require('../../functions/tools');

/**
 * @api {get} /files/Games/:idGame Download a game
 * @apiName downGame
 * @apiGroup Games
 * @apiPermission Logged
 * @apiVersion 1.0.0
 *
 * @apiParam {Int} idGame Id de l'app/jeu.
 */

router.get('/files/Games/:idGame', function(req, res, next) {

    var idGame  = req.params.idGame;
    var idEcole = req.currUser.idEcole;

    var query = "SELECT * FROM d_gamesAppEcole WHERE idEcole="+idEcole+ " AND idGame="+idGame;

    var file = '/home/zoukie/ftp/dev/files/Games/Game-'+idGame+'.zip';

    req.mysql.query(query, function(error, results, fields) {
        console.log(results.length);
        if (error){
            tools.dSend(res, "NOK", "Games", "Games", 500, error, null);
        } else {
            if (results.length > 0){

                var files = res.download(file, 'game.zip', function(err){
                    if (err) {
                        res.status(err.statusCode).end();
                    } else {
                        res.status(200).end();

                    }
                });

            }else{
                tools.dSend(res, "NOK", "Games", "Games", 401, error, "unauthorized");
            }
        }
    });

});

module.exports = router;
