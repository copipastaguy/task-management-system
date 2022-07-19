const { response } = require("express");
const connection = require("../server/connection");

const errorHandler = require("./errorHandler");

const removeUserFromGroup = function (app) {
  // GET ALL ACCOUNTS
  app.post("/remove-user-from-group", (req, res, next) => {
    const { userGroup, username } = req.body;

    if (username) {
      checkUser = `SELECT * FROM accounts WHERE username = ? `;
      connection.query(checkUser, [username], (error, result) => {
        if (error) throw error;
        else if (result.length == 0) {
          return next(errorHandler("Invalid username", req, res));
        } else {
          //   VALID USERNAME
          // CHECK FOR GROUPS
          const getUserGroup = `SELECT user_group FROM ACCOUNTS WHERE username = ?`;
          connection.query(getUserGroup, [username], (error, result) => {
            if (error) throw error;
            else {
              // RETURNS A RESULT
              const currentGroup = result[0].user_group;
              let currentGroupArray = currentGroup.split(",");
              //   console.log(currentGroupArray);

              // LOOP USERGROUP AND COMPARE CURRENT GROUP

              if (userGroup.toString().length > 1) {
                userGroup.forEach((group) => {
                  console.log(group);
                  //   console.log(`REMOVING USER FROM ${group} `);
                  if (currentGroupArray.includes(group)) {
                    const index = currentGroupArray.indexOf(group);
                    if (index > -1) {
                      currentGroupArray.splice(index, 1);
                    }

                    // NEW ARRAY WITH CURRENT GROUPS
                    console.log(currentGroupArray);
                    groupStr = currentGroupArray.toString();
                    console.log(groupStr);
                    console.log(`REMOVING ${username} FROM ${group} group`);
                    // UPDATE ACCOUNTS USER GROUP
                    const removeUserFromGroup = `UPDATE accounts SET user_group = ?, timestamp = NOW() WHERE username = ?`;
                    connection.query(
                      removeUserFromGroup,
                      [groupStr, username],
                      (error, result) => {
                        if (error) throw error;
                        else {
                          console.log(`UPDATED ${username}`);
                        }
                      }
                    );
                  } else {
                  }
                });
                res.send();
              } else {
                return next(errorHandler("No group selected", req, res));
              }
            }
          });
        }
      });
    } else {
      // NO USERNAME
      return next(errorHandler("Invalid username", req, res));
    }
  });
};
module.exports = removeUserFromGroup;
