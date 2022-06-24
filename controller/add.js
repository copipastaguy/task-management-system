const connection = require("../server/connection");

const add = function (app) {
  app.post("/add", (req, res) => {
    // capture input fields
    const { newUsername, newPassword, newEmail, newGroup } = req.body;
    if (newUsername || newPassword || newEmail || newGroup) {
      //   check if new user exist
      check = `SELECT from accounts WHERE username = ?, email = ?`;
      connection.query(check, [newUsername, newEmail], (error, result) => {
        if (error) throw error;

        // same data exist in database
        if (result.length > 0) {
          console.log("user exist in database");
        } else {
          // all fields entered
          query = `INSERT INTO accounts (ugroup, username, password, email) VALUES (?, ?, ?, ?)`;
          connection.query(
            query,
            [newGroup, newUsername, newPassword, newEmail],
            (error, result) => {
              if (error) throw error;
              console.log("account added");
            }
          );
        }
      });
      // res.redirect("/management");
    }
    //  redirect user back to management page after adding
    res.redirect("/management");
  });
};

module.exports = add;
