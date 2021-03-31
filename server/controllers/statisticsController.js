const moment = require("moment");

const accountModel = require("../models/accountModel");
const staffModel = require("../models/staffModel");
const periodModel = require("../models/periodModel");
const shiftModel = require("../models/shiftModel");
const arrangementModel = require("../models/arrangementModel");
const scheduleModel = require("../models/scheduleModel");
const coverModel = require("../models/coverModel");
const multiModel = require("../models/multiModel");

exports.getMonthGeneralTimes = async (req, res, next) => {
  const { account, name, role } = req.headers.user;

  // 確認帳戶可以查詢
  if (role !== 3) {
    return res.status(200).json({ code: 1, msg: "該帳戶無上班時數可供查詢" });
  }

  // 取得帳號編號
  let accountId, staffNum;
  try {
    await multiModel.getStaffDetailByAccount(account).then(([rows]) => {
      accountId = rows[0].accountId;
      staffNum = rows[0].staffNum;
    });
  } catch (err) {
    return res.status(500).json({
      code: 1,
      msg: "資料庫查詢錯誤",
    });
  }

  // 取得各期
  let periods;
  try {
    await periodModel.getAllPeriod().then(([rows]) => {
      periods = rows;
    });
  } catch (err) {
    return res.status(500).json({ code: 1, msg: "資料庫查詢錯誤" });
  }

  // 取得各班
  let shifts;
  try {
    await shiftModel.getAllShift().then(([rows]) => {
      shifts = rows;
    });
  } catch (err) {
    return res.status(500).json({ code: 1, msg: "資料庫查詢錯誤" });
  }

  // 取得排班
  let arrangements;
  try {
    await arrangementModel.getArrangementByStaff(staffNum).then(([rows]) => {
      arrangements = rows;
    });
  } catch (err) {
    return res.status(500).json({ code: 1, msg: "資料庫查詢錯誤" });
  }

  // 算本月必須
  const now = moment();
  let start = now.clone().startOf("month");
  let end = now.clone().endOf("month");
  let required = 0;
  while (start < end) {
    let period;
    periods.forEach((elem, index) => {
      if (index === 0) {
        period = elem;
        return true;
      }
      let periodStart = moment(elem.start);
      let periodEnd = moment(elem.end);
      if (
        start >= periodStart &&
        start <= periodEnd &&
        period.priority < elem.priority
      ) {
        period = elem;
        return false;
      }
    });

    let week = start.day() === 0 ? 7 : start.day();

    arrangements.forEach((elem, index) => {
      if (elem.period === period.id && week === elem.week) {
        shifts.forEach((shift) => {
          if (shift.id === elem.shift) {
            required += parseFloat(shift.payhour);
            return false;
          }
        });
        return true;
      }
    });

    start.add(1, "days");
  }

  // 算已做
  let executed = 0;
  let schedules;
  start = now.clone().startOf("month");
  try {
    await scheduleModel
      .getScheduleByIntervalAndStaff(
        start.format("YYYY-MM-DD"),
        end.format("YYYY-MM-DD"),
        staffNum
      )
      .then(([rows]) => {
        schedules = rows;
      });
  } catch (err) {
    return res.status(500).json({ code: 1, msg: "資料庫查詢錯誤" });
  }

  schedules.forEach((elem) => {
    if (
      elem.checkin === null ||
      elem.checkout === null ||
      elem.cover !== null
    ) {
      return true;
    }

    shifts.forEach((shift) => {
      if (shift.id === elem.shift) {
        //判斷早退、遲到、準時
        const checkin = moment(elem.checkin);
        const checkout = moment(elem.checkout);
        const shouldCheckin = moment(
          `${moment(elem.date).format("YYYY-MM-DD")} ${shift.start}`,
          "YYYY-MM-DD HH:mm:ss"
        );
        const shouldCheckout =
          elem.shift === 5
            ? moment(
                `${moment(elem.date).format("YYYY-MM-DD")} ${shift.end}`,
                "YYYY-MM-DD HH:mm:ss"
              ).add(1, "days")
            : moment(
                `${moment(elem.date).format("YYYY-MM-DD")} ${shift.end}`,
                "YYYY-MM-DD HH:mm:ss"
              );

        if (checkin < shouldCheckin && checkout > shouldCheckout)
          executed += parseFloat(shift.payhour);

        return false;
      }
    });
  });

  res.status(200).json({
    code: 0,
    msg: "成功",
    data: {
      required: required,
      executed: executed,
    },
  });
};

