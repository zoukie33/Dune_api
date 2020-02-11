const { dirname } = require('../../config');

exports.filesGest = function(file, path, newName) {
  let uploadPath = dirname + '/files/' + path + newName;
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    file.mv(uploadPath, function(err) {
      if (err) {
        console.log(err);
      }
    });
    return true;
  } else {
    return false;
  }
};

exports.filesGestGame = function(file, newName) {
  let uploadPath = dirname + '/files/Games/' + newName;
  if (file.mimetype === 'application/zip' || file.mimetype === 'application/octet-stream' || file.mimetype === 'application/x-zip-compressed' || file.mimetype === 'multipart/x-zip') { 
    file.mv(uploadPath, function(err) {
      if (err) {
        console.log(err);
      }
    });
    return true;
  } else {
    return false;
  }
};

exports.filesManagerUpload = function(file, path, newName) {
  let uploadPath = dirname + '/files/' + path + newName;
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'application/pdf' ||
    file.mimetype === 'video/mp4'
  ) {
    file.mv(uploadPath, function(err) {
      if (err) {
        console.log(err);
      }
    });
    return true;
  } else {
    return false;
  }
};
