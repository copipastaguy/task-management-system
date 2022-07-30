const connection = require("../server/connection");
const errorHandler = require("./errorHandler");
const addTask = function (app) {
  app.post("/add-task", (req, res, next) => {
    // checkGroup(userid, usergroup)
    const {
      app_Rnum,
      app_acronym,
      taskName,
      taskDescription,
      taskNotes,
      taskState,
      taskCreator,
      taskOwner,
      taskCreateDate,
    } = req.body;
    console.log(req.body);

    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const time = new Date().toTimeString().slice(0, 8);
    const now = `${date}/${month}/${year} ${time}`;
    // console.log(now);

    if (taskName) {
      const checkTask = `SELECT task_name FROM task WHERE task_name = ?`;
      connection.query(checkTask, [taskName], (error, result) => {
        if (error) throw error;
        else if (result.length > 0) {
          //////////////////////////// CHECK IF TASK NAME EXIST /////////////////////////////////
          return next(errorHandler("Task name exist!", req, res));
        } else {
          //////////////////////////// GET APP ACRONYM, RUNNING NUMBER FOR TASK_ID /////////////////////////////////
          const task_app_acronym = app_acronym.concat(
            "_",
            taskName.toLowerCase().replaceAll(" ", "")
          );
          const auditNotes = `${now}: ${taskState} \n${taskCreator} \n${taskNotes}`;
          const taskId = app_acronym.concat("_", app_Rnum);
          //////////////////////////// ADD TASK /////////////////////////////////
          const addTask = `INSERT INTO task (task_app_acronym, task_id, task_name, task_description, task_notes, task_state, task_creator, task_createDate) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`;
          connection.query(
            addTask,
            [
              task_app_acronym,
              taskId,
              taskName,
              taskDescription,
              auditNotes,
              taskState,
              taskCreator,
            ],
            (error, result) => {
              if (error) throw error;
              res.send(`New task created!`);
            }
          );
        }
      });
    } else if (!taskName) {
      return next(errorHandler("Input valid task name", req, res));
    }
  });

  app.post("/approve-task", (req, res, next) => {
    const { task_name, newState, note } = req.body;
    console.log(req.body);
    const updateTask = `UPDATE task SET task_state = ? WHERE task_name = ? `;
    connection.query(updateTask, [newState, task_name], (error, result) => {
      if (error) throw error;
      else {
        res.send();
      }
    });
  });
};

module.exports = addTask;
