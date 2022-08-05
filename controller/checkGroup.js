const connection = require("../server/connection");

// const checkGroup = (app, username, usergroup) => {
//   app.get("/checkgroup", (req, res) => {
//     // checkGroup(userid, usergroup)
//     const username = req.query.username;
//     const usergroup = req.query.usergroup;
//     // console.log(currentUser, userGroup);
//     const checkIsAdmin = `SELECT * FROM usergroup WHERE username = ? AND user_group = ? `;
//     connection.query(checkIsAdmin, [username, usergroup], (error, result) => {
//       if (error) throw error;
//       else {
//         if (result.length > 0) {
//           res.send(true);
//         } else {
//           res.send(false);
//         }
//       }
//     });
//   });
// };

const checkGroup = ({ username, usergroup }) => {
  // console.log(username, usergroup);
  return new Promise((resolve, reject) => {
    const checkIsAdmin = `SELECT * FROM usergroup WHERE username = ? AND user_group = ? `;
    connection.query(checkIsAdmin, [username, usergroup], (error, result) => {
      if (error) reject(error);
      else {
        if (result.length > 0) {
          return resolve(true);
        } else {
          return resolve(false);
        }
      }
    });
  });
};

// export default checkGroup;

module.exports = checkGroup;
