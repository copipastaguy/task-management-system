const connection = require("../server/connection");

const update = function (app) {
  //    - - - CONTROLLER LOGIC FOR LOGIN AND AUTH - - -
  //    - - - ROUTING FOR LOGIN AND AUTH - - -

  app.post("/update-user", (req, res) => {
    // - - - GET USERNAME - - -
    username = req.session.username;
    console.log(username);

    // - - - GET INPUTS - - -
    const { password, email, group } = req.body;
    console.log(req.body);

    if (password || email || group) {
      //only password entered
      query = `UPDATE accounts SET ugroup = ?, password = ?, email = ? WHERE username = ?`;
      connection.query(
        query,
        [group, password, email, username],
        (error, result) => {
          if (error) throw error;
          res.send(result);
        }
      );
    }
    // else if (email) {
    //   query = `UPDATE accounts set email = ? WHERE username = ?`;
    //   connection.query(query, [email, username], (error) => {
    //     if (error) throw error;
    //     console.log(`email updated to ${email}`);
    //   });
    // } else if (group) {
    //   query = `UPDATE accounts set user_group = ? WHERE username = ?`;
    //   connection.query(query, [group, username], (error) => {
    //     if (error) throw error;
    //     console.log(`added user ${username} into ${group}`);
    //   });
    // } else if ((password, email, group)) {
    //   // all field entered
    //   query = `UPDATE accounts set password = ?, email = ? WHERE username = ?`;
    //   connection.query(query, [password, email, username], (error) => {
    //     if (error) throw errors;
    //     console.log(
    //       `password updated to ${password}, email updated to ${email} for ${username} `
    //     );
    //   });
    // } else {
    //   // username and email entered
    //   query = `UPDATE accounts set password = ?, email = ? WHERE username = ?`;
    //   connection.query(
    //     query,
    //     [password, email, username],
    //     (error, accounts) => {
    //       if (error) throw errors;
    //       console.log(
    //         `password updated to ${password}, email updated to ${email} for ${username} `
    //       );
    //     }
    //   );
    // }

    // res.redirect("/management");
  });
};
module.exports = update;
