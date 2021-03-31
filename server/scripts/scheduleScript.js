const moment = require("moment");

const periodModel = require("../models/periodModel");
const coverModel = require("../models/coverModel");
const arrangementModel = require("../models/arrangementModel");
const scheduleModel = require("../models/scheduleModel");

const runScript = async () => {
  const now = moment(); /*.add(1, "days")*/

  // 取出所有期
  let periods;
  try {
    await periodModel.getAllPeriod().then(([rows]) => {
      periods = rows;
    });
  } catch (err) {
    console.log(err);
  }

  // 判斷現在是哪一期
  let period;
  periods.forEach((elem, index) => {
    if (index === 0) {
      period = elem;
      return true;
    }

    const start = moment(elem.start);
    const end = moment(elem.end);

    if (start <= now && end >= now && elem.priority > period.priority)
      period = elem;
  });

  // 取出對應一般排班表
  let arrangements;
  try {
    await arrangementModel
      .getArrangementByPeriodAndWeek(period.id, now.day() === 0 ? 7 : now.day())
      .then(([rows]) => {
        arrangements = rows;
      });
  } catch (err) {
    console.log(err);
  }

  // 取出代班表
  let covers;
  try {
    await coverModel.getCoverByDate(now.format("YYYY-MM-DD")).then(([rows]) => {
      covers = rows;
    });
  } catch (err) {
    console.log(err);
  }

  // 代班替換正班
  covers.forEach((cover) => {
    arrangements.forEach((arrangement) => {
      if (
        arrangement.staff === cover.requester &&
        arrangement.shift === cover.shift
      ) {
        arrangement.staff = cover.recipient;
        arrangement.cover = cover.id;
        return false;
      }
    });
  });

  // 插入資料表
  for (let i = 0; i < arrangements.length; i++) {
    await scheduleModel
      .schedule(
        arrangements[i].staff,
        now.format("YYYY-MM-DD"),
        arrangements[i].shift,
        arrangements[i].cover
      )
      .then(([rows]) => {});
  }

  process.exit();
};

runScript();
