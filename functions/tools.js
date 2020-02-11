const { debugLogging } = require('../config');

exports.dLog = function(isOk, mod, route, status, error, response) {
  if (debugLogging === 'true') {
    let copiedDate = new Date();
    copiedDate.setHours(copiedDate.getHours() + 2);
    let now = copiedDate.toISOString().match(/(\d{2}:){2}\d{2}/)[0];
    let now1 = new Date().toLocaleDateString();
    console.log(
      `${now} - ${now1} - [${isOk}] - [${mod} - ${route}] - [Status: ${status}] - [Error: ${error}] - [Response: ${JSON.stringify(
        response
      )}]`
    );
  }
};

exports.dSend = function(res, isOk, mod, route, status, error, response) {
  res
    .status(status)
    .send(JSON.stringify({ status: status, error: error, response: response }));
  //if (debugLogging === 'true') {
  let copiedDate = new Date();
  copiedDate.setHours(copiedDate.getHours() + 2);
  let now = copiedDate.toISOString().match(/(\d{2}:){2}\d{2}/)[0];
  let now1 = new Date().toLocaleDateString();
  console.log(
    `${now} - ${now1} - [${isOk}] - [${mod} - ${route}] - [Status: ${status}] - [Error: ${error}] - [Response: ${JSON.stringify(
      response
    )}]`
  );
  //}
};
