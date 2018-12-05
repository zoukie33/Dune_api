var nodeMailer = require("nodemailer");
var EmailTemplate = require('email-templates').EmailTemplate;
var config = require('../../config');

var transporter = nodeMailer.createTransport('smtps://' + config.sender + ':' + config.emailPass + '@smtp.gmail.com');

var sendCreateAccountLink = transporter.templateSender(
  new EmailTemplate('./templates/createAccount'), {
    	from: 'Dune <noreply@dune.com>',
  });
exports.sendCreateAccount = function (email, pass) {
    // transporter.template
    sendCreateAccountLink({
        to: email,
        subject: 'Account Created - Dune.com'
    }, {
        email: email,
        password: pass
    }, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log('Link sent\n' + JSON.stringify(info));
        }
    });
};
