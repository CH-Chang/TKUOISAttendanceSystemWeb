const moment = require("moment");

const staffModel = require("../models/staffModel");
const shiftModel = require("../models/shiftModel");
const accountModel = require("../models/accountModel");
const scheduleModel = require("../models/scheduleModel");
const multiModel = require("../models/multiModel");
const periodModel = require("../models/periodModel");
const arrangementModel = require("../models/arrangementModel");

const RSAHelper = require("../utils/RSAHelper");

exports.getTop5Attendance = async (req, res, next) => {
  const { account, name, role } = req.headers.user;

  // 確認查詢身分別正確
  if (role !== 3) {
    return res
      .status(200)
      .json({ code: 1, msg: "帳號身分別無打卡資料可供查詢" });
  }

  // 查詢帳號編號及工讀生編號
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

  // 查詢每日各班規則
  let shifts;
  try {
    await shiftModel.getAllShift().then(([rows]) => {
      shifts = rows;
    });
  } catch (err) {
    return res.status(500).json({
      code: 1,
      msg: "資料庫查詢錯誤",
    });
  }

  // 查詢五筆打卡狀況
  let schedules;
  try {
    await scheduleModel.getTop5ScheduleByStaff(staffNum).then(([rows]) => {
      schedules = rows;
    });
  } catch (err) {
    return res.status(500).json({
      code: 1,
      msg: "資料庫查詢錯誤",
    });
  }

  // 產生結果陣列
  const weekdayTrans = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];
  let results = [];
  schedules.forEach((elem) => {
    results.push({
      date: moment(elem.date).format("YYYY-MM-DD"),
      weekday: weekdayTrans[moment(elem.date).day()],
      shift: elem.shift,
      status: "",
      checkin:
        elem.checkin === null
          ? undefined
          : moment(elem.checkin).format("YYYY-MM-DD HH:mm:ss"),
      checkout:
        elem.checkout === null
          ? undefined
          : moment(elem.checkout).format("YYYY-MM-DD HH:mm:ss"),
    });
  });

  // 判斷狀況
  const now = moment();
  results.forEach((result) => {
    let shouldContinue = false;

    // 判斷還沒執行的班
    shifts.forEach((shift) => {
      if (shift.id === result.shift) {
        const shiftStartTime = moment(
          `${result.date} ${shift.start}`,
          "YYYY-MM-DD HH:mm:ss"
        );

        if (now < shiftStartTime) {
          result.status = "未執行";
          shouldContinue = true;
        }

        return false;
      }
    });
    if (shouldContinue) return true;

    // 判斷曠班或未簽退
    if (
      typeof result.checkin === "undefined" &&
      typeof result.checkout === "undefined"
    ) {
      result.status = "曠班";
      shouldContinue = true;
    } else if (typeof result.checkout === "undefined") {
      result.status = "未簽退";
      shouldContinue = true;
    }
    if (shouldContinue) return true;

    //判斷遲到、早退、遲到早退、準時
    shifts.forEach((shift) => {
      if (result.shift === shift.id) {
        const shouldCheckIn = moment(
          `${result.date} ${shift.start}`,
          "YYYY-MM-DD HH:mm:ss"
        );
        const shouldCheckOut =
          shift.id === 5
            ? moment(`${result.date} ${shift.end}`, "YYYY-MM-DD HH:mm:ss").add(
                1,
                "days"
              )
            : moment(`${result.date} ${shift.end}`, "YYYY-MM-DD HH:mm:ss");
        const checkIn = moment(`${result.checkin}`, "YYYY-MM-DD HH:mm:ss");
        const checkOut = moment(`${result.checkout}`, "YYYY-MM-DD HH:mm:ss");

        if (checkIn > shouldCheckIn && checkOut < shouldCheckOut)
          result.status = "遲到早退";
        else if (checkIn > shouldCheckIn) result.status = "遲到";
        else if (checkOut < shouldCheckOut) result.status = "早退";
        else result.status = "準時";

        return false;
      }
    });
  });

  // 校正班別名稱
  results.forEach((result) => {
    shifts.forEach((shift) => {
      if (result.shift === shift.id) {
        result.shift = shift.name;
        return false;
      }
    });
  });

  return res.status(200).json({ code: 0, msg: "成功", data: results });
};

