var tools = require('./tools');
var mysql = require('mysql2');
const serial = require('generate-serial-key');

exports.generateLicences = function(req, nbLicences, idEcole) {
    let tabLicence = [];
    let expDate = new Date();
    expDate =
        expDate.getUTCFullYear() +
        1 +
        '-' +
        ('00' + (expDate.getUTCMonth() + 1)).slice(-2) +
        '-' +
        ('00' + expDate.getUTCDate()).slice(-2) +
        ' ' +
        ('00' + expDate.getUTCHours()).slice(-2) +
        ':' +
        ('00' + expDate.getUTCMinutes()).slice(-2) +
        ':' +
        ('00' + expDate.getUTCSeconds()).slice(-2);
    if (nbLicences === 0) {
        return false;
    } else if (nbLicences > 50) {
        return false;
    } else if (idEcole === '') {
        return false;
    } else {
        for (let i = nbLicences; i > 0; i--) {
            let lic = serial.generate();
            tabLicence.push(lic);
            req.mysql.query(
                "INSERT INTO d_licencesTables (idEcole, serial, used, dateExpire) VALUES ('" +
                idEcole +
                "', '" +
                lic +
                "', 0, '" +
                expDate +
                "')",
                function (error, results, fields) {
                    if (error) {
                        return false;
                    }
                }
            );
        }
        return true;
    }
}
