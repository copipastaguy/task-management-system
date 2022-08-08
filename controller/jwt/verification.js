const jwt = require("jsonwebtoken");
const errorHandler = require("../errorHandler");

const verification = function (app) {
  // app.post("/verification", async (req, res, next) => {
  //   const authHeader = req.headers["authorization"];
  //   const token = authHeader && authHeader.split(" ")[1];
  //   if (token == null) return next(errorHandler("Not authorized", req, res));
  //   jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
  //     if (error) return next(errorHandler("Not authorized", req, res));
  //     req.user = user;
  //     next();
  //   });
  // });
};
module.exports = verification;