exports.getConditionalAttendance = async (req, res, next) => {
  const { account, name, role } = req.headers.user;

  // 解碼前端內容
  let requiredStaffNums;
  let requiredTimes;
  let requiredShifts;
  let requiredStatus;
  try {
    requiredStaffNums = RSAHelper.RSADecrypt(req.body.staffNums).split(",");
    requiredTimes = RSAHelper.RSADecrypt(req.body.times).split(",");
    requiredShifts = RSAHelper.RSADecrypt(req.body.shifts).split(",");
    requiredStatus = RSAHelper.RSADecrypt(req.body.status).split(",");
  } catch (err) {
    return res.status(500).json({
      code: 1,
      msg: "資料解碼錯誤",
    });
  }

  // 翻譯前端資料
  for (let i = 0; i < requiredStatus.length; i++) {
    if (requiredStatus[i] === "0") requiredStatus[i] = "未執行";
    else if (requiredStatus[i] === "1") requiredStatus[i] = "執行中";
    else if (requiredStatus[i] === "2") requiredStatus[i] = "未簽退";
    else if (requiredStatus[i] === "3") requiredStatus[i] = "遲到早退";
    else if (requiredStatus[i] === "4") requiredStatus[i] = "遲到";
    else if (requiredStatus[i] === "5") requiredStatus[i] = "早退";
    else if (requiredStatus[i] === "6") requiredStatus[i] = "曠班";
    else requiredStatus[i] = "準時";
  }

  // 查資料
  const weekTrans = {
    0: "星期日",
    1: "星期一",
    2: "星期二",
    3: "星期三",
    4: "星期四",
    5: "星期五",
    6: "星期六",
  };
  let attendances;
  try {
    await multiModel
      .getScheduleDetailByIntervalsAndStaffsAndShifts(
        requiredTimes,
        requiredStaffNums,
        requiredShifts
      )
      .then(([rows]) => {
        attendances = rows;
      });
  } catch (err) {
    return res.status(500).json({
      code: 1,
      msg: "資料解碼錯誤",
    });
  }

  let result = [];
  const now = moment();
  attendances.forEach((elem) => {
    const date = moment(elem.date);
    const shouldCheckin = moment(
      `${date.format("YYYY-MM-DD")} ${elem.shouldCheckin}`,
      "YYYY-MM-DD HH:mm:ss"
    );
    const shouldCheckout =
      elem.shiftId === 5
        ? moment(
            `${date.format("YYYY-MM-DD")} ${elem.shouldCheckout}`,
            "YYYY-MM-DD HH:mm:ss"
          ).add(1, "days")
        : moment(
            `${date.format("YYYY-MM-DD")} ${elem.shouldCheckout}`,
            "YYYY-MM-DD HH:mm:ss"
          );
    const checkin =
      elem.checkin === null
        ? undefined
        : moment(elem.checkin, "YYYY-MM-DD HH:mm:ss");
    const checkout =
      elem.checkout === null
        ? undefined
        : moment(elem.checkout, "YYYY-MM-DD HH:mm:ss");

    // 確認狀態
    let status;
    if (date.isSame(now, "day") && shouldCheckin > now) {
      status = "未執行";
    } else if (
      date.isSame(now, "day") &&
      typeof checkin !== "undefined" &&
      now >= shouldCheckin &&
      now <= shouldCheckout
    ) {
      status = "執行中";
    } else if (
      typeof checkin === "undefined" &&
      typeof checkout === "undefined"
    ) {
      status = "曠班";
    } else if (typeof checkout === "undefined") {
      status = "未簽退";
    } else if (checkin > shouldCheckin && checkout < shouldCheckout) {
      status = "遲到早退";
    } else if (checkin > shouldCheckin) {
      status = "遲到";
    } else if (checkout < shouldCheckout) {
      status = "早退";
    } else {
      status = "準時";
    }

    if (requiredStatus.includes(status)) {
      result.push({
        id: elem.id,
        date: date.format("YYYY-MM-DD"),
        week: weekTrans[date.day()],
        shift: {
          id: elem.shiftId,
          name: elem.shiftName,
        },
        staff: {
          staffNum: elem.staffNum,
          name: elem.staffName,
        },
        checkin:
          typeof checkin === "undefined"
            ? undefined
            : checkin.format("YYYY-MM-DD HH:mm:ss"),
        checkout:
          typeof checkout === "undefined"
            ? undefined
            : checkout.format("YYYY-MM-DD HH:mm:ss"),
        status: status,
        coverPostId: elem.postId === null ? undefined : elem.postId,
      });
    }
  });

  res.json({
    code: 0,
    msg: "成功",
    data: result,
  });
};

