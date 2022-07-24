const connection = require("../server/connection");
const errorHandler = require("../controller/errorHandler");
const addApp = function (app) {
  app.post("/add-application", (req, res, next) => {
    // checkGroup(userid, usergroup)
    const { appAcronym, appDescription, permitOpen } = req.body;
    console.log(req.body);
    const addApp = `INSERT INTO application (app_acronym, app_permitOpen) VALUES (?, ?)`;

    if (appAcronym) {
      const checkApp = `SELECT app_acronym FROM application WHERE app_acronym = ?`;
      connection.query(checkApp, [appAcronym], (error, result) => {
        if (error) throw error;
        else if (result.length > 0) {
          return next(errorHandler("Application name exist!", req, res));
        } else {
          // CHECK FOR OTHER CONDITIONS

          // const addApp = `INSERT INTO application (app_acronym, app_description, app_Rnum, app_permitOpen, app_permitTodo, app_permitDoing, app_permitDone) VALUES (?, ?, ?, ?, ?, ?, ?)`;
          connection.query(
            addApp,
            [appAcronym, permitOpen],
            (error, result) => {
              if (error) throw error;
              else {
                res.send(result);
              }
            }
          );
        }
      });
    } else {
      return next(errorHandler("Input valid application name", req, res));
    }
  });
};

module.exports = addApp;
