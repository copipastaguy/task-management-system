const connection = require("../server/connection");
const validator = require("validator");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const add = function (app) {
  //    - - - CONTROLLER LOGIC FOR ADDING USER - - -
  //    - - - ROUTING FOR ADD - - -
  app.post("/add", (req, res) => {
    //  - - - INPUT - - -
    const { username, password, email, role } = req.body;
    console.log(req.body);

    // - - - FIELD IS NOT EMPTY - - -
    if (
      username.length > 0 ||
      password.length > 8 ||
      email.length > 0 ||
      role
    ) {
      // - - - VALIDATE EMAIL - - -
      

      //   - - - CHECK IF USER EXIST - - -
      check = `SELECT * from accounts WHERE username = ? AND email = ?`;
      connection.query(check, [username, email], (error, result) => {
        if (error) throw error;

        // - - - USER EXIST (INVALID INPUT)- - -
        if (result.length > 0) {
          console.log("user exist in database");
          return;
        } else {
          res.send(result);

          // - - - NEW USER - - -
          // encrypt password and save into database
          bcrypt.hash(password, saltRounds, (err, hashPassword) => {
            console.log(`hashed pw: ${hashPassword}`);

            query = `INSERT INTO accounts (roles, username, password, email) VALUES (?, ?, ?, ?)`;
            connection.query(
              query,
              [role, username, hashPassword, email],
              (error, response) => {
                if (error) throw error;
              }
            );
          });
        }
      });
    }
  });
};

module.exports = add;
