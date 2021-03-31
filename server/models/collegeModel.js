const pool = require("../utils/database");

const College = class College {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  static getCollegeById(id) {
    return pool.execute(`select * from college where id=${id};`);
  }
};

module.exports = College;
