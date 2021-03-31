const pool = require("../utils/database");

const Activity = class Activity {
  constructor(id, account, ip, time, status) {
    this.id = id;
    this.account = account;
    this.ip = ip;
    this.time = time;
    this.status = status;
  }

  static log(account, ip, status) {
    pool.execute(
      `insert into activity (account, ip, status) value ("${account}", "${ip}", "${status}");`
    );
  }

  static getTop5ActivitiesByAccount(account) {
    return pool.execute(
      `select * from activity where account=${account} order by time desc limit 5;`
    );
  }
};

module.exports = Activity;
