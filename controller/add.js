const connection = require("../server/connection");

const add = function (app) {
  //    - - - CONTROLLER LOGIC FOR ADDING USER - - -
  //    - - - ROUTING FOR ADD - - -
  app.post("/add", (req, res) => {
    //  - - - INPUT - - -
    const { username, password, email, group } = req.body;
    console.log(req.body);

    // - - - FIELD IS NOT EMPTY - - -
    if (
      username.length > 0 ||
      password.length > 0 ||
      email.length > 0 ||
      group.length > 0
    ) {
      //   - - - CHECK IF USER EXIST - - -
      check = `SELECT * from accounts WHERE username = ? AND email = ?`;
      connection.query(check, [username, email], (error, result) => {
        if (error) throw error;
        console.log(result);

        // - - - USER EXIST (INVALID INPUT)- - -
        if (result.length > 0) {
          console.log("user exist in database");
        } else {
          res.send(result);
          // - - - USER DONT EXIST - - -
          query = `INSERT INTO accounts (ugroup, username, password, email) VALUES (?, ?, ?, ?)`;
          connection.query(
            query,
            [group, username, password, email],
            (error, response) => {
              if (error) throw error;
            }
          );
        }
      });
    }
  });
};

module.exports = add;
