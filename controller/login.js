const connection = require("../server/connection");

const login = function (app) {
  //    - - - CONTROLLER LOGIC FOR LOGIN AND AUTH - - -
  //    - - - ROUTING FOR LOGIN AND AUTH - - -
  app.get("/login", (req, res) => {
    res.json({
      message: "Logged in",
    });
    // console.log(req.body);
  });

  // auth the log in user
  app.post("/auth", (req, res) => {
    const { username, password } = req.body;

    // logged in
    if (username && password) {
      // validate logged in user is in database
      query = `SELECT * FROM accounts WHERE username = ? and password = ? `;
      connection.query(query, [username, password], (error, results) => {
        if (error) throw error;

        // valid account in database
        if (results.length > 0) {
          req.session.loggedIn = true;
          req.session.username = username;

          // redirect user to the next page
          res.redirect("/management");
        } else {
          // invalid user/ no account
          // redirect user back to login page
          res.redirect("/login");
        }
      });
    } else {
      res.redirect("/login");
    }
    console.log(req.body);
  });
};

module.exports = login;
