const connection = require("../server/connection");
const errorHandler = require("./errorHandler");

const addupdateApp = function (app) {
  app.post("/add-application", (req, res, next) => {
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

    // const addNewApp = `INSERT INTO application (app_acronym, app_description, app_Rnum, app_startData, app_endDate, app_permitOpen, app_permitTodo) VALUES (?, ?, ?, ?, ?, ?, ?)`;
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
          const addNewApp = `INSERT INTO application (app_acronym, app_description, app_Rnum, app_startDate, app_endDate, app_permitOpen, app_permitTodo, app_permitDoing, app_permitDone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
          connection.query(
            addNewApp,
            [
              app_acronym,
              app_description,
              app_Rnum,
              app_startDate,
              app_endDate,
              permitOpen,
              permitTodo,
              permitDoing,
              permitDone,
            ],
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

  app.put(`/update-application`, (req, res, next) => {
    const acronym = req.query.app_acronym;
    console.log(acronym);

    const {
      app_acronym,
      app_description,
      app_Rnum,
      startDate,
      endDate,
      permitOpen,
      permitTodo,
      permitDoing,
      permitDone,
    } = req.body;
    // console.log(req.body);

    const getData = `SELECT * FROM application WHERE app_acronym = ?`;
    connection.query(getData, [app_acronym], (error, result) => {
      if (error) throw error;
      else if (result.length > 0) {
        // console.log(result[0]);

        //////////////////// DATES ////////////////////
        if (!startDate) {
          const old_startDate = result[0].app_startDate;
          const updateInfo = `UPDATE application SET app_startDate = ?`;
          connection.query(updateInfo, [old_startDate], (error, result) => {
            if (error) throw error;
          });
        } else {
          const updateInfo = `UPDATE application SET app_startDate = ?`;
          connection.query(updateInfo, [startDate], (error, result) => {
            if (error) throw error;
          });
        }

        if (!endDate) {
          const old_endDate = result[0].app_endDate;
          const updateInfo = `UPDATE application SET app_endDate = ?`;
          connection.query(updateInfo, [old_endDate], (error, result) => {
            if (error) throw error;
          });
        } else {
          const updateInfo = `UPDATE application SET app_endDate = ?`;
          connection.query(updateInfo, [endDate], (error, result) => {
            if (error) throw error;
          });
        }

        //////////////////// PERMIT OPEN ////////////////////
        if (!permitOpen) {
          const oldPermitOpen = result[0].app_permitOpen;
          const updateInfo = `UPDATE application SET app_permitOpen = ?`;
          connection.query(updateInfo, [oldPermitOpen], (error, result) => {
            if (error) throw error;
          });
        } else {
          const updateInfo = `UPDATE application SET app_permitOpen = ?`;
          connection.query(updateInfo, [permitOpen], (error, result) => {
            if (error) throw error;
          });
        }

        //////////////////// PERMIT TODO ////////////////////
        if (!permitTodo) {
          const oldPermitTodo = result[0].app_permitTodo;
          const updateInfo = `UPDATE application SET app_permitToDo = ?`;
          connection.query(updateInfo, [oldPermitTodo], (error, result) => {
            if (error) throw error;
          });
        } else {
          const updateInfo = `UPDATE application SET app_permitToDo = ?`;
          connection.query(updateInfo, [permitTodo], (error, result) => {
            if (error) throw error;
          });
        }

        //////////////////// PERMIT DOING ////////////////////
        if (!permitDoing) {
          const oldPermitDoing = result[0].app_permitDoing;
          const updateInfo = `UPDATE application SET app_permitDoing = ?`;
          connection.query(updateInfo, [oldPermitDoing], (error, result) => {
            if (error) throw error;
          });
        } else {
          const updateInfo = `UPDATE application SET app_permitDoing = ?`;
          connection.query(updateInfo, [permitDoing], (error, result) => {
            if (error) throw error;
          });
        }

        //////////////////// PERMIT DOING ////////////////////
        if (!permitDone) {
          const oldPermitDone = result[0].app_permitDone;
          const updateInfo = `UPDATE application SET app_permitDone = ?`;
          connection.query(updateInfo, [oldPermitDone], (error, result) => {
            if (error) throw error;
          });
        } else {
          const updateInfo = `UPDATE application SET app_permitDone = ?`;
          connection.query(updateInfo, [permitDone], (error, result) => {
            if (error) throw error;
          });
        }
      }
    });
  });
};

module.exports = addupdateApp;
