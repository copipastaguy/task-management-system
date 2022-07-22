const connection = require("../server/connection");

const getApplcation = function (app) {
  // GET ALL ACCOUNTS
  app.get("/applications", (req, res) => {
    const getApplications = `SELECT * FROM application`;
    connection.query(getApplications, (error, applications) => {
      if (error) throw error;
      res.send(applications);
    });
  });
};
module.exports = getApplcation;
