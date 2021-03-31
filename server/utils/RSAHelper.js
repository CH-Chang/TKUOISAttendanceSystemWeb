const NodeRSA = require("node-rsa");

const RSAConfig = require("../configs/RSAConfig");

exports.RSAEncrypt = (str) => {
  let nodeRSA = new NodeRSA(RSAConfig.publicKey, "public");
  nodeRSA.setOptions({ encryptionScheme: "pkcs1" });
  return nodeRSA.encrypt(str, "base64");
};

exports.RSADecrypt = (str) => {
  let nodeRSA = new NodeRSA(RSAConfig.privateKey, "private");
  nodeRSA.setOptions({ encryptionScheme: "pkcs1" });
  return nodeRSA.decrypt(str, "utf8");
};
