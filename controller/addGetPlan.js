const connection = require("../server/connection");
const errorHandler = require("./errorHandler");
const checkgroup = require("./checkGroup");

const addGetPlan = function (app) {
  app.post("/add-plan", async (req, res, next) => {
    const { app_acronym, planName, startDate, endDate, permitUser, taskOwner, planColor } = req.body;

    const permitAddPlan = await checkgroup({ username: taskOwner, usergroup: permitUser });
    // console.log(permitAddPlan);
    if (permitAddPlan === false) {
      return next(errorHandler("No access", req, res));
    } else {
      if (planName && startDate && endDate) {
        const checkPlan = `SELECT plan_mvp_name FROM plan WHERE plan_mvp_name = ?`;
        connection.query(checkPlan, [planName], (error, result) => {
          if (error) throw error;
          else if (result.length > 0) {
            return next(errorHandler("Plan name exist!", req, res));
          } else if (result.length == 0) {
            const addPlan = `INSERT INTO plan (plan_mvp_name, plan_app_acronym, plan_color, plan_startDate, plan_endDate) VALUES (?, ?, ?, ?, ?)`;
            connection.query(addPlan, [planName, app_acronym, planColor, startDate, endDate], (error, result) => {
              if (error) throw error;
              else {
                console.log("added");
              }
            });
            res.send(result);
          }
        });
      } else {
        return next(errorHandler("Fill in all fields!", req, res));
      }
    }
  });

  app.get("/get-plans", (req, res) => {
    const plan_app_acronym = req.query.plan_app_acronym;

    const getPlan = `SELECT *, date_format(plan_startDate, '%d/%m/%y') as startDate, date_format(plan_endDate, '%d/%m/%y') as endDate FROM plan WHERE plan_app_acronym = ?`;
    connection.query(getPlan, [plan_app_acronym], (error, result) => {
      if (error) throw error;
      else {
        res.send(result);
      }
    });
  });
};

module.exports = addGetPlan;
