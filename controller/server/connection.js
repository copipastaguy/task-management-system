const mysql = require("mysql");
require("dotenv").config();

const connection = mysql.createConnection({
  multipleStatements: true,
  host: process.env.SERVER_HOST,
  user: process.env.SERVER_USER,
  password: process.env.SERVER_PASSWORD,
  database: process.env.SERVER_DATABASE,
  port: 3306,
});

module.exports = connection;