exports.exportConditionalAttendance = async (req, res, next) => {
  const { account, name, role } = req.headers.user;

  // 解碼前端內容
  let requiredStaffNums;
  let requiredTimes;
  let requiredShifts;
  let requiredStatus;
  try {
    requiredStaffNums = RSAHelper.RSADecrypt(req.body.staffNums).split(",");
    requiredTimes = RSAHelper.RSADecrypt(req.body.times).split(",");
    requiredShifts = RSAHelper.RSADecrypt(req.body.shifts).split(",");
    requiredStatus = RSAHelper.RSADecrypt(req.body.status).split(",");
  } catch (err) {
    return res.status(500).json({
      code: 1,
      msg: "資料解碼錯誤",
    });
  }

  // 翻譯前端資料
  for (let i = 0; i < requiredStatus.length; i++) {
    if (requiredStatus[i] === "0") requiredStatus[i] = "未執行";
    else if (requiredStatus[i] === "1") requiredStatus[i] = "執行中";
    else if (requiredStatus[i] === "2") requiredStatus[i] = "未簽退";
    else if (requiredStatus[i] === "3") requiredStatus[i] = "遲到早退";
    else if (requiredStatus[i] === "4") requiredStatus[i] = "遲到";
    else if (requiredStatus[i] === "5") requiredStatus[i] = "早退";
    else if (requiredStatus[i] === "6") requiredStatus[i] = "曠班";
    else requiredStatus[i] = "準時";
  }

  let schedules;
  try {
    await multiModel
      .getScheduleCoverDetailByIntervalsAndStaffsAndShifts(
        requiredTimes,
        requiredStaffNums,
        requiredShifts
      )
      .then(([rows]) => {
        schedules = rows;
      });
  } catch (err) {
    return res.status(500).json({
      code: 1,
      msg: "資料庫查詢錯誤",
    });
  }

  const now = moment();
  let statistics = [];
  let covers = [];
  let attendances = [];

  // 取得要求工讀生detail
  try {
    await multiModel
      .getStaffsDetailByStaff(requiredStaffNums)
      .then(([rows]) => {
        rows.forEach((elem) => {
          statistics.push({
            staff: {
              staffNum: elem.staffNum,
              staffName: elem.name,
            },
            required: 0,
            executed: 0,
            onTime: 0,
            late: 0,
            leaveEarly: 0,
            lateAndLeaveEarly: 0,
            absent: 0,
            noCheckout: 0,
            executing: 0,
            unexecuted: 0,
            payhour: 158,
            salary: 0,
          });
        });
      });
  } catch (err) {
    return res.status(500).json({
      code: 1,
      msg: "資料庫查詢錯誤",
    });
  }

  // 計算要做
  let periods;
  try {
    await periodModel.getAllPeriod().then(([rows]) => {
      periods = rows;
    });
  } catch (err) {
    return res.status(500).json({
      code: 1,
      msg: "資料庫查詢錯誤",
    });
  }
  let shifts;
  try {
    await shiftModel.getAllShift().then(([rows]) => {
      shifts = rows;
    });
  } catch (err) {
    return res.status(500).json({ code: 1, msg: "資料庫查詢錯誤" });
  }
  let arrangements;
  try {
    await arrangementModel
      .getArrangementsByStaffs(requiredStaffNums)
      .then(([rows]) => {
        arrangements = rows;
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      code: 1,
      msg: "資料庫查詢錯誤",
    });
  }
  let start = moment(requiredTimes[0], "YYYY-MM-DD");
  let end = moment(requiredTimes[1], "YYYY-MM-DD");
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

    arrangements.forEach((elem) => {
      if (elem.period === period.id && elem.week === week) {
        statistics.forEach((elem2) => {
          if (elem.staff === elem2.staff.staffNum) {
            shifts.forEach((elem3) => {
              if (elem.shift === elem3.id) {
                elem2.required += parseFloat(elem3.payhour);
                return false;
              }
            });
          }
          return false;
        });
      }
    });

    start.add(1, "days");
  }

  // 計算有做
  schedules.forEach((elem) => {
    const date = moment(elem.date);
    const shouldCheckin = moment(
      `${date.format("YYYY-MM-DD")} ${elem.shouldCheckin}`,
      "YYYY-MM-DD HH:mm:ss"
    );
    const shouldCheckout =
      elem.shiftId === 5
        ? moment(
            `${date.format("YYYY-MM-DD")} ${elem.shouldCheckout}`,
            "YYYY-MM-DD HH:mm:ss"
          ).add(1, "days")
        : moment(
            `${date.format("YYYY-MM-DD")} ${elem.shouldCheckout}`,
            "YYYY-MM-DD HH:mm:ss"
          );
    const checkin =
      elem.checkin === null
        ? undefined
        : moment(elem.checkin, "YYYY-MM-DD HH:mm:ss");
    const checkout =
      elem.checkout === null
        ? undefined
        : moment(elem.checkout, "YYYY-MM-DD HH:mm:ss");

    // 確認狀態
    let status;
    if (date.isSame(now, "day") && shouldCheckin > now) {
      status = "未執行";
    } else if (
      date.isSame(now, "day") &&
      typeof checkin !== "undefined" &&
      now >= shouldCheckin &&
      now <= shouldCheckout
    ) {
      status = "執行中";
    } else if (
      typeof checkin === "undefined" &&
      typeof checkout === "undefined"
    ) {
      status = "曠班";
    } else if (typeof checkout === "undefined") {
      status = "未簽退";
    } else if (checkin > shouldCheckin && checkout < shouldCheckout) {
      status = "遲到早退";
    } else if (checkin > shouldCheckin) {
      status = "遲到";
    } else if (checkout < shouldCheckout) {
      status = "早退";
    } else {
      status = "準時";
    }

    if (requiredStatus.includes(status)) {
      statistics.forEach((elem2) => {
        if (elem.coverId === null) {
          if (elem2.staff.staffNum === elem.staffNum) {
            if (status === "未執行")
              elem2.unexecuted += parseFloat(elem.payhour);
            else if (status === "執行中")
              elem2.executing += parseFloat(elem.payhour);
            else if (status === "曠班")
              elem2.absent += parseFloat(elem.payhour);
            else if (status === "未簽退")
              elem2.noCheckout += parseFloat(elem.payhour);
            else if (status === "遲到早退")
              elem2.lateAndLeaveEarly += parseFloat(elem.payhour);
            else if (status === "遲到") elem2.late += parseFloat(elem.payhour);
            else if (status === "早退")
              elem2.leaveEarly += parseFloat(elem.payhour);
            else if (status === "準時") {
              elem2.onTime += parseFloat(elem.payhour);
              elem2.executed += parseFloat(elem.payhour);
            }

            return false;
          }
        } else {
          if (elem2.staff.staffNum === elem.requesterId) {
            if (status === "未執行")
              elem2.unexecuted += parseFloat(elem.payhour);
            else if (status === "執行中")
              elem2.executing += parseFloat(elem.payhour);
            else if (status === "曠班")
              elem2.absent += parseFloat(elem.payhour);
            else if (status === "未簽退")
              elem2.noCheckout += parseFloat(elem.payhour);
            else if (status === "遲到早退")
              elem2.lateAndLeaveEarly += parseFloat(elem.payhour);
            else if (status === "遲到") elem2.late += parseFloat(elem.payhour);
            else if (status === "早退")
              elem2.leaveEarly += parseFloat(elem.payhour);
            else if (status === "準時") {
              elem2.onTime += parseFloat(elem.payhour);
              elem2.executed += parseFloat(elem.payhour);
            }

            return false;
          }
        }
      });

      // 處理attendances
      attendances.push({
        date: date.format("YYYY-MM-DD"),
        shift: elem.shiftName,
        staff: {
          staffNum: elem.staffNum,
          staffName: elem.staffName,
        },
        checkin:
          typeof checkin === "undefined"
            ? undefined
            : checkin.format("YYYY-MM-DD HH:mm:ss"),
        checkinNote:
          status === "遲到" || status === "遲到早退"
            ? `遲到${checkin.diff(shouldCheckin, "m")}分鐘`
            : undefined,
        checkout:
          typeof checkout === "undefined"
            ? undefined
            : checkout.format("YYYY-MM-DD HH:mm:ss"),
        checkoutNote:
          status === "遲到早退" || status === "早退"
            ? `早退${checkout.diff(shouldCheckout, "m")}分鐘`
            : undefined,
        status: status,
      });

      // 處理cover
      if (elem.coverId !== null) {
        covers.push({
          date: date.format("YYYY-MM-DD"),
          shift: elem.shiftName,
          requester: {
            requesterId: elem.requesterId,
            requesterName: elem.requesterName,
          },
          recipient: {
            recipientId: elem.recipientId,
            recipientName: elem.recipientName,
          },
          approver: {
            approverId: elem.approverId,
            approverName: elem.approverName,
          },
        });
      }
    }
  });

  //薪資計算
  statistics.forEach((elem) => {
    elem.salary = elem.executed * elem.payhour;
  });

  return res.status(200).json({
    code: 0,
    msg: "成功",
    data: {
      statistics: statistics,
      attendances: attendances,
      covers: covers,
    },
  });
};
