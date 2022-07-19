const connection = require("../server/connection");
const validator = require("validator");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const errorHandler = require("./errorHandler");

const add = function (app) {
  //    - - - CONTROLLER LOGIC FOR ADDING USER - - -
  //    - - - ROUTING FOR ADD - - -
  app.post("/add", (req, res, next) => {
    //  - - - INPUT - - -
    const { username, password, email, userGroup, active } = req.body;
    // console.log(req.body);

    // - - - FIELD IS NOT EMPTY - - -
    if (username && password) {
      //   - - - CHECK IF USER EXIST - - -
      ///////////////////////////// CHECK USERNAME ////////////////////////////
      if (username) {
        checkUsername = `SELECT username FROM accounts WHERE username = ? `;
        connection.query(checkUsername, [username], (error, result) => {
          if (error) throw error;
          else if (result.length > 0) {
            return next(errorHandler("Invalid username", req, res));
          } else {
            // works
            console.log("new username");
            console.log("Checking password");

            ///////////////////////////// CHECK PASSWORD ////////////////////////////
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
              ///////////////////////////// CHECK EMAIL ////////////////////////////
              if (email) {
                if (validator.isEmail(email)) {
                  console.log("good email");
                } else {
                  return next(errorHandler("Invalid email format", req, res));
                }
              }

              if (!active) {
                active == "active";
              }

              ///////////////////////////// CHECK GROUP EXIST AND CREATE GROUP  ////////////////////////////
              if (userGroup) {
                userGroup.forEach((group) => {
                  checkGroup = `SELECT * FROM groupnames WHERE groupname = ?`;
                  connection.query(checkGroup, [group], (error, result) => {
                    if (error) throw error;
                    /////////////////////////////  CREATE GROUP  ////////////////////////////
                    else if (result.length == 0) {
                      addGroup = `INSERT INTO groupnames (groupname) VALUES (?)`;
                      connection.query(addGroup, [group], (error, result) => {
                        if (error) throw error;
                        // console.log(`new group added ${group}`);
                      });
                    }
                  });
                });
              }

              ///////////////////////////// ADD USER INTO ACCOUNTS  ////////////////////////////
              addUser = `INSERT INTO accounts (username, password, email, user_group, timestamp) VALUES (?, ?, ?, ?, NOW())`;
              // CONVERT GROUP ARRAY INTO STRING FOR ACCOUNTS
              const groupStr = userGroup.toString();
              bcrypt.hash(password, saltRounds, (error, hashPassword) => {
                if (error) throw error;
                else {
                  console.log("valid password format, hashing now");
                  console.log(hashPassword);
                  // connection.query(
                  //   addUser,
                  //   [username, hashPassword, email, groupStr],
                  //   (error, result) => {
                  //     if (error) throw error;

                  //     // THIS HAS TO PASS FIRST BEFORE ADDING USER INTO USERGROUP
                  //     console.log(`${username} added into DB `);
                  //   }
                  // );
                }

                ///////////////////////////// ADD USER INTO USERGROUP  ////////////////////////////
                addUserWithGroup = `INSERT INTO usergroup (username, user_group, last_updated) VALUES (?, ?, NOW())`;
                // USER GROUP IS AN ARRAY
                userGroup.forEach((group) => {
                  // connection.query(
                  //   addUserWithGroup,
                  //   [username, group],
                  //   (error, result) => {
                  //     if (error) throw error;
                  //     console.log(`Added ${username} into ${group}`);
                  //   }
                  // );
                });

                ///////////////////////////// SUCCESSFULLY ADDED INTO DB WITH ALL CONDITIONS FILLED  ////////////////////////////
                res.send();
              });
            }
          }
        });
      } else {
        // works
        return next(errorHandler("Invalid username", req, res));
      }
    } else {
      return next(errorHandler("Fill in username and password", req, res));
    }
  });
};

module.exports = add;
