const connection = require("../../controller/server/connection");
const errorHandler = require("../errorHandler");
const loginUser = require("../loginController");

const GetTaskByStateAPI = function (app) {
  app.get("/api/get-task-by-state", async (req, res, next) => {
    // const { username, password, task_state } = req.body;
    // const state = task_state.toUpperCase();

    const jsonData = req.body;
    console.log(jsonData);
    const getTaskInfo = {};

    for (let key in jsonData) {
      getTaskInfo[key.toLowerCase()] = jsonData[key];
    }

    const username = getTaskInfo.username;
    const password = getTaskInfo.password;
    const state = getTaskInfo.task_state;

    if (!getTaskInfo.hasOwnProperty("username") || !getTaskInfo.hasOwnProperty("password") || !getTaskInfo.hasOwnProperty("task_state")) {
      return res.send({ code: 4008 });
    }

    const login = await loginUser(username, password);
    if (login === false) return next(errorHandler({ code: 4001 }, req, res));

    if (!state) {
      return res.send({ code: 4006 }, req, res);
    } else {
      const currentState = state.toUpperCase();
      console.log(currentState);
      if (currentState == "OPEN" || currentState == "TODO" || currentState == "DOING" || currentState == "DONE" || currentState == "CLOSED") {
        const getTasks = `SELECT * FROM task WHERE task_state = ?`;
        connection.query(getTasks, [currentState], (error, result) => {
          if (error) throw error;
          else if (result.length > 0) {
            res.send({ code: 200, data: result });
          } else {
            res.send([]);
          }
        });
      } else {
        return res.send({ code: 4005 }, req, res);
      }
    }
  });
};

module.exports = GetTaskByStateAPI;
