const errorHandler = (err, req, res, next) => {
  // log the error
  console.log(err);

  // send the response to front end
  res.send({ error: err });
};

module.exports = errorHandler;
