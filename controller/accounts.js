const connection = require("../server/connection");

const accounts = function (app) {
  // GET ALL ACCOUNTS
  app.get("/accounts", (req, res) => {
    query = "SELECT username, email, roles, isEnabled FROM accounts";
    connection.query(query, (error, result) => {
      if (error) console.log(error);
      // console.log(result);
      res.send(result);
    });
  });
};
module.exports = accounts;
