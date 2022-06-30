const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin123",
  database: "nodelogin",
});

// CREATE DATABASE SCHEMA
// CREATE TABLE AND COLUMNS

// connection.query(
//   `CREATE DATABASE nodelogin

//   USE nodelogin

//   CREATE TABLE accounts (
//     id INT()
//     username VARCHAR(255),
//     password VARCHAR(255),
//     email VARCHAR(255),
//     user_group ENUM("Project Manager", "Project Lead", "Team Member"),
//     isAdmin TINYINT,
//     isEnabled TINYINT
//   )`
// );

module.exports = connection;