exports.getMonthCoverTimes = async (req, res, next) => {
  const { account, name, role } = req.headers.user;

  // 確認帳戶可以查詢
  if (role !== 3) {
    return res.status(200).json({ code: 1, msg: "該帳戶無上班時數可供查詢" });
  }

  // 取得帳號編號
  let accountId;
  try {
    await accountModel.getAccountByAccount(account).then(([rows]) => {
      accountId = rows[0].id;
    });
  } catch (err) {
    return res.status(500).json({ code: 1, msg: "資料庫查詢錯誤" });
  }

  // 取得工讀生編號
  let staffNum;
  try {
    await staffModel.getStaffByAccount(accountId).then(([rows]) => {
      staffNum = rows[0].id;
    });
  } catch (err) {
    return res.status(500).json({ code: 1, msg: "資料庫查詢錯誤" });
  }

  // 取得各班
  let shifts;
  try {
    await shiftModel.getAllShift().then(([rows]) => {
      shifts = rows;
    });
  } catch (err) {
    return res.status(500).json({ code: 1, msg: "資料庫查詢錯誤" });
  }

  // 查詢已同意的代班
  let required = 0;

  const now = moment();
  const start = now.clone().startOf("month");
  const end = now.clone().endOf("month");
  let covers;
  try {
    await coverModel
      .getCoverByIntervalAndRecipient(
        start.format("YYYY-MM-DD"),
        end.format("YYYY-MM-DD"),
        staffNum
      )
      .then(([rows]) => {
        covers = rows;
      });
  } catch (err) {
    return res.status(500).json({ code: 1, msg: "資料庫查詢錯誤" });
  }

  // 計算代班總時數
  covers.forEach((elem) => {
    shifts.forEach((shift) => {
      if (elem.shift === shift.id) {
        required += parseFloat(shift.payhour);
        return false;
      }
    });
  });

  // 查詢本月排班表
  let executed = 0;
  let schedules;
  try {
    await scheduleModel
      .getScheduleByIntervalAndStaff(
        start.format("YYYY-MM-DD"),
        end.format("YYYY-MM-DD"),
        staffNum
      )
      .then(([rows]) => {
        schedules = rows;
      });
  } catch (err) {
    return res.status(500).json({ code: 1, msg: "資料庫查詢錯誤" });
  }

  schedules.forEach((elem) => {
    if (
      elem.checkin === null ||
      elem.checkout === null ||
      elem.cover === null
    ) {
      return true;
    }

    shifts.forEach((shift) => {
      if (shift.id === elem.shift) {
        //判斷早退、遲到、準時
        const checkin = moment(elem.checkin);
        const checkout = moment(elem.checkout);
        const shouldCheckin = moment(
          `${moment(elem.date).format("YYYY-MM-DD")} ${shift.start}`,
          "YYYY-MM-DD HH:mm:ss"
        );
        const shouldCheckout =
          elem.shift === 5
            ? moment(
                `${moment(elem.date).format("YYYY-MM-DD")} ${shift.end}`,
                "YYYY-MM-DD HH:mm:ss"
              ).add(1, "days")
            : moment(
                `${moment(elem.date).format("YYYY-MM-DD")} ${shift.end}`,
                "YYYY-MM-DD HH:mm:ss"
              );

        if (checkin < shouldCheckin && checkout > shouldCheckout)
          executed += parseFloat(shift.payhour);

        return false;
      }
    });
  });

  return res.status(200).json({
    code: 0,
    msg: "成功",
    data: {
      required: required,
      executed: executed,
    },
  });
};

exports.getMonthAccumMoney = async (req, res, next) => {
  const { account, name, role } = req.headers.user;

  // 確認帳戶可以查詢
  if (role !== 3) {
    return res.status(200).json({ code: 1, msg: "該帳戶無上班時數可供查詢" });
  }

  // 取得帳號編號
  let accountId;
  try {
    await accountModel.getAccountByAccount(account).then(([rows]) => {
      accountId = rows[0].id;
    });
  } catch (err) {
    return res.status(500).json({ code: 1, msg: "資料庫查詢錯誤" });
  }

  // 取得工讀生編號
  let staffNum;
  try {
    await staffModel.getStaffByAccount(accountId).then(([rows]) => {
      staffNum = rows[0].id;
    });
  } catch (err) {
    return res.status(500).json({ code: 1, msg: "資料庫查詢錯誤" });
  }

  // 取得各班
  let shifts;
  try {
    await shiftModel.getAllShift().then(([rows]) => {
      shifts = rows;
    });
  } catch (err) {
    return res.status(500).json({ code: 1, msg: "資料庫查詢錯誤" });
  }

  const now = moment();
  const start = now.clone().startOf("month");
  const end = now.clone().endOf("month");

  let schedules;
  try {
    await scheduleModel
      .getScheduleByIntervalAndStaff(
        start.format("YYYY-MM-DD"),
        end.format("YYYY-MM-DD"),
        staffNum
      )
      .then(([rows]) => {
        schedules = rows;
      });
  } catch (err) {
    return res.status(500).json({ code: 1, msg: "資料庫查詢錯誤" });
  }

  let money = 0;
  schedules.forEach((elem) => {
    if (elem.checkin === null || elem.checkout === null) {
      return true;
    }

    shifts.forEach((shift) => {
      if (shift.id === elem.shift) {
        //判斷早退、遲到、準時
        const checkin = moment(elem.checkin);
        const checkout = moment(elem.checkout);
        const shouldCheckin = moment(
          `${moment(elem.date).format("YYYY-MM-DD")} ${shift.start}`,
          "YYYY-MM-DD HH:mm:ss"
        );
        const shouldCheckout =
          elem.shift === 5
            ? moment(
                `${moment(elem.date).format("YYYY-MM-DD")} ${shift.end}`,
                "YYYY-MM-DD HH:mm:ss"
              ).add(1, "days")
            : moment(
                `${moment(elem.date).format("YYYY-MM-DD")} ${shift.end}`,
                "YYYY-MM-DD HH:mm:ss"
              );

        if (checkin < shouldCheckin && checkout > shouldCheckout)
          money += parseFloat(shift.payhour) * 158.0;

        return false;
      }
    });
  });

  return res.status(200).json({
    code: 0,
    msg: "成功",
    data: {
      money: money,
    },
  });
};
