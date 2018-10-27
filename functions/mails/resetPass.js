// var nodeMailer = require("nodemailer");
// var EmailTemplate = require('email-templates');
// var config = require('../../config');
//
// var transporter = nodeMailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 587,
//     auth: {
//         user: config.sender,
//         pass: config.emailPass
//     },
//     logger: false,
//     debug: false
// },
// {
//   from: 'Dune <noreply@dune.com>'
// });
//
// var sendResetPasswordLink = transporter.templateSender(
//     new EmailTemplate({
//         views: { root: './templates/resetPassword'}
//     }));
//
// exports.sendPasswordReset = function (email, pass) {
//     // transporter.template
//     sendResetPasswordLink({
//         to: email,
//         subject: 'Password Reset - Dune.com'
//     }, {
//         email: email,
//         password: pass
//     }, function (err, info) {
//         if (err) {
//             console.log(err)
//         } else {
//             console.log('Link sent\n' + JSON.stringify(info));
//         }
//     });
// };
