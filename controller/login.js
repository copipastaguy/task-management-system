const { query } = require("express");
const connection = require("../server/connection");

const login = function (app) {
  //    - - - CONTROLLER LOGIC FOR LOGIN AND AUTH - - -
  //    - - - ROUTING FOR LOGIN AND AUTH - - -
  app.get("/login", (req, res) => {
    res.redirect("/auth");
  });

  app.post("/auth", (req, res) => {
    const { username, password } = req.body;
    // console.log(req.body);

    // - - - FIELD IS NOT EMPTY - - -
    if (username.length > 0 && password.length > 0) {
      // - - - CHECK IF USER EXIST - - -
      const query = `SELECT * FROM accounts WHERE username = ? and password = ? `;
      connection.query(query, [username, password], (error, result) => {
        if (error) throw error;

        // - - - VALID - - -
        if (result.length > 0) {
          // fetch the exact user match
          res.send(result);
          console.log("logged in successfully");
        } else {
          // - - - INVALID USER - - -
          // res.redirect("/login");
          console.log("USER NOT FOUND");
        }
      });
    } else if (username.length == 0 || password.length == 0) {
      // res.redirect("/login");
      console.log("fill up all fields");
    }
  });
};

module.exports = login;
