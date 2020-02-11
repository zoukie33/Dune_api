const nodeMailer = require("nodemailer");
const EmailTemplate = require('email-templates').EmailTemplate;
const { sender, emailPass } = require('../../config');

var transporter = nodeMailer.createTransport('smtps://' + sender + ':' + emailPass + '@smtp.gmail.com');

var sendAskAppLink = transporter.templateSender(
  new EmailTemplate('./templates/mailNotifAskApp'), {
    	from: 'Dune <noreply@dune.com>',
  });
exports.sendAskApp = function (email) {
    // transporter.template
    sendAskAppLink({
        to: email,
        subject: "Nouvelle demande d'application - Dune.com"
    }, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log('Link sent\n' + JSON.stringify(info));
        }
    });
};


var sendOkAskAppLink = transporter.templateSender(
  new EmailTemplate('./templates/mailNotifAskAppOk'), {
    	from: 'Dune <noreply@dune.com>',
  });
exports.sendOkAskApp = function (email) {
    // transporter.template
    sendOkAskAppLink({
        to: email,
        subject: "Votre demande d'application a été validée - Dune.com"
    }, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log('Link sent\n' + JSON.stringify(info));
        }
    });
};
