const connection = require("../server/connection");
const validator = require("validator");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const errorHandler = require("./errorHandler");
const e = require("cors");

const update = function (app) {
  //    - - - CONTROLLER LOGIC FOR UPDATE - - -
  //    - - - ROUTING FOR UPDATE - - -

  app.put("/admin-update-user", (req, res, next) => {
    // - - - INPUTS - - -
    const { username, password, email, userGroup, active } = req.body;
    // console.log(req.body);

    //   - - - CHECK IF USER EXIST - - -
    ///////////////////////////// CHECK USERNAME ////////////////////////////
    if (username) {
      checkUser = `SELECT * FROM accounts WHERE username = ? `;
      connection.query(checkUser, [username], (error, result) => {
        if (error) throw error;
        else if (result.length == 0) {
          return next(errorHandler("Invalid username", req, res));
        } else {
          console.log(result[0]);
          ///////////////////////////// VALID USERNAME ////////////////////////////

          ///////////////////////////// CHECK FOR OPTIONAL FIELDS ////////////////////////////
          if (!email) {
            const oldEmail = result[0].email;
            console.log(oldEmail);

            ///////////////////////////// ADD EXISTING EMAIL ////////////////////////////
            updateEmail = `UPDATE accounts SET email = ?, timestamp = NOW() WHERE username = ?`;
            connection.query(
              updateEmail,
              [oldEmail, username],
              (error, result) => {
                if (error) throw error;
                console.log("NO CHANGE IN EMAIL . . .");
              }
            );
          } else {
            ///////////////////////////// NEW EMAIL ENTERED ////////////////////////////
            ///////////////////////////// VALIDATE EMAIL ////////////////////////////
            if (validator.isEmail(email)) {
              console.log("good email");

              ///////////////////////////// UPDATE EMAIL ////////////////////////////
              updateEmail = `UPDATE accounts SET email = ?, timestamp = NOW() WHERE username = ?`;
              connection.query(
                updateEmail,
                [email, username],
                (error, result) => {
                  if (error) throw error;
                  console.log("UPDATING EMAIL . . .");
                }
              );
            } else {
              return next(errorHandler("Invalid email format", req, res));
            }
          }

          if (!password) {
            const oldPassword = result[0].password;
            ///////////////////////////// DO NOT HASH PASSWORD AGAIN ////////////////////////////
            updatePassword = `UPDATE accounts SET password = ?, timestamp = NOW() WHERE username = ?`;
            connection.query(
              updatePassword,
              [oldPassword, username],
              (error, result) => {
                if (error) throw error;
                console.log("NO CHANGE IN PASSWORD . . .");
              }
            );
          } else {
            ///////////////////////////// NEW PASSWORD ENTERED ////////////////////////////
            ///////////////////////////// VALIDATE PASSWORD ////////////////////////////
            if (
              password.length < 8 ||
              password.length > 10 ||
              /\s/.test(password)
            ) {
              return next(
                errorHandler(
                  "Password needs to be 8-10 characters and no space",
                  req,
                  res
                )
              );
            } else if (!validator.isStrongPassword(password)) {
              return next(
                errorHandler(
                  "Password requires 1 lowercase, 1 uppercase, 1 symbol and numbers",
                  req,
                  res
                )
              );
            } else {
              ///////////////////////////// HASH PASSWORD ////////////////////////////
              bcrypt.hash(password, saltRounds, (error, hashPassword) => {
                if (error) throw error;
                updatePassword = `UPDATE accounts SET password = ?, timestamp = NOW() WHERE username = ?`;
                connection.query(
                  updatePassword,
                  [hashPassword, username],
                  (error, result) => {
                    if (error) throw error;
                    console.log(hashPassword);
                    console.log("UPDATING PASSWORD . . .");
                  }
                );
              });
            }
          }

          ///////////////////////////// UPDATE STATUS ////////////////////////////
          if (!active) {
            const oldActive = result[0].status;
            updateStatus = `UPDATE accounts SET status = ?, timestamp = NOW() WHERE username = ?`;
            connection.query(
              updateStatus,
              [oldActive, username],
              (error, result) => {
                if (error) throw error;
                console.log("NO CHANGE IN STATUS . . .");
              }
            );
          } else {
            updateStatus = `UPDATE accounts SET status = ?, timestamp = NOW() WHERE username = ?`;
            connection.query(
              updateStatus,
              [active, username],
              (error, result) => {
                if (error) throw error;
                console.log("UPDATING STATUS . . .");
              }
            );
          }

          ///////////////////////////// UPDATE GROUP ////////////////////////////
          const groupStr = userGroup.toString();
          if (groupStr.length > 0) {
            console.log("CHECKING GROUPS");
            userGroup.forEach((group) => {
              // CHECK GROUPNAME EXIST
              checkGroup = `SELECT * FROM groupnames WHERE groupname = ?`;
              connection.query(checkGroup, [group], (error, result) => {
                if (error) throw error;
                /////////////////////////////  CREATE NEW GROUP  ////////////////////////////
                else if (result.length == 0) {
                  addGroup = `INSERT INTO groupnames (groupname) VALUES (?)`;
                  connection.query(addGroup, [group], (error, result) => {
                    if (error) throw error;
                    else {
                      console.log(`NEW GROUP ADDED: ${group}`);

                      ////////////////////////////  UPDATE USER IN ACCOUNTS ////////////////////////////
                      updateUserGroup = `UPDATE accounts SET user_group = ?, timestamp = NOW() WHERE username = ?`;
                      // CONVERT GROUP ARRAY INTO STRING FOR ACCOUNTS
                      // const groupStr = userGroup.toString();
                      // console.log(groupStr);

                      connection.query(
                        updateUserGroup,
                        [groupStr, username],
                        (error, result) => {
                          if (error) throw error;
                          else {
                            // console.log(`UPDATED USER ${username}`);
                            // console.log("CHECKING COMPOSITE KEY . . .");

                            /////////////////////////// CHECK COMPOSITE KEY USER / GROUP  ////////////////////////////
                            checkCompositeKey = `SELECT * FROM usergroup WHERE username = ? AND user_group = ?`;
                            connection.query(
                              checkCompositeKey,
                              [username, group],
                              (error, result) => {
                                if (error) throw error;
                                else if (result.length > 0) {
                                  // COMPOSITE KEY EXIST IN TABLE
                                  console.log(
                                    `EXISTING COMPOSITE KEY OF ${username} AND ${group}`
                                  );
                                } else {
                                  // NEW COMPOSITE KEY ENTRY
                                  addCompositeKey = `INSERT INTO usergroup (user_group, username, last_updated) VALUES (?, ?, NOW())`;
                                  connection.query(
                                    addCompositeKey,
                                    [group, username],
                                    (error, result) => {
                                      if (error) throw error;
                                      console.log(
                                        `NEW COMPOSITE KEY OF ${username} AND ${group} FOUND`
                                      );
                                      console.log("CREATING NEW COMPOSITE KEY");
                                    }
                                  );
                                }
                              }
                            );
                          }
                        }
                      );
                    }
                  });
                } else {
                  ///////////////////////////// GROUP EXIST  ////////////////////////////
                  updateUserGroup = `UPDATE accounts SET user_group = ?, timestamp = NOW() WHERE username = ?`;
                  // CONVERT GROUP ARRAY INTO STRING FOR ACCOUNTS
                  const groupStr = userGroup.toString();
                  // console.log(groupStr);
                  connection.query(
                    updateUserGroup,
                    [groupStr, username],
                    (error, result) => {
                      if (error) throw error;
                      console.log(`UPDATED USER ${username}`);
                    }
                  );

                  /////////////////////////// CHECK COMPOSITE KEY USER / GROUP  ////////////////////////////
                  console.log("hi");
                  checkCompositeKey = `SELECT * FROM usergroup WHERE username = ? AND user_group = ?`;
                  connection.query(
                    checkCompositeKey,
                    [username, group],
                    (error, result) => {
                      if (error) throw error;
                      else if (result.length > 0) {
                        // COMPOSITE KEY EXIST IN TABLE
                        console.log(
                          `EXISTING COMPOSITE KEY OF ${username} AND ${group}`
                        );
                      } else {
                        // NEW COMPOSITE KEY ENTRY
                        addCompositeKey = `INSERT INTO usergroup (user_group, username, last_updated) VALUES (?, ?, NOW())`;
                        connection.query(
                          addCompositeKey,
                          [group, username],
                          (error, result) => {
                            if (error) throw error;
                            console.log(
                              `NEW COMPOSITE KEY OF ${username} AND ${group}`
                            );
                          }
                        );
                      }
                    }
                  );
                }
              });
            });
            res.send();
          } else if (groupStr.length == 0) {
            const oldGroupStr = result[0].user_group;
            console.log(oldGroupStr);
            console.log("NO CHANGE IN USERGROUP");
          }
        }
      });
    } else {
      return next(errorHandler("Enter username to update", req, res));
    }
  });
};
module.exports = update;
