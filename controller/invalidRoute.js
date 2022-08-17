const invalidRoute = function (app) {
  app.get("/api/*", (req, res, next) => {
    res.status(404).send({ code: 4004 });
    // console.log("invalid url");
    next();
  });

  app.post("/api/*", (req, res, next) => {
    res.status(404).send({ code: 4004 });
    // console.log("invalid url");
    next();
  });
};

module.exports = invalidRoute;
