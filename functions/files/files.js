
const fileUpload = require('express-fileupload');
exports.filesGest = function (file, path, newName) {
  let uploadPath = '/home/zoukie/ftp/dev/files/' + path + newName;
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
