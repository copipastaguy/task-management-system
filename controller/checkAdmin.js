const connection = require("../server/connection");
const checkAdmin = function (app) {
  app.post("/checkadmin", (req, res) => {
    // checkGroup(userid, usergroup)
    const { username } = req.body;
    console.log(username);
    const checkIsAdmin = `SELECT admin_privilege FROM accounts WHERE username = ? `;
    connection.query(checkIsAdmin, [username], (error, result) => {
      if (error) throw error;
      else if (result.length > 0) {
        res.send(result);
      }
    });
  });
};

// const checkAdmin = (username, req, res) => {
//   // console.log("hi");
//   // checkGroup(userid, usergroup);
//   const checkIsAdmin = `SELECT username, admin_privilege FROM accounts WHERE username = ? `;
//   connection.query(checkIsAdmin, [username], (error, result) => {
//     if (error) throw error;

//     // RETURNS 1 IF ADMIN
//     // RETURNS 0 IF NOT ADMIN
//     res.send(result);
//   });
// };
module.exports = checkAdmin;
