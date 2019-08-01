const fileUpload = require('express-fileupload');

exports.filesGest = function (file, path, newName) {
  let uploadPath = '/root/Dune_api/files/' + path + newName;
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
  let uploadPath = '/root/Dune_api/files/' + path + newName;
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
