const pool = require("../utils/database");

const Department = class Department {
  constructor(id, name, college, bachelor, master, doctor) {
    this.id = id;
    this.name = name;
    this.college = college;
    this.bachelor = bachelor;
    this.master = master;
    this.doctor = doctor;
  }

  static getDepartmentById(id) {
    return pool.execute(`select * from department where id=${id};`);
  }
};

module.exports = Department;
