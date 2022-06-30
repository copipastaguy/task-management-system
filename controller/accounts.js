const connection = require("../server/connection");

const accounts = function (app) {
  // GET ALL ACCOUNTS
  app.get("/accounts", (req, res) => {
    query = "SELECT user_group, username, email, isEnabled FROM accounts";
    connection.query(query, (error, result) => {
      if (error) console.log(error);
      // console.log(result);
      res.send(result);
    });
  });
};
module.exports = accounts;
