const connection = require("../server/connection");

const accounts = function (app) {
  // GET ALL ACCOUNTS
  app.get("/accounts", (req, res) => {
    getInfo = `SELECT DISTINCT accounts.username, accounts.user_group, accounts.email, accounts.isActive, accounts.timestamp FROM accounts, usergroup`;
    connection.query(getInfo, (error, userInfo) => {
      if (error) throw error;
      res.send(userInfo);
    });
  });
};
module.exports = accounts;
