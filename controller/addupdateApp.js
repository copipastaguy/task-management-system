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
    // console.log(req.body);

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
    console.log(req.body);

    const getData = `SELECT * FROM application WHERE app_acronym = ?`;
    connection.query(getData, [app_acronym], (error, result) => {
      if (error) throw error;
      else if (result.length > 0) {
        console.log(result[0]);

        //////////////////// DATES ////////////////////
        if (!startDate) {
          const old_startDate = result[0].app_startDate;
          const updateInfo = `UPDATE application SET app_startDate = ? WHERE app_acronym = ?`;
          connection.query(
            updateInfo,
            [old_startDate, app_acronym],
            (error, result) => {
              if (error) throw error;
            }
          );
        } else if (startDate) {
          const updateInfo = `UPDATE application SET app_startDate = ? WHERE app_acronym = ?`;
          connection.query(
            updateInfo,
            [startDate, app_acronym],
            (error, result) => {
              if (error) throw error;
            }
          );
        }

        if (!endDate) {
          const old_endDate = result[0].app_endDate;
          const updateInfo = `UPDATE application SET app_endDate = ? WHERE app_acronym = ?`;
          connection.query(
            updateInfo,
            [old_endDate, app_acronym],
            (error, result) => {
              if (error) throw error;
            }
          );
        } else {
          const updateInfo = `UPDATE application SET app_endDate = ? WHERE app_acronym = ?`;
          connection.query(
            updateInfo,
            [endDate, app_acronym],
            (error, result) => {
              if (error) throw error;
            }
          );
        }

        //////////////////// PERMIT OPEN ////////////////////
        if (!permitOpen) {
          const oldPermitOpen = result[0].app_permitOpen;
          const updateInfo = `UPDATE application SET app_permitOpen = ? WHERE app_acronym = ?`;
          connection.query(
            updateInfo,
            [oldPermitOpen, app_acronym],
            (error, result) => {
              if (error) throw error;
            }
          );
        } else {
          const updateInfo = `UPDATE application SET app_permitOpen = ? WHERE app_acronym = ?`;
          connection.query(
            updateInfo,
            [permitOpen, app_acronym],
            (error, result) => {
              if (error) throw error;
            }
          );
        }

        //////////////////// PERMIT TODO ////////////////////
        if (!permitTodo) {
          const oldPermitTodo = result[0].app_permitTodo;
          const updateInfo = `UPDATE application SET app_permitToDo = ? WHERE app_acronym = ?`;
          connection.query(
            updateInfo,
            [oldPermitTodo, app_acronym],
            (error, result) => {
              if (error) throw error;
            }
          );
        } else {
          const updateInfo = `UPDATE application SET app_permitToDo = ? WHERE app_acronym = ?`;
          connection.query(
            updateInfo,
            [permitTodo, app_acronym],
            (error, result) => {
              if (error) throw error;
            }
          );
        }

        //////////////////// PERMIT DOING ////////////////////
        if (!permitDoing) {
          const oldPermitDoing = result[0].app_permitDoing;
          const updateInfo = `UPDATE application SET app_permitDoing = ? WHERE app_acronym = ?`;
          connection.query(
            updateInfo,
            [oldPermitDoing, app_acronym],
            (error, result) => {
              if (error) throw error;
            }
          );
        } else {
          const updateInfo = `UPDATE application SET app_permitDoing = ? WHERE app_acronym = ?`;
          connection.query(
            updateInfo,
            [permitDoing, app_acronym],
            (error, result) => {
              if (error) throw error;
            }
          );
        }

        //////////////////// PERMIT DOING ////////////////////
        if (!permitDone) {
          const oldPermitDone = result[0].app_permitDone;
          const updateInfo = `UPDATE application SET app_permitDone = ? WHERE app_acronym = ?`;
          connection.query(
            updateInfo,
            [oldPermitDone, app_acronym],
            (error, result) => {
              if (error) throw error;
            }
          );
        } else {
          const updateInfo = `UPDATE application SET app_permitDone = ? WHERE app_acronym = ?`;
          connection.query(
            updateInfo,
            [permitDone, app_acronym],
            (error, result) => {
              if (error) throw error;
            }
          );
        }
        res.send();
      }
    });
  });

  app.post("/add-plan", (req, res, next) => {
    const { plan_app_acronym, planName, startDate, endDate } = req.body;
    console.log(req.body);

    if (planName) {
      const checkPlan = `SELECT plan_mvp_name FROM plan WHERE plan_mvp_name = ?`;
      connection.query(checkPlan, [planName], (error, result) => {
        if (error) throw error;
        else if (result.length > 0) {
          return next(errorHandler("Plan name exist!", req, res));
        } else {
          const addPlan = `INSERT INTO plan (plan_mvp_name, plan_app_acronym, plan_startDate, plan_endDate) VALUES (?, ?, ?, ?)`;
          connection.query(
            addPlan,
            [planName, plan_app_acronym, startDate, endDate],
            (error, result) => {
              if (error) throw error;
              else {
                console.log("added");
              }
            }
          );
          res.send();
        }
      });
    } else {
      return next(errorHandler("Plan name cannot be empty!", req, res));
    }
  });

  app.get("/get-plans", (req, res) => {
    const plan_app_acronym = req.query.plan_app_acronym;
    // console.log(plan_app_acronym);

    const getPlan = `SELECT *, date_format(plan_startDate, '%d/%m/%y') as startDate, date_format(plan_endDate, '%d/%m/%y') as endDate FROM plan WHERE plan_app_acronym = ?`;
    connection.query(getPlan, [plan_app_acronym], (error, result) => {
      if (error) throw error;
      else if (result.length > 0) {
        res.send(result);
      }
    });
  });
};

module.exports = addupdateApp;
