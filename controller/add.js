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
    const { username, password, email, userGroup } = req.body;
    // console.log(req.body);

    // - - - FIELD IS NOT EMPTY - - -
    if (username && password && userGroup && email) {
      // CHECK IF EMAIL EXIST
      if (email) {
        query = `SELECT * FROM accounts WHERE email = ?`;
        connection.query(query, [email], (error, result) => {
          if (error) {
            console.log(error);
            return;
          } else if (result.length > 0) {
            // res.send(result);
            next(errorHandler("Email already exist", req, res));
            return;
          } else {
            // VALIDATE EMAIL
            console.log("Validating email. . . ");
            if (validator.isEmail(email) || email.length == 0) {
              console.log("Valid email !");
            } else {
              // console.log("invalid email format");
              return next(
                errorHandler("Email should include a domain!", req, res)
              );
            }
          }
        });
      }

      //   - - - CHECK IF USER EXIST - - -
      if (username) {
        checkUsername = `SELECT username from accounts WHERE username = ?`;
        connection.query(checkUsername, [username], (error, result) => {
          if (error) {
            console.log(error);
            return;
          }
          // - - - USER EXIST (INVALID INPUT) - - -
          // SAME USERNAME
          if (result.length > 0) {
            // console.log(`Username already exist`);
            next(errorHandler("Username already exist", req, res));
            return;
          } else {
            console.log("New user!");
            // - - - NEW USER - - -
            if (password.length < 8 || password.length > 10) {
              // INVALID LENGTH
              // console.log(
              //   "Password length should be min 8 characters, max 10 characters"
              // );
              return next(
                errorHandler(
                  "Password length should be min 8 characters, max 10 characters",
                  req,
                  res
                )
              );
            } else {
              // VALIDATE PASSWORD
              console.log("Validating password. . .");
              if (
                !validator.isStrongPassword(password) ||
                password.length > 10 ||
                /\s/.test(password)
              ) {
                // console.log(
                //   "Password requires min 1 uppercase, min 1 lowercase, min 1 special character, numbers and no spaces"
                // );
                return next(
                  errorHandler(
                    "Password should include min 1 uppercase, min 1 lowercase, min 1 special character, numbers and no spaces",
                    req,
                    res
                  )
                );
              } else {
                // encrypt password and save into database
                // HASH PASSWORD
                bcrypt.hash(password, saltRounds, (err, hashPassword) => {
                  console.log("Hashing password. . .");
                  addUser = `INSERT INTO accounts ( username, password, email, user_group, timestamp) VALUES (?, ?, ?, ?, NOW())`;
                  const userString = userGroup.toString();
                  connection.query(
                    addUser,
                    [username, hashPassword, email, userString],
                    (error, result) => {
                      if (error) {
                        console.log(error);
                        return;
                      } else {
                        // ADDING USER GROUP TO USER WITH FOR LOOP
                        userGroup.forEach((group) => {
                          addUserGroup = `INSERT INTO usergroup (user_group, username) VALUES (? , ?)`;
                          connection.query(
                            addUserGroup,
                            [group, username],
                            (error, result) => {
                              if (error) {
                                console.log(error);
                                return;
                              }
                              // console.log(result);
                              console.log(`Adding ${username} into ${group}`);
                            }
                          );
                        });
                      }
                      res.send(result);
                    }
                  );
                });
              }
            }
          }
        });
      }
    } else {
      next(errorHandler("Fill in all fields", req, res));
      return;
    }
  });
};

module.exports = add;
