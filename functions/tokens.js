var jwt = require('jsonwebtoken');

exports.getPerms = function (token) {
  var decoded = jwt.decode(token);
  return (decoded.typeUser);
};
