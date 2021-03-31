const JWTHelper = require("../utils/JWTHelper");

module.exports = (req, res, next) => {
  if (!req.headers["user-authorization"])
    return res.status(401).json({ code: 1, msg: "未登入" });

  try {
    let user = JWTHelper.verify(req.headers["user-authorization"]);
    req.headers.user = user;
    next();
  } catch (err) {
    return res.status(500).json({
      code: 1,
      msg: "伺服器資料解密錯誤",
    });
  }
};
