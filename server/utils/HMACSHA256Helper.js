const crypto = require("crypto");
const HMACSHA256Config = require("../configs/HMACSHA256Config");

exports.HMACSHA256Hash = (str) => {
  const hmac = crypto.createHmac("sha256", HMACSHA256Config.key);
  return hmac.update(str).digest().toString("base64");
};
