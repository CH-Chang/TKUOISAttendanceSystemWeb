const moment = require("moment");

const accountModel = require("../models/accountModel");
const activityModel = require("../models/activityModel");

exports.getTop5Activities = async (req, res, next) => {
  const { account, name, role } = req.headers.user;

  // 查詢帳號編號
  let accountId;
  try {
    await accountModel.getAccountByAccount(account).then(([rows]) => {
      accountId = rows[0].id;
    });
  } catch (err) {
    return res.status(500).json({ code: 1, msg: "查詢資料庫錯誤" });
  }

  // 查詢前五筆資料
  let activities;
  try {
    await activityModel.getTop5ActivitiesByAccount(accountId).then(([rows]) => {
      activities = rows;
    });
  } catch (err) {
    return res.status(500).json({ code: 1, msg: "查詢資料庫錯誤" });
  }

  // 整理資料
  let data = [];
  activities.forEach((activity) => {
    data.push({
      time: moment(activity.time).format("YYYY-MM-DD HH:mm:ss"),
      ip: activity.ip,
      status: activity.status,
    });
  });

  return res.status(200).json({
    code: 0,
    msg: "成功",
    data: data,
  });
};
