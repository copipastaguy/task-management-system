const jwt = require("jsonwebtoken");
const errorHandler = require("../errorHandler");

const verifyJWT = (token) => {
  return new Promise((resolve, reject) => {
    // const authHeader = req.headers["authorization"];
    // const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return resolve({ message: "Please login" });

    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
      if (error) return resolve({ message: "Not authenticated" });
      console.log(user);
    });
  });
};

module.exports = verifyJWT;
