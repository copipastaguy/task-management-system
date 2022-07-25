const connection = require("../server/connection");
const errorHandler = require("../controller/errorHandler");
const addTask = function (app) {
  app.post("/add-task", (req, res, next) => {
    // checkGroup(userid, usergroup)
    const {
      taskAcronym,
      taskName,
      taskDescription,
      taskNotes,
      taskState,
      taskCreator,
      taskOwner,
      taskCreateDate,
    } = req.body;

    if (taskName) {
      //   console.log(taskName);

      const checkTask = `SELECT task_name FROM task WHERE task_name = ?`;
      connection.query(checkTask, [taskName], (error, result) => {
        if (error) throw error;
        else if (result.length > 0) {
          //////////////////////////// CHECK IF TASK NAME EXIST /////////////////////////////////
          return next(errorHandler("Task name exist!", req, res));
        } else {
          //////////////////////////// GET APP ACRONYM, RUNNING NUMBER FOR TASK_ID /////////////////////////////////
          // const createTaskID = `SELECT app_acronym, app_Rnum FROM application WHERE app_acronym = ?`;
          //////////////////////////// ADD TASK /////////////////////////////////
          const addTask = `INSERT INTO task (task_app_acronym, task_name, task_description, task_createDate) VALUES (?, ?, ?, NOW())`;
          connection.query(
            addTask,
            [taskAcronym, taskName, taskDescription],
            (error, result) => {
              if (error) throw error;
              res.send(`New task created!`);
            }
          );
        }
      });
    } else {
      return next(errorHandler("Input valid task name", req, res));
    }
  });
};

module.exports = addTask;
