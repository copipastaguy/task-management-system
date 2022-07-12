const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin123",
  database: "nodelogin",
});

// CREATE DATABASE SCHEMA
// CREATE TABLE AND COLUMNS
// const createSchema = `CREATE DATABASE nodelogin

// USE nodelogin

// CREATE TABLE accounts (
//   username VARCHAR(255) NOT NULL,
//   password VARCHAR(255) NOT NULL,
//   email VARCHAR(255),
//   roles VARCHAR(255),
//   admin_privilege ENUM("False", "True"),
//   isEnabled ENUM("True", "False") NOT NULL
// )`;

// USER GROUP TABLE
// CREATE TABLE usergroup (
// 	id INT NOT NULL AUTO_INCREMENT,
// 	user_group VARCHAR(255) NOT NULL,
//     username VARCHAR(255) NOT NULL,
//     task VARCHAR(255) NOT NULL,
//     task_description TEXT,
//     last_updated DATETIME,
//     PRIMARY KEY (id)
// )

// USER GROUPS
// CREATE TABLE groups (
// 	id INT NOT NULL AUTO_INCREMENT,
// 	user_group VARCHAR(255) NOT NULL,
//     date_created DATETIME,
//     PRIMARY KEY (id)
// )

// connection.query(createSchema);

module.exports = connection;
