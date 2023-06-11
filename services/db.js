const mysql = require("mysql2");
require("dotenv").config();

function startConnection() {
  console.error("CONNECTING");
  connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
  });
  connection.connect((err) => {
    if (err) {
      console.error("CONNECT FAILED", err.code);
      startConnection();
    } else console.log("CONNECTED");
  });
  connection.on("error", function (err) {
    if (err.fatal) startConnection();
  });
}

startConnection();

module.exports = { connection };
