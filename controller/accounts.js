const connection = require("../server/connection");

const accounts = function (app) {
  // GET ALL ACCOUNTS
  app.get("/accounts", (req, res) => {
    getGroup = `SELECT usergroup.id, usergroup.user_group FROM accounts, usergroup WHERE accounts.username = "admin"`;
    query = `SELECT accounts.username, accounts.email, accounts.isEnabled, usergroup.user_group FROM accounts, usergroup;`;
    connection.query(getGroup, (error, result) => {
      if (error) console.log(error);
      // console.log(result); 
      res.send(result);
    });
  });
};
module.exports = accounts;
