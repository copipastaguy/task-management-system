const connection = require("../server/connection");
const bcrypt = require("bcrypt");

const login = function (app) {
  //    - - - CONTROLLER LOGIC FOR LOGIN AND AUTH - - -
  //    - - - ROUTING FOR LOGIN AND AUTH - - -
  app.get("/login", (req, res) => {
    res.redirect("/auth");
  });

  app.post("/auth", (req, res) => {
    const { username, password } = req.body;

    // - - - FIELD IS NOT EMPTY - - -
    if (username.length > 0 && password.length > 0) {
      // - - - CHECK IF USER EXIST - - -
      // - - - FETCH HASHED PASSWORD OF USER - - -
      const query = `SELECT username, password, admin_privilege FROM accounts WHERE username = ? `;
      connection.query(query, [username], (error, result) => {
        if (error) throw error;

        // - - - VALID - - -
        if (result.length > 0) {
          const hashPassword = result[0].password;
          // res.send(hashPassword);
          // fetch the exact user match
          // decrypt password from database

          bcrypt.compare(password, hashPassword, (error, result) => {
            // returns boolean
            if (result == true) {
              console.log("logged in successfully");
            } else {
              console.log("wrong login details");
            }
          });
        } else {
          // - - - INVALID USER - - -
          // res.redirect("/login");
          console.log("USER NOT FOUND");
        }
        res.send(result);
      });
    } else if (username.length == 0 || password.length == 0) {
      // res.redirect("/login");
      console.log("fill up all fields");
    }
  });
};

module.exports = login;
