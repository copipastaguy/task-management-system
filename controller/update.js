const connection = require("../server/connection");

const update = function (app) {
  //    - - - CONTROLLER LOGIC FOR UPDATE - - -
  //    - - - ROUTING FOR UPDATE - - -

  app.post("/update-user", (req, res) => {
    // - - - INPUTS - - -
    const { username, password, email, group } = req.body;
    console.log(username);
    console.log(req.body);

    // - - - CHECK IF EMAIL COLUMN VALUE IS EMPTY - - -
    if (email.length > 0) {
      query = `SELECT email from accounts WHERE username = ?`;
      connection.query(query, [username], (error, result) => {
        if (error) throw error;

        // - - - RETURNS A VALUE - - -
        // - - - UPDATE VALUE - - -
        if (result) {
          query = `UPDATE accounts SET email = ? WHERE username = ?`;
          connection.query(query, [email, username], (error, result) => {
            if (error) throw error;
            res.send(result);
          });
        }
      });
    }

    // - - - CHECK IF PASSWORD COLUMN VALUE IS EMPTY - - -
    if (password.length > 0) {
      query = `SELECT password from accounts WHERE username = ?`;
      connection.query(query, [password], (error, result) => {
        if (error) throw error;

        // - - - RETURNS A VALUE - - -
        // - - - UPDATE VALUE - - -
        if (result) {
          query = `UPDATE accounts SET password = ? WHERE username = ?`;
          connection.query(query, [password, username], (error, result) => {
            if (error) throw error;
            res.send(result);
          });
        }
      });
    }

    // - - - CHECK IF GROUP COLUMN VALUE IS EMPTY - - -
    if (group) {
      query = `SELECT ugroup from accounts WHERE username = ?`;
      connection.query(query, [group], (error, result) => {
        if (error) throw error;

        // - - - RETURNS A VALUE - - -
        // - - - UPDATE VALUE - - -
        if (result) {
          query = `UPDATE accounts SET ugroup = ? WHERE username = ?`;
          connection.query(query, [group, username], (error, result) => {
            if (error) throw error;
            res.send(result);
          });
        }
      });
    }
  });

  
};
module.exports = update;
