const errorHandler = (err, req, res, next) => {
  console.log("error handler");
  console.log(`${error.message}`);
  const status = error.status || 400;
  res.status(status).send(error.message);
};

module.exports = errorHandler;
