const nodeMailer = require("nodemailer");
const EmailTemplate = require('email-templates').EmailTemplate;
const { sender, emailPass } = require('../../config');

var transporter = nodeMailer.createTransport('smtps://' + sender + ':' + emailPass + '@smtp.gmail.com');

var sendResetPasswordLink = transporter.templateSender(
  new EmailTemplate('./templates/resetPassword'), {
    	from: 'Dune <noreply@dune.com>',
  });
exports.sendPasswordReset = function (email, pass) {
    // transporter.template
    sendResetPasswordLink({
        to: email,
        subject: 'Password Reset - Dune.com'
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
