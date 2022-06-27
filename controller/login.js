const connection = require("../server/connection");

const login = function (app) {
  //    - - - CONTROLLER LOGIC FOR LOGIN AND AUTH - - -
  //    - - - ROUTING FOR LOGIN AND AUTH - - -
  app.get("/login", (req, res) => {
    res.redirect("/auth");
  });

  app.get("/auth", (req, res) => {
    // res.redirect("/auth");
    const { username, password } = req.body;
    console.log(req.body);

    // - - - FIELD IS NOT EMPTY - - -
    if (username && password) {
      // - - - CHECK IF USER EXIST - - -
      query = `SELECT * FROM accounts WHERE username = ? and password = ? `;
      connection.query(query, [username, password], (error, result) => {
        if (error) throw error;

        // - - - VALID - - -
        if (result) {
          req.session.loggedIn = true;
          req.session.username = username;

          // fetch the exact user match
          console.log(result);
          res.send("valid user");
          // redirect user to the next page
          res.redirect("/management");
        } else {
          // - - - INVALID USER - - -
          res.send("invalid user");
          // res.redirect("/login");
        }
      });
    } else {
      res.redirect("/");
    }
  });

  app.get("/all", (req, res) => {
    console.log("/all");
    // res.send("hello");
  });
};

module.exports = login;
