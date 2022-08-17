const connection = require("../controller/server/connection");

const errorHandler = require("./errorHandler");

const addGroup = function (app) {
  // GET ALL ACCOUNTS
  app.post("/add-group", (req, res, next) => {
    const { groupname } = req.body;

    if (groupname) {
      const checkGroup = `SELECT groupname FROM groupnames WHERE groupname = ?`;
      connection.query(checkGroup, [groupname], (error, result) => {
        if (error) throw error;
        else if (result.length > 0) {
          return next(errorHandler("User group exist", req, res));
        } else {
          const addGroup = `INSERT INTO groupnames (groupname) VALUES (?)`;
          connection.query(addGroup, [groupname], (error, result) => {
            if (error) throw error;
            else res.send();
          });
        }
      });
    } else {
      return next(errorHandler("Invalid group name", req, res));
    }
  });
};
module.exports = addGroup;
