const invalidRoute = function (app) {
  app.get("/api/*", (req, res, next) => {
    // console.log("invalid route");
    res.status(404).send({ code: 4004 });
    // next();
  });

  app.use((req, res, next) => {
    console.log("invalid route");
    res.status(404).send({ code: 4004 });
    // next();
  });
};

module.exports = invalidRoute;
