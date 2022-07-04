const connection = require("../server/connection");
const validator = require("validator");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const add = function (app) {
  //    - - - CONTROLLER LOGIC FOR ADDING USER - - -
  //    - - - ROUTING FOR ADD - - -
  app.post("/add", (req, res, next) => {
    //  - - - INPUT - - -
    const { username, password, email, role } = req.body;
    console.log(req.body);

    // - - - FIELD IS NOT EMPTY - - -
    if (username || password || email || role) {
      //   - - - CHECK IF USER EXIST - - -
      check = `SELECT * from accounts WHERE username = ? AND email = ?`;
      connection.query(check, [username, email], (error, result) => {
        if (error) throw error;

        // - - - USER EXIST (INVALID INPUT) - - -
        if (result.length > 0) {
          console.log("user exist in database");
          return;
        } else {
          // - - - NEW USER - - -

          if (!password) {
            console.log("invalid password length");
            return;
          } else {
            // VALIDATE PASSWORD
            if (validator.isStrongPassword(password) && password.length <= 10) {
              console.log("valid password");
            } else {
              // console.log("invalid password format");
              return next();
            }

            // VALIDATE EMAIL
            if (validator.isEmail(email) || email.length == 0) {
              console.log("valid email");
            } else {
              return;
            }

            // encrypt password and save into database
            // HASH PASSWORD
            bcrypt.hash(password, saltRounds, (err, hashPassword) => {
              console.log(`hashed pw: ${hashPassword}`);
              addUser = `INSERT INTO accounts (roles, username, password, email) VALUES (?, ?, ?, ?)`;
              // connection.query(
              //   addUser,
              //   [role, username, hashPassword, email],
              //   (error, result) => {
              //     if (error) throw error;
              //     res.send(result);
              //   }
              // );
              console.log("added user");
              res.send(result);
            });
            return;
          }
        }
      });
    }
  });

  const errorHandler = (err, req, res, next) => {
    console.log("invalid password format");
  };
};

module.exports = add;
