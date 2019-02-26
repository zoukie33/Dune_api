
exports.dLog = function (isOk, mod, route, status, error, response) {
  console.log("[" + isOk + "] - [" + mod + " - " + route + "] - [Status: " + status + "] - [Error: " + error + "] - [Response: " + JSON.stringify(response) + "]");
};

exports.dSend = function (res, isOk, mod, route, status, error, response) {
  res.send(JSON.stringify({"status": status, "error": error, "response": response}));
  console.log("[" + isOk + "] - [" + mod + " - " + route + "] - [Status: " + status + "] - [Error: " + error + "] - [Response: " + JSON.stringify(response) + "]");
};
