const connection = require("../server/connection");

const userGroup = function (app) {
  // GET ALL ACCOUNTS
  app.get("/user-groups", (req, res) => {
    usergroup = `SELECT DISTINCT usergroup.user_group FROM usergroup`;
    connection.query(usergroup, (error, groupInfo) => {
      if (error) throw error;
      res.send(groupInfo);
    });
  });
};
module.exports = userGroup;
