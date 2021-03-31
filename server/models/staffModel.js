const pool = require("../utils/database");

const Staff = class Staff {
  constructor(id, account) {
    this.id = id;
    this.account = account;
  }

  static getStaffByAccount(account) {
    return pool.execute(`select * from staff where account="${account}"`);
  }
};

module.exports = Staff;
