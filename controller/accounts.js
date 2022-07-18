const connection = require("../server/connection");

const accounts = function (app) {
  // GET ALL ACCOUNTS
  app.get("/accounts", (req, res) => {
    getInfo = `SELECT accounts.username, accounts.user_group, accounts.email, accounts.status, accounts.timestamp FROM accounts`;
    connection.query(getInfo, (error, userInfo) => {
      if (error) throw error;
      res.send(userInfo);
    });
  });
};
module.exports = accounts;
