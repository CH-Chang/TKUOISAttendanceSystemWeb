const JWT = require("jsonwebtoken");
const JWTConfig = require("../configs/JWTConfig");

exports.sign = (data, expiresIn) => {
  return JWT.sign(data, JWTConfig.key, { expiresIn: expiresIn });
};

exports.verify = (token) => {
  return JWT.verify(token, JWTConfig.key);
};
