const connection = require("../server/connection");
const checkAdmin = function (app) {
  app.get("/checkadmin", (req, res) => {
    // checkGroup(userid, usergroup)
    const currentUser = req.query.username;
    const checkIsAdmin = `SELECT admin_privilege FROM accounts WHERE username = ? `;
    connection.query(checkIsAdmin, [currentUser], (error, result) => {
      if (error) throw error;
      // console.log(result[0].admin_privilege);
      else if (result[0].admin_privilege == "1") {
        res.send(true);
      } else {
        res.send(false);
      }
    });
  });
};

module.exports = checkAdmin;
