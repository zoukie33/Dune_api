exports.dLog = function(isOk, mod, route, status, error, response) {
  var copiedDate = new Date();
  copiedDate.setHours(copiedDate.getHours() + 2);
  var now = copiedDate.toISOString().match(/(\d{2}:){2}\d{2}/)[0];
  var now1 = new Date().toLocaleDateString();
  console.log(
    now +
      ' - ' +
      now1 +
      ' - [' +
      isOk +
      '] - [' +
      mod +
      ' - ' +
      route +
      '] - [Status: ' +
      status +
      '] - [Error: ' +
      error +
      '] - [Response: ' +
      JSON.stringify(response) +
      ']'
  );
};

exports.dSend = function(res, isOk, mod, route, status, error, response) {
  res.send(
    JSON.stringify({ status: status, error: error, response: response })
  );
  var copiedDate = new Date();
  copiedDate.setHours(copiedDate.getHours() + 2);
  var now = copiedDate.toISOString().match(/(\d{2}:){2}\d{2}/)[0];
  var now1 = new Date().toLocaleDateString();
  console.log(
    now +
      ' - ' +
      now1 +
      ' - [' +
      isOk +
      '] - [' +
      mod +
      ' - ' +
      route +
      '] - [Status: ' +
      status +
      '] - [Error: ' +
      error +
      '] - [Response: ' +
      JSON.stringify(response) +
      ']'
  );
};
