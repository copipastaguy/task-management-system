const connection = require("../server/connection");

const accounts = function (app) {
  // GET ALL ACCOUNTS
  app.get("/accounts", (req, res) => {
    getInfo = `SELECT DISTINCT accounts.id, accounts.username, accounts.user_group, accounts.email, accounts.isEnabled FROM accounts, usergroup`;
    connection.query(getInfo, (error, userInfo) => {
      if (error) throw error;
      res.send(userInfo);
    });
  });
};
module.exports = accounts;
