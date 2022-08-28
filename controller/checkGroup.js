const connection = require("./server/connection");

const checkGroup = ({ username, usergroup }) => {
  // console.log(username, usergroup);
  return new Promise((resolve, reject) => {
    const checkUsergroup = `SELECT user_group FROM accounts WHERE username = ?`;
    connection.query(checkUsergroup, [username], (error, result) => {
      if (error) reject(error);
      else {
        if (result.length > 0) {
          const group = result[0].user_group;
          if (group.includes(usergroup)) return resolve(true);
          return resolve(false);
        } else {
          return resolve(false);
        }
      }
    });
  });
};

module.exports = checkGroup;
