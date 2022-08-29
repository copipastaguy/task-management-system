const errorHandler = require("./errorHandler");

const invalidRoute = function (app) {
  app.use("*", (req, res, next) => {
    // console.log("invalid route");
    return next(errorHandler({ code: 4004 }, req, res));
  });
};

module.exports = invalidRoute;
