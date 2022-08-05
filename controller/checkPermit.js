const connection = require("../server/connection");
const checkGroup = require("./checkGroup");

const checkPermit = (app) => {
  app.get("/checkgroup", async (req, res) => {
    const username = req.query.username;
    const usergroup = req.query.usergroup;

    const checkPermit = await checkGroup({ username, usergroup });
    res.send(checkPermit);
    // const checkPermit = `SELECT * FROM usergroup WHERE username = ? AND user_group = ? `;
    // connection.query(checkIsAdmin, [username, usergroup], (error, result) => {
    //   if (error) throw error;
    //   else {
    //     if (result.length > 0) {
    //       res.send(true);
    //     } else {
    //       res.send(false);
    //     }
    //   }
    // });
  });
};

module.exports = checkPermit;
