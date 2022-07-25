const connection = require("../server/connection");

const getApplication = function (app) {
  // GET ALL ACCOUNTS
  app.get("/get-applications", (req, res) => {
    const getApplications = `SELECT * FROM application`;
    connection.query(getApplications, (error, applications) => {
      if (error) throw error;
      res.send(applications);
    });
  });

  app.get("/get-application", (req, res) => {
    const app_acronym = req.query.app_acronym;
    console.log(app_acronym);
    const getApplication = `SELECT * FROM application WHERE app_acronym = ?`;
    connection.query(getApplication, [app_acronym], (error, result) => {
      if (error) throw error;
      else {
        if (result.length > 0) {
          res.send(result);
        }
      }
    });
  });
};
module.exports = getApplication;
