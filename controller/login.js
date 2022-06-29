const connection = require("../server/connection");

const login = function (app) {
  //    - - - CONTROLLER LOGIC FOR LOGIN AND AUTH - - -
  //    - - - ROUTING FOR LOGIN AND AUTH - - -
  app.get("/login", (req, res) => {
    res.redirect("/auth");
  });

  app.post("/auth", (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);

    // - - - FIELD IS NOT EMPTY - - -
    if (username.length > 0 && password.length > 0) {
      // - - - CHECK IF USER EXIST - - -
      query = `SELECT * FROM accounts WHERE username = ? and password = ? `;
      connection.query(query, [username, password], (error, result) => {
        if (error) throw error;

        // - - - VALID - - -
        if (result.length > 0) {
          req.session.loggedIn = true;
          req.session.username = username;

          // fetch the exact user match
          res.send(result);
          // console.log("logged in successfully");
        } else {
          // - - - INVALID USER - - -
          console.log("USER NOT FOUND");
        }
      });
    } else {
      // res.redirect("/login");
    }
  });

  app.get("/all", (req, res) => {
    console.log("/all");
    // res.send("hello");
  });
};

module.exports = login;
