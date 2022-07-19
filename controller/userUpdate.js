const connection = require("../server/connection");
const validator = require("validator");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const errorHandler = require("./errorHandler");

const userUpdate = function (app) {
  // GET ALL ACCOUNTS
  app.post("/user-update", (req, res, next) => {
    const { username, email, password } = req.body;

    // GET OLD DATA
    checkUser = `SELECT * FROM accounts WHERE username = ? `;
    connection.query(checkUser, [username], (error, result) => {
      if (error) throw error;
      else {
        //   no email
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
                  res.send();
                }
              );
            });
          }
        }
        res.send();
      }
    });
  });
};
module.exports = userUpdate;
