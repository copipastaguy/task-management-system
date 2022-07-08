const connection = require("../server/connection");

const accounts = function (app) {
  // GET ALL ACCOUNTS
  app.get("/accounts", (req, res) => {
<<<<<<< HEAD
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
=======
    getGroup = `SELECT usergroup.id, usergroup.user_group, accounts.username FROM accounts, usergroup WHERE accounts.username = "admin"`;
    query = `SELECT accounts.username, accounts.email, accounts.isEnabled, usergroup.user_group FROM accounts, usergroup;`;
    connection.query(getGroup, (error, results) => {
      if (error) console.log(error);
      // console.log(result);

      results.forEach((result) => {
        console.log(result.user_group);
>>>>>>> 32efe765acdf4e8805e42f06226dc38860d5a7ce
      });
    });
  });
};
module.exports = accounts;
