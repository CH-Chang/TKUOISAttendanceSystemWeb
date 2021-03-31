const pool = require("../utils/database");

const Cover = class Cover {
  constructor(id, approver, requester, recipient, date, shift, post) {
    this.id = id;
    this.approver = approver;
    this.requester = requester;
    this.recipient = recipient;
    this.date = date;
    this.shift = shift;
    this.post = post;
  }

  static getCoverByDate(date) {
    return pool.execute(
      `select * from cover where date="${date}" order by shift asc;`
    );
  }

  static getCoverByIntervalAndRecipient(start, end, recipient) {
    return pool.execute(
      `select * from cover where recipient=${recipient} and date>="${start}" and date<="${end}" order by date asc;`
    );
  }
};

module.exports = Cover;
