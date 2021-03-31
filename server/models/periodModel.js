const pool = require("../utils/database");

const Period = class Period {
  constructor(id, name, start, end, priority) {
    this.id = id;
    this.name = name;
    this.start = start;
    this.end = end;
    this.priority = priority;
  }

  static getAllPeriod() {
    return pool.execute(`select * from period;`);
  }
};

module.exports = Period;
