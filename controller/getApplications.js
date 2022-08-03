const connection = require("../server/connection");

const getApplication = function (app) {
  // GET ALL ACCOUNTS
  app.get("/get-applications", (req, res) => {
    const getApplications = `SELECT *, date_format(app_endDate, '%d/%m/%Y') as endDate FROM application`;
    connection.query(getApplications, (error, applications) => {
      if (error) throw error;
      else {
        const getMax = `SELECT MAX(app_Rnum) as max FROM application`;
        connection.query(getMax, (error, max) => {
          if (error) throw error;
          else {
            res.send([applications, max[0]]);
          }
        });
      }
    });
  });

  app.get("/get-application", (req, res) => {
    const app_acronym = req.query.app_acronym;
    // console.log(app_acronym);
    const getApplication = `SELECT *, date_format(app_startDate, '%Y-%m-%d') as startDate, date_format(app_endDate, '%Y-%m-%d') as endDate FROM application WHERE app_acronym = ?`;
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
