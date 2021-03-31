const pool = require("../utils/database");

const Shift = class Shift {
  constructor(id, name, start, end, hour, payhour) {
    this.id = id;
    this.name = name;
    this.start = start;
    this.end = end;
    this.hour = hour;
    this.payhour = payhour;
  }

  static getAllShift() {
    return pool.execute(`select * from shift;`);
  }
};

module.exports = Shift;
