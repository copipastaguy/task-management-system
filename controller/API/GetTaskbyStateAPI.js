const connection = require("../../controller/server/connection");
const errorHandler = require("../errorHandler");
const loginUser = require("../loginController");

const GetTaskByStateAPI = function (app) {
  app.get("/api/get-task-by-state", async (req, res, next) => {
    const { username, password, task_state } = req.body;
    const state = task_state.toUpperCase();

    const login = await loginUser(username, password);
    if (login === false) return next(errorHandler({ code: 4001 }, req, res));

    if (!state) {
      res.send({ code: 4006 }, req, res);
    }

    if (state == "OPEN" || state == "TODO" || state == "DOING" || state == "DONE" || state == "CLOSED") {
      const getTasks = `SELECT task_id, task_name FROM task WHERE task_state = ?`;
      connection.query(getTasks, [state], (error, result) => {
        if (error) throw error;
        else if (result.length > 0) {
          res.send(result);
        } else {
          res.send([]);
        }
      });
    } else {
      res.send({ code: 4005 }, req, res);
    }
  });
};

module.exports = GetTaskByStateAPI;
