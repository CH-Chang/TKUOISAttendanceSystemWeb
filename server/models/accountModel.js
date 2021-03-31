const pool = require("../utils/database");

const Account = class Account {
  constructor(id, account, password, name, sex, role) {
    this.id = id;
    this.account = account;
    this.password = password;
    this.name = name;
    this.sex = sex;
    this.role = role;
  }

  static login(account, password) {
    return pool.execute(
      `select * from account where account='${account}' and password='${password}';`
    );
  }

  static getAccountByAccount(account) {
    return pool.execute(`select * from account where account="${account}";`);
  }
};

module.exports = Account;
