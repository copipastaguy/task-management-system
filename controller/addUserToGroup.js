const connection = require("../controller/server/connection");

const errorHandler = require("./errorHandler");

const addUserToGroup = function (app) {
  // GET ALL ACCOUNTS
  app.post("/add-user-to-group", (req, res, next) => {
    const { username, userGroup } = req.body;
    // console.log(userGroup);
    // FETCH EXISTING GROUP OF USER
    if (username) {
      checkUser = `SELECT * FROM accounts WHERE username = ? `;
      connection.query(checkUser, [username], (error, result) => {
        if (error) throw error;
        else if (result.length == 0) {
          return next(errorHandler("Invalid username", req, res));
        } else {
          const getUserGroup = `SELECT user_group FROM ACCOUNTS WHERE username = ?`;
          connection.query(getUserGroup, [username], (error, result) => {
            if (error) throw error;
            else if (result.length > 0) {
              console.log(result);
              const currentGroup = result[0].user_group;
              // console.log(currentGroup);
              currentGroupArray = currentGroup.split(",");
              // console.log(currentGroupArray);
              /////////////////////////// CHECK IF USER IS IN GROUP ////////////////////////////

              if (userGroup.toString().length > 1) {
                userGroup.forEach((group) => {
                  if (!currentGroupArray.includes(group)) {
                    //   RETURNS FALSE
                    //   DOES NOT INCLUDE GROUP
                    currentGroupArray.push(group);
                    // console.log(currentGroupArray);
                    const groupStr = currentGroupArray.toString();
                    console.log(groupStr);
                    /////////////////////////// UPDATE USERGROUP IN ACCOUNTS  ////////////////////////////
                    const updateUserGroup = `UPDATE accounts SET user_group = ?, timestamp = NOW() WHERE username = ?`;
                    connection.query(updateUserGroup, [groupStr, username], (error, result) => {
                      if (error) throw error;
                      else {
                        console.log("added user to group");
                        console.log(`UPDATED ${username} TO ${currentGroupArray} WITH NO REPEATED GROUPS`);
                        //   CREATE COMPOSITE KEY
                        checkCompositeKey = `SELECT * FROM usergroup WHERE username = ? AND user_group = ?`;
                        connection.query(checkCompositeKey, [username, group], (error, result) => {
                          if (error) throw error;
                          else if (result.length > 0) {
                            // COMPOSITE KEY EXIST IN TABLE
                            console.log(`EXISTING COMPOSITE KEY OF ${username} AND ${group}`);
                          } else {
                            // NEW COMPOSITE KEY ENTRY
                            addCompositeKey = `INSERT INTO usergroup (user_group, username, last_updated) VALUES (?, ?, NOW())`;
                            connection.query(addCompositeKey, [group, username], (error, result) => {
                              if (error) throw error;
                              console.log(`NEW COMPOSITE KEY OF ${username} AND ${group}`);
                            });
                          }
                        });
                      }
                    });
                  }
                });
                console.log("sending add");
                res.send();
              } else {
                return next(errorHandler("No user group selected", req, res));
              }
            }
          });
        }
      });
    } else {
      // NO USERNAME ENTERED
      return next(errorHandler("Invalid username", req, res));
    }
  });
};
module.exports = addUserToGroup;
1;
