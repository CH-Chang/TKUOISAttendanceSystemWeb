const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  database: "tkuinfocenter",
  user: "root",
  password: "0000",
});

module.exports = pool.promise();
