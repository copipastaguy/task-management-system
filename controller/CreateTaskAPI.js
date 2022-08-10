const loginUser = require("./loginController");
const createToken = require("./jwt/createJWT");
const errorHandler = require("./errorHandler");
const connection = require("../server/connection");

const CreateTaskAPI = function (app) {
  //    - - - CONTROLLER LOGIC FOR LOGIN AND AUTH - - -
  //    - - - ROUTING FOR LOGIN AND AUTH - - -
  app.post("/createtask", async (req, res, next) => {
    const { username, password, app_acronym, task_name } = req.body;
    console.log(req.body);
    // - - - FIELD IS NOT EMPTY - - -
    if (username && password) {
      //   const isAdmin = await checkgroup({ username, usergroup: "Admin" });
      //   const isLead = await checkgroup({ username, usergroup: "project lead" });
      //   const isManager = await checkgroup({
      //     username,
      //     usergroup: "project manager",
      //   });
      // JWT TOKEN FOR USER
      // DATA TO STORE IN JWT AND USE TO VERIFY DURING REQUEST SENDING
      // username, user group string, isAdmin
      //   const jwtToken = await createToken({ username });

      const login = await loginUser(username, password);
      if (login === false) {
        return next(
          errorHandler({ msg: "Invalid login", code: 4001 }, req, res)
        );
      } else {
        //   CREATE NEW TASK
        const fetchApp = `SELECT app_Rnum FROM application WHERE app_acronym = ?`;
        connection.query(fetchApp, [app_acronym], (error, result) => {
          if (error) throw error;
          else {
            const rNum = result[0].app_Rnum;
            const task_Id = `${app_acronym}_${rNum + 1}`;
            // console.log(taskId);

            // CHECK IF TASK NAME EXIST BEFORE
            const checkTask = `SELECT task_name FROM task WHERE task_name = ?`;
            connection.query(checkTask, [task_name], (error, result) => {
              if (error) throw error;
              else if (result.length > 0) {
                return next(
                  errorHandler({ msg: "Task name exist", code: 4003 }, req, res)
                );
              } else {
                const createTask = `INSERT INTO task (task_app_acronym, task_id, task_name) VALUES (?, ?, ?)`;
                connection.query(
                  createTask,
                  [app_acronym, taskId, task_name],
                  (error, result) => {
                    if (error) throw error;
                    else {
                      res.send({ task_Id, task_name, app_acronym, code: 200 });
                    }
                  }
                );
              }
            });
          }
        });
      }
    } else {
      return next(errorHandler("Please fill up all fields", req, res));
    }
  });
};

module.exports = CreateTaskAPI;
