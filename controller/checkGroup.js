const connection = require("../server/connection");
const checkGroup = function (app) {
  app.get("/checkgroup", (req, res) => {
    // checkGroup(userid, usergroup)
    query = `SELECT accounts.username, usergroup.user_group FROM accounts, usergroup WHERE accounts.username = "admin" `;
    connection.query(query, (error, result) => {
      res.send(result);
    });
  });
};

module.exports = checkGroup;
