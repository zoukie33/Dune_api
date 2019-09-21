const fileUpload = require('express-fileupload');
var config = require('../../config');

exports.filesGest = function (file, path, newName) {
  let uploadPath = config.dirname + '/files/' + path + newName;
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    file.mv(uploadPath, function(err) {
      if (err) {
        console.log(err);
      }
    });
  return (true);
  } else {
    return (false);
  }
};

exports.filesManagerUpload = function (file, path, newName) {
  let uploadPath = config.dirname + '/files/' + path + newName;
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'application/pdf' || file.mimetype === 'video/mp4') {
    file.mv(uploadPath, function(err) {
      if (err) {
        console.log(err);
      }
    });
  return (true);
  } else {
    return (false);
  }
};
