const connection = require("../../controller/server/connection");
const errorHandler = require("../errorHandler");
const loginUser = require("../loginController");

const GetTaskByStateAPI = function (app) {
  app.get("/api/get-task-by-state", async (req, res, next) => {
    // const { username, password, task_state } = req.body;
    // const state = task_state.toUpperCase();

    const jsonData = req.body;
    const getTaskInfo = {};

    for (let key in jsonData) {
      getTaskInfo[key.toLowerCase()] = jsonData[key];
    }

    const username = getTaskInfo.username;
    const password = getTaskInfo.password;
    const state = getTaskInfo.task_state.toUpperCase();

    if (!getTaskInfo.hasOwnProperty("username") || !getTaskInfo.hasOwnProperty("password") || !getTaskInfo.hasOwnProperty("task_state")) {
      return res.send({ code: 4008 });
    }

    const login = await loginUser(username, password);
    if (login === false) return next(errorHandler({ code: 4001 }, req, res));

    if (!state) {
      res.send({ code: 4006 }, req, res);
    }

    if (state == "OPEN" || state == "TODO" || state == "DOING" || state == "DONE" || state == "CLOSED") {
      const getTasks = `SELECT * FROM task WHERE task_state = ?`;
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
