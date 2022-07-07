const connection = require("../server/connection");

const accounts = function (app) {
  // GET ALL ACCOUNTS
  app.get("/accounts", (req, res) => {
    getGroup = `SELECT usergroup.id, usergroup.user_group, accounts.username FROM accounts, usergroup WHERE accounts.username = "admin"`;
    query = `SELECT accounts.username, accounts.email, accounts.isEnabled, usergroup.user_group FROM accounts, usergroup;`;
    connection.query(getGroup, (error, results) => {
      if (error) console.log(error);
      // console.log(result);

      results.forEach((result) => {
        console.log(result.user_group);
      });
    });
  });
};
module.exports = accounts;
