const nodeMailer = require("nodemailer");
const EmailTemplate = require('email-templates').EmailTemplate;
const { sender, emailPass } = require('../../config');

var transporter = nodeMailer.createTransport('smtps://' + sender + ':' + emailPass + '@smtp.gmail.com');

var sendLicense = transporter.templateSender(
    new EmailTemplate('./templates/licences'), {
        from: 'Dune <noreply@dune.com>',
    });
exports.sendLicences = function (email, licences) {
    // transporter.template
    sendLicense({
        to: email,
        subject: "Votre demande de licences d'activation"
    }, {
        email: email,
        licences: licences
    }, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log('Link sent\n' + JSON.stringify(info));
        }
    });
};
