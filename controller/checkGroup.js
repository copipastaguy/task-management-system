const connection = require("./server/connection");

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

module.exports = checkGroup;
