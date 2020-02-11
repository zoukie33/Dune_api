const nodeMailer = require("nodemailer");
const EmailTemplate = require('email-templates').EmailTemplate;
const { sender, emailPass } = require('../../config');

var transporter = nodeMailer.createTransport('smtps://' + sender + ':' + emailPass + '@smtp.gmail.com');

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

var sendChangeEmailLink = transporter.templateSender(
  new EmailTemplate('./templates/changeEmail'), {
    	from: 'Dune <noreply@dune.com>',
  });
exports.sendChangeEmail = function (email) {
    // transporter.template
    sendChangeEmailLink({
        to: email,
        subject: 'Account Created - Dune.com'
    }, {
        email: email
    }, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log('Link sent\n' + JSON.stringify(info));
        }
    });
};

var sendChangePasswordLink = transporter.templateSender(
  new EmailTemplate('./templates/changePassword'), {
    	from: 'Dune <noreply@dune.com>',
  });
exports.sendChangePassword = function (email) {
    // transporter.template
    sendChangePasswordLink({
        to: email,
        subject: 'Password Reset - Dune.com'
    }, {
        email: email
    }, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log('Link sent\n' + JSON.stringify(info));
        }
    });
};

var sendContactToDuneLink = transporter.templateSender(
  new EmailTemplate('./templates/helpContact'), {
    	from: 'Dune - HELP - <noreply@dune.com>',
  });

exports.sendContactToDune = function (pbType, pbDetail, emailUser) {
    // transporter.template
    sendContactToDuneLink({
        to: "dune.epitech.contact@gmail.com",
        subject: pbType
    }, {
        pbDetail: pbDetail,
        pbType: pbType,
        emailUser: emailUser
    }, function (err, info) {
        if (err) {
            console.log(err)
        } /* else {
            console.log('Link sent\n' + JSON.stringify(info));
        } */
    });
};
