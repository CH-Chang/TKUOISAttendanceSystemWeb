const pool = require("../utils/database");

const Schedule = class Schedule {
  constructor(id, staff, date, shift, checkin, checkout, cover) {
    this.id = id;
    this.staff = staff;
    this.shift = shift;
    this.date = date;
    this.checkin = checkin;
    this.checkout = checkout;
    this.cover = cover;
  }

  static getTop5ScheduleByStaff(staff) {
    return pool.execute(
      `SELECT * FROM schedule where staff=${staff} order by date desc, shift asc;`
    );
  }

  static schedule(staff, date, shift, cover) {
    return pool.execute(
      `insert into schedule (staff, date, shift, cover) value (${staff}, "${date}", ${shift}, ${
        typeof cover === "null" ? "null" : cover
      });`
    );
  }

  static getScheduleByIntervalAndStaff(start, end, staff) {
    return pool.execute(
      `select * from schedule where staff=${staff} and date>="${start}" and date<="${end}" order by date asc;`
    );
  }

  static getScheduleByIntervalsAndStaffsAndShifts(times, staffs, shifts) {
    return pool.execute(`
      select * from schedule where date>="${times[0]}" and date<="${
      times[1]
    }" and staff in (${staffs.toString()}) and shift in (${shifts.toString()}) order by date desc, shift asc;
    `);
  }
};

module.exports = Schedule;
