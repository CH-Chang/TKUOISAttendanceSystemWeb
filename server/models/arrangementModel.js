const pool = require("../utils/database");

const Arrangement = class Arrangement {
  constructor(id, staff, week, period) {
    this.id = id;
    this.staff = staff;
    this.week = week;
    this.period = period;
  }

  static getArrangementByPeriodAndWeek(period, week) {
    return pool.execute(
      `select * from arrangement where period=${period} and week=${week};`
    );
  }

  static getArrangementByStaff(staff) {
    return pool.execute(`select * from arrangement where staff=${staff};`);
  }

  static getArrangementsByStaffs(staffs) {
    return pool.execute(
      `select * from arrangement where staff in (${staffs.toString()});`
    );
  }
};

module.exports = Arrangement;
