const nodeRSA = require("node-rsa");

const RSAHelper = require("../utils/RSAHelper");
const HMACSHA256Helper = require("../utils/HMACSHA256Helper");
const JWTHelper = require("../utils/JWTHelper");

const accountModel = require("../models/accountModel");
const activityModel = require("../models/activityModel");
const staffModel = require("../models/staffModel");
const departmentModel = require("../models/departmentModel");
const collegeModel = require("../models/collegeModel");

exports.login = async (req, res, next) => {
  //解碼前端內容
  let account, password;
  try {
    account = RSAHelper.RSADecrypt(req.body.account);
    password = RSAHelper.RSADecrypt(req.body.password);
  } catch (err) {
    return res.status(500).json({
      code: 1,
      msg: "伺服器解碼錯誤",
    });
  }

  //雜湊密碼
  let hashPassword;
  try {
    hashPassword = HMACSHA256Helper.HMACSHA256Hash(password);
  } catch (err) {
    return res.status(500).json({
      code: 1,
      msg: "伺服器加密查詢錯誤",
    });
  }

  //查詢資料庫
  let user;
  try {
    await accountModel.getAccountByAccount(account).then(([rows]) => {
      user = rows;
    });
  } catch (err) {
    return res.status(500).json({
      code: 1,
      msg: "資料庫查詢錯誤",
    });
  }

  //派發登入失敗結果
  if (user.length === 0 || user[0].password !== hashPassword) {
    if (user.length !== 0) {
      try {
        await activityModel
          .log(user[0].id, req.headers["x-forwarded-for"], "失敗")
          .then(([rows]) => {});
      } catch (err) {}
    }
    return res.status(200).json({
      code: 1,
      msg: "登入失敗，帳號或密碼錯誤",
    });
  }

  //JWT加密
  let token;
  try {
    token = JWTHelper.sign(
      { account: user[0].account, name: user[0].name, role: user[0].role },
      "1 day"
    );
  } catch (err) {
    return res.status(500).json({
      code: 1,
      msg: "伺服器加密派發錯誤",
    });
  }

  //紀錄
  try {
    await activityModel
      .log(user[0].id, req.headers["x-forwarded-for"], "成功")
      .then(([rows]) => {});
  } catch (err) {}

  //派發登入成功結果
  return res.status(200).json({
    code: 0,
    token: token,
    user: {
      account: user[0].account,
      name: user[0].name,
      role: user[0].role,
    },
  });
};

exports.logout = async (req, res, next) => {
  return res.status(200).json({
    code: 0,
    msg: "成功",
  });
};

exports.getUser = async (req, res, next) => {
  return res.status(200).json({
    code: 0,
    msg: "成功",
    user: {
      account: req.headers.user.account,
      name: req.headers.user.name,
      role: req.headers.user.role,
    },
  });
};

exports.getUserDetail = async (req, res, next) => {
  const { account, name, role } = req.headers.user;

  let accountId, sex, departmentId;
  try {
    await accountModel.getAccountByAccount(account).then(([rows]) => {
      accountId = rows[0].id;
      departmentId = rows[0].department;
      sex = rows[0].sex === 0 ? "女性" : "男性";
    });
  } catch (err) {
    return res.status(500).json({ code: -1, msg: "查詢資料庫錯誤" });
  }

  let staffNum;
  if (role === 3) {
    try {
      await staffModel.getStaffByAccount(accountId).then(([rows]) => {
        staffNum = rows[0].id;
      });
    } catch (err) {
      return res.status(500).json({ code: 1, msg: "查詢資料庫錯誤" });
    }
  }

  let department, collegeId;
  try {
    await departmentModel.getDepartmentById(departmentId).then(([rows]) => {
      collegeId = rows[0].college;
      department = rows[0].name;
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ code: 1, msg: "查詢資料庫錯誤" });
  }
  console.log("11");

  let college;
  try {
    await collegeModel.getCollegeById(collegeId).then(([rows]) => {
      college = rows[0].name;
    });
  } catch (err) {
    return res.status(500).json({ code: 1, msg: "查詢資料庫錯誤" });
  }

  return res.status(200).json({
    code: 0,
    data: {
      staffNum: staffNum,
      name: name,
      college: college,
      department: department,
      sex: sex,
      email: account,
    },
  });
};
