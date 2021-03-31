const moment = require("moment");

const multiModel = require("../models/multiModel");
const shiftModel = require("../models/shiftModel");

exports.getCheckRecordForm = async (req, res, next) => {
  const { account, name, role } = req.headers.user;

  let staffNums = [];
  if (role === 3) {
    try {
      await multiModel.getStaffDetailByAccount(account).then(([rows]) => {
        rows.forEach((elem) => {
          staffNums.push({
            staffNum: elem.staffNum,
            name: elem.name,
          });
        });
      });
    } catch (err) {
      return res.status(500).json({ code: 1, msg: "查詢資料庫錯誤" });
    }
  } else {
    try {
      await multiModel.getAllStaffDetail().then(([rows]) => {
        rows.forEach((elem) => {
          staffNums.push({
            staffNum: elem.staffNum,
            name: elem.name,
          });
        });
      });
    } catch (err) {
      return res.status(500).json({ code: 1, msg: "查詢資料庫錯誤" });
    }
  }

  let shifts = [];
  try {
    await shiftModel.getAllShift().then(([rows]) => {
      rows.forEach((elem) => {
        shifts.push({
          id: elem.id,
          name: elem.name,
          start: moment(elem.start, "HH:mm:ss").format("HH:mm:ss"),
          end: moment(elem.end, "HH:mm:ss").format("HH:mm:ss"),
        });
      });
    });
  } catch (err) {
    return res.status(500).json({ code: 1, msg: "查詢資料庫錯誤" });
  }

  let status = [
    {
      id: 0,
      name: "未執行",
    },
    { id: 1, name: "執行中" },
    { id: 2, name: "未簽退" },
    { id: 3, name: "遲到早退" },
    { id: 4, name: "遲到" },
    { id: 5, name: "早退" },
    { id: 6, name: "曠班" },
    { id: 7, name: "準時" },
  ];

  return res.status(200).json({
    code: 0,
    msg: "成功",
    data: {
      staffNums: staffNums,
      shifts: shifts,
      status: status,
    },
  });
};
