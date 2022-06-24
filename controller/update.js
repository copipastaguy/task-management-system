const connection = require("../server/connection");

const update = function (app) {
  // UPDATE USER
  // CONDITIONAL QUERY BASED ON ENTERED FIELDS
  app.post("/update-user", (req, res) => {
    // get username of logged in user
    username = req.session.username;

    // capture input fields
    const { updatePassword, updateEmail, updateGroup } = req.body;

    if (updatePassword) {
      //only password entered
      query = `UPDATE accounts set password = ? WHERE username = ?`;
      connection.query(query, [updatePassword, username], (error, accounts) => {
        if (error) throw error;
        console.log(`password updated to ${updatePassword}`);
      });
    } else if (updateEmail) {
      query = `UPDATE accounts set email = ? WHERE username = ?`;
      connection.query(query, [updateEmail, username], (error, accounts) => {
        if (error) throw error;
        console.log(`email updated to ${updateEmail}`);
      });
    } else if (updateGroup) {
      query = `UPDATE accounts set user_group = ? WHERE username = ?`;
      connection.query(query, [updateGroup, username], (error) => {
        if (error) throw error;
        console.log(`added user ${username} into ${updateGroup}`);
      });
    } else if ((updatePassword, updateEmail, updateGroup)) {
      // all field entered
      query = `UPDATE accounts set password = ?, email = ? WHERE username = ?`;
      connection.query(
        query,
        [updatePassword, updateEmail, username],
        (error) => {
          if (error) throw errors;
          console.log(
            `password updated to ${updatePassword}, email updated to ${email} for ${username} `
          );
        }
      );
    } else {
      // username and email entered
      query = `UPDATE accounts set password = ?, email = ? WHERE username = ?`;
      connection.query(
        query,
        [updatePassword, updateEmail, username],
        (error, accounts) => {
          if (error) throw errors;
          console.log(
            `password updated to ${updatePassword}, email updated to ${email} for ${username} `
          );
        }
      );
    }

    res.redirect("/management");
  });
};
module.exports = update;
