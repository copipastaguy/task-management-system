const connection = require("../server/connection");

const accounts = function (app) {
  // GET ALL ACCOUNTS
  app.get("/accounts", (req, res) => {
    // query = `SELECT DISTINCT accounts.username FROM accounts, usergroup`;

    // get username
    const usernames = [];
    getUsername = `SELECT username FROM accounts`;
    connection.query(getUsername, (error, result) => {
      for (let i = 0; i < result.length; i++) {
        usernames.push(result[i].username);
      }

      query = `SELECT accounts.username, accounts.email, usergroup.user_group FROM accounts, usergroup WHERE accounts.username = usergroup.username`;
      connection.query(query, (error, result) => {
        if (error) console.log(error);

        // console.log(result);
        res.send(result);
      });
    });
  });
};
module.exports = accounts;
