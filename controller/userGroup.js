const connection = require("../server/connection");

const userGroup = function (app) {
  // GET ALL ACCOUNTS
  app.get("/user-groups", (req, res) => {
    usergroup = `SELECT groupname FROM groupnames`;
    connection.query(usergroup, (error, groupInfo) => {
      if (error) throw error;
      res.send(groupInfo);
    });
  });
};
module.exports = userGroup;
