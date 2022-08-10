const loginUser = require("../loginController");
const createToken = require("../jwt/createJWT");
const errorHandler = require("../errorHandler");
const checkGroup = require("../checkGroup");
const connection = require("../../server/connection");

const CreateTaskAPI = function (app) {
  //    - - - CONTROLLER LOGIC FOR LOGIN AND AUTH - - -
  //    - - - ROUTING FOR LOGIN AND AUTH - - -
  app.post("/createtask", async (req, res, next) => {
    const { username, password, app_acronym, task_name, task_description } = req.body;
    console.log(req.body);
    // - - - FIELD IS NOT EMPTY - - -
    if (username && password) {
      const login = await loginUser(username, password);
      if (login === false) {
        return next(errorHandler({ msg: "Invalid login", code: 4001 }, req, res));
      } else {
        // CHECK USER GROUP WITH APP PERMIT CREATE
        const user = await checkGroup({ username: username, usergroup: "project lead" });
        console.log(user);

        //   CREATE NEW TASK
        // const fetchApp = `SELECT app_Rnum FROM application WHERE app_acronym = ?`;
        // connection.query(fetchApp, [app_acronym], (error, result) => {
        //   if (error) throw error;
        //   else {
        //     const rNum = result[0].app_Rnum;
        //     const task_Id = `${app_acronym}_${rNum + 1}`;
        //     // console.log(taskId);

        //     // CHECK IF TASK NAME EXIST BEFORE
        //     const checkTask = `SELECT task_name FROM task WHERE task_name = ?`;
        //     connection.query(checkTask, [task_name], (error, result) => {
        //       if (error) throw error;
        //       else if (result.length > 0) {
        //         return next(
        //           errorHandler(
        //             {
        //               message: "Duplicate Task name. Choose another task name",
        //               code: 4003,
        //             },
        //             req,
        //             res
        //           )
        //         );
        //       } else {
        //         const createTask = `INSERT INTO task (task_app_acronym, task_id, task_name, task_description, task_state, task_createDate) VALUES (?, ?, ?, ?, "Open", NOW())`;
        //         connection.query(createTask, [app_acronym, task_Id, task_name, task_description], (error, result) => {
        //           if (error) throw error;
        //           else {
        //             res.send({
        //               message: "Task created successfully",
        //               task_Id,
        //               task_name,
        //               app_acronym,
        //               task_description,
        //               code: 200,
        //             });
        //           }
        //         });
        //       }
        //     });
        //   }
        // });
      }
    } else {
      return next(errorHandler("Please fill up all fields", req, res));
    }
  });
};

module.exports = CreateTaskAPI;
