const jwt = require("jsonwebtoken");
const errorHandler = require("../errorHandler");

const verifyJWT = (token) => {
  return new Promise((resolve, reject) => {
    if (token == null) return resolve("Please Login");

    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
      if (error) return resolve(false);
      else return resolve(true);
    });
  });
};

module.exports = verifyJWT;
