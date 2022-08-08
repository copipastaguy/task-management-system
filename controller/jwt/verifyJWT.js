const jwt = require("jsonwebtoken");
const errorHandler = require("../errorHandler");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return next(errorHandler("Not ", req, res));

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) return next(errorHandler("No access", req, res));
    console.log(user);
    next();
  });
};

module.exports = verifyJWT;
