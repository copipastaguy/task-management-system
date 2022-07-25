const connection = require("../server/connection");
const errorHandler = require("../controller/errorHandler");
const addApp = function (app) {
  app.post("/add-application", (req, res, next) => {
    // checkGroup(userid, usergroup)
    const {
      app_acronym,
      app_description,
      app_Rnum,
      app_startDate,
      app_endDate,
      permitOpen,
      permitTodo,
      permitDoing,
      permitDone,
    } = req.body;
    console.log(req.body);

    const addApp = `INSERT INTO application (app_acronym, app_description, app_Rnum, app_permitOpen, app_permitTodo) VALUES (?, ?, ?, ?, ?)`;
    if (app_acronym && app_description && app_Rnum) {
      const checkApp = `SELECT app_acronym, app_Rnum FROM application WHERE app_acronym = ? OR app_Rnum = ?`;
      connection.query(checkApp, [app_acronym, app_Rnum], (error, result) => {
        if (error) throw error;
        else if (result.length > 0) {
          // console.log(result);
          return next(
            errorHandler("Application name or running number exist!", req, res)
          );
        } else {
          // CHECK FOR OTHER CONDITIONS
          // const addApp = `INSERT INTO application (app_acronym, app_description, app_Rnum, app_startDate, app_endDate, app_permitOpen, app_permitTodo, app_permitDoing, app_permitDone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
          connection.query(
            addApp,
            [app_acronym, app_description, app_Rnum, permitOpen, permitTodo],
            (error, result) => {
              if (error) throw error;
              else {
                res.send("New task added");
              }
            }
          );
        }
      });
    } else {
      return next(errorHandler("Input all fields", req, res));
    }
  });
};

module.exports = addApp;
