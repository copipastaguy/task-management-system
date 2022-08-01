const connection = require("../server/connection");
const errorHandler = require("./errorHandler");

const addupdateTask = function (app) {
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
      taskPlan,
      note,
    } = req.body;
    console.log(req.body);

    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const time = new Date().toTimeString().slice(0, 8);
    const now = `${date}/${month}/${year} ${time}`;

    if (taskName) {
      const checkTask = `SELECT task_name FROM task WHERE task_name = ?`;
      connection.query(checkTask, [taskName], (error, result) => {
        if (error) throw error;
        else if (result.length > 0) {
          //////////////////////////// CHECK IF TASK NAME EXIST /////////////////////////////////
          return next(errorHandler("Task name exist!", req, res));
        } else {
          //////////////////////////// GET APP ACRONYM, RUNNING NUMBER FOR TASK_ID /////////////////////////////////
          // const task_app_acronym = app_acronym.concat(
          //   "_",
          //   taskName.toLowerCase().replaceAll(" ", "")
          // );

          const taskId = app_acronym.concat("_", app_Rnum);

          //////////////////////////// ADD TASK /////////////////////////////////
          const addTask = `INSERT INTO task (task_app_acronym, task_id, task_name, task_description, task_plan, task_state, task_creator, task_owner, task_createDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`;
          connection.query(
            addTask,
            [
              app_acronym,
              taskId,
              taskName,
              taskDescription,

              taskPlan,
              taskState,
              taskCreator,
              taskOwner,
            ],
            (error, result) => {
              if (error) throw error;
              else {
                const auditNotes = `${now}: ${taskState} \n${taskCreator} \n${taskNotes}`;
                const addNote = `INSERT INTO task_notes (task_name, task_note, last_updated) VALUES (?, ?, NOW())`;
                connection.query(
                  addNote,
                  [taskName, auditNotes],
                  (error, result) => {
                    if (error) throw error;
                    else {
                      console.log("hi");
                    }
                  }
                );
                res.send(`New task created!`);
              }
            }
          );
        }
      });
    } else if (!taskName) {
      return next(errorHandler("Input valid task name", req, res));
    }
  });

  // PROJECT MANAGER APPROVE TASK
  app.post("/approve-task", (req, res, next) => {
    const { task_name, newState, note, taskOwner } = req.body;
    console.log(req.body);
    console.log(note);
    const addNote = `INSERT INTO task_notes (task_name, task_note, last_updated) VALUES (?, ?, NOW())`;
    connection.query(addNote, [task_name, note], (error, result) => {
      if (error) throw error;
      else {
        console.log(result);
      }
    });

    // const getNotes = `SELECT task_notes FROM task WHERE task_name = ? `;
    // connection.query(getNotes, [task_name], (error, result) => {
    //   if (error) throw error;
    //   else {
    //     res.send(result[0].task_notes);
    //   }
    // });

    // const updateTask = `UPDATE task SET task_state = ?, task_owner = ? WHERE task_name = ? `;
    // connection.query(
    //   updateTask,
    //   [newState, taskOwner, task_name],
    //   (error, result) => {
    //     if (error) throw error;
    //     else {
    //       // FETCH NOTES

    //       const updateNotes = `UPDATE task SET task_notes = ? WHERE task_name = ?`;
    //       connection.query(updateNotes, [note], (error, result) => {});
    //       res.send();
    //     }
    //   }
    // );
  });

  app.get("/task/get-notes", (req, res) => {
    const task_name = req.query.task_name;
    console.log(task_name);
    const getNotes = `SELECT task_note FROM task_notes WHERE task_name = ?`;
    connection.query(getNotes, [task_name], (error, result) => {
      if (error) throw error;
      res.send(result);
    });
  });
};

module.exports = addupdateTask;
