const connection = require("../server/connection");
const bcrypt = require("bcrypt");

const errorHandler = require("./errorHandler");
const validator = require("validator");

const update = function (app) {
  //    - - - CONTROLLER LOGIC FOR UPDATE - - -
  //    - - - ROUTING FOR UPDATE - - -

  app.post("/update-user", (req, res, next) => {
    // - - - INPUTS - - -
    const { username, password, email, user_group, enable } = req.body;
    console.log(req.body);

    if (email || password || username) {
      if (email) {
        // - - - CHECK IF EMAIL EXIST - - -
        query = `SELECT email FROM accounts WHERE email = ?`;
        connection.query(query, [email], (error, result) => {
          if (error) throw error;
          else if (result.length > 0) {
            console.log("email exist choose another one");
            return next(errorHandler("Email exist!", req, res));
          } else {
            console.log("Validating email. . .");
            if (validator.isEmail(email)) {
              updateEmail = `UPDATE accounts SET email = ? WHERE username = ?`;
              connection.query(
                updateEmail,
                [email, username],
                (error, result) => {
                  if (error) throw error;
                  res.send("Email updated");
                  console.log("Email updated");
                }
              );
            } else {
              // console.log("Invalid email format");
              return next(
                errorHandler("Email should include a domain!", req, res)
              );
            }
          }
        });
      }

      if (password) {
        if (password.length < 8 || password.length > 10) {
          return next(
            errorHandler(
              "Password length should be min 8 characters, max 10 characters",
              req,
              res
            )
          );
        } else {
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
            // - - - HASH PASSWORD - - -
            const hashPassword = bcrypt.hashSync(password, 10);
            console.log(hashPassword);

            query = `UPDATE accounts SET password = ? WHERE username = ?`;
            connection.query(
              query,
              [hashPassword, username],
              (error, result) => {
                if (error) throw error;
                res.send("Password updated");
              }
            );
          }
        }
      }

      // - - - CHECK IF GROUP COLUMN VALUE IS EMPTY - - -
      // if (user_group) {
      //   // - - - UPDATE VALUE - - -

      //   query = `UPDATE accounts SET user_group = ? WHERE username = ?`;
      //   connection.query(query, [user_group, username], (error, result) => {
      //     if (error) throw error;
      //     res.send(result);
      //   });
      // }

      // if (enable) {
      //   query = `SELECT isEnabled from accounts WHERE username = ?`;
      //   connection.query(query, [enable], (error, result) => {
      //     if (error) throw error;

      //     // - - - RETURNS A VALUE - - -
      //     // - - - UPDATE VALUE - - -
      //     if (result) {
      //       query = `UPDATE accounts SET isEnabled = ? WHERE username = ?`;
      //       connection.query(query, [enable, username], (error, result) => {
      //         if (error) throw error;
      //         res.send(result);
      //       });
      //     }
      //   });
      // }
    }
  });
};
module.exports = update;
