const connection = require("../server/connection");
const bcrypt = require("bcrypt");
const errorHandler = require("./errorHandler");

const checkAdmin = require("../controller/checkAdmin");

const login = function (app) {
  //    - - - CONTROLLER LOGIC FOR LOGIN AND AUTH - - -
  //    - - - ROUTING FOR LOGIN AND AUTH - - -
  // app.get("/login", (req, res) => {
  //   res.redirect("/auth");
  // });

  app.post("/auth", (req, res, next) => {
    const { username, password } = req.body;

    // console.log(req.body);

    // - - - FIELD IS NOT EMPTY - - -
    if (username && password) {
      // - - - CHECK IF USER EXIST - - -
      // - - - FETCH HASHED PASSWORD OF USER - - -
      const query = `SELECT username, password, status, admin_privilege, email FROM accounts WHERE username = ? `;
      connection.query(query, [username], (error, result) => {
        if (error) throw error;
        // - - - VALID - - -
        else if (result.length > 0) {
          // console.log(result);
          const hashPassword = result[0].password;

          // fetch the exact user match
          // compare both passwords
          bcrypt.compare(password, hashPassword, (error, correctPassword) => {
            if (error) throw error;
            // returns boolean
            else if (correctPassword == true) {
              // console.log("logged in successfully");
              res.send(result);
              // return checkAdmin(username, req, res);
            } else {
              // console.log("wrong login details");
              return next(errorHandler("Wrong login details", req, res));
            }
          });
        } else {
          // - - - INVALID USER - - -
          // console.log("USER NOT FOUND");
          return next(errorHandler("Wrong login details", req, res));
        }
      });
    } else {
      // console.log("fill up all fields");
      return next(errorHandler("Please fill up all fields", req, res));
    }
  });
};

module.exports = login;
