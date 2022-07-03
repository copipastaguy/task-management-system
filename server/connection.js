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
//   id INT,
//   username VARCHAR(255) NOT NULL,
//   password VARCHAR(255) NOT NULL,
//   email VARCHAR(255),
//   roles ENUM("Admin", "Project Manager", "Project Lead", "Team Member"),
//   admin_privilege TINYINT,
//   isEnabled ENUM("True", "False") NOT NULL
// )`;

// const dummyData = `INSERT INTO accounts `;

// connection.query(createSchema);

module.exports = connection;
