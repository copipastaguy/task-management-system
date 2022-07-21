const connection = require("../server/connection");
const checkGroup = function (app) {
  app.get("/checkgroup", (req, res) => {
    // checkGroup(userid, usergroup)
    const currentUser = req.query.username;
    const userGroup = req.query.usergroup;
    const checkIsAdmin = `SELECT * FROM usergroup WHERE username = ? AND user_group = ? `;
    connection.query(
      checkIsAdmin,
      [currentUser, userGroup],
      (error, result) => {
        if (error) throw error;
        else {
          if (result.length > 0) {
            res.send(true);
          } else {
            res.send(false);
          }
        }
      }
    );
  });
};

module.exports = checkGroup;
