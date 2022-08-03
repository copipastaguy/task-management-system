const connection = require("../server/connection");
const errorHandler = require("./errorHandler");

const addupdateTask = function (app) {
  const date = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const time = new Date().toTimeString().slice(0, 8);
  const now = `${date}/${month}/${year} ${time}`;

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
    // console.log(req.body);

    if (taskName) {
      const checkTask = `SELECT task_name FROM task WHERE task_name = ?`;
      connection.query(checkTask, [taskName], (error, result) => {
        if (error) throw error;
        else if (result.length > 0) {
          //////////////////////////// CHECK IF TASK NAME EXIST /////////////////////////////////
          return next(errorHandler("Task name exist!", req, res));
        } else {
          //////////////////////////// GET APP ACRONYM, RUNNING NUMBER FOR TASK_ID /////////////////////////////////
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
                const auditNotes = `${now}: ${taskState} \nDone by: ${taskCreator} \n${taskNotes}`;
                const addNote = `INSERT INTO task_notes (task_name, task_note, last_updated) VALUES (?, ?, NOW())`;
                connection.query(
                  addNote,
                  [taskName, auditNotes],
                  (error, result) => {
                    if (error) throw error;
                    else {
                      res.send(`Task ${taskName} created!`);
                    }
                  }
                );
              }
            }
          );
        }
      });
    } else if (!taskName) {
      return next(errorHandler("Input valid task name", req, res));
    }
  });

  app.post("/edit-task", (req, res, next) => {
    const { task_name, taskNotes, taskState, taskOwner, taskPlan } = req.body;
    console.log(req.body);

    if (taskNotes.length > 0) {
      // UPDATED TASK NOTES
      const addNote = `INSERT INTO task_notes (task_name, task_note, last_updated) VALUES (?, ?, NOW())`;
      const updateNotes = `${now}: ${taskState} \n${taskOwner} \n${taskNotes} \n`;

      connection.query(addNote, [task_name, updateNotes], (error, result) => {
        if (error) throw error;
        else {
          // CHCEK FOR TASK PLAN
          if (taskPlan) {
            // UPDATED TASK PLAN in task
            const updateTask = `UPDATE task SET task_plan = ?, task_owner = ? WHERE task_name = ?`;
            connection.query(
              updateTask,
              [taskPlan, taskOwner, task_name],
              (error, result) => {
                if (error) throw error;
                else {
                  // INSERT INTO task_notes
                  const addNote = `INSERT INTO task_notes (task_name, task_note, last_updated) VALUES (?, ?, NOW() + 1)`;
                  const updateNotes = `${now}: ${taskState} \n${taskOwner} \nUpdated task \n`;
                  connection.query(
                    addNote,
                    [task_name, updateNotes],
                    (error, result) => {
                      if (error) throw error;
                    }
                  );
                }
              }
            );
          } else {
            const updateTask = `UPDATE task SET task_plan = ?, task_owner = ? WHERE task_name = ?`;
            connection.query(
              updateTask,
              [taskPlan, taskOwner, task_name],
              (error, result) => {
                if (error) throw error;
              }
            );
          }
          res.send(`Updated ${task_name}`);
        }
      });
    } else if (taskNotes.length == 0) {
      // NO TASK NOTES
      // UPDATED TASK PLAN
      const updateTask = `UPDATE task SET task_plan = ?, task_owner = ? WHERE task_name = ?`;
      connection.query(
        updateTask,
        [taskPlan, taskOwner, task_name],
        (error, result) => {
          if (error) throw error;
          else {
            // INSERT INTO task_notes
            const addNote = `INSERT INTO task_notes (task_name, task_note, last_updated) VALUES (?, ?, NOW())`;
            const updateNotes = `${now}: ${taskState} \n${taskOwner} \nUpdated task plan \n`;
            connection.query(
              addNote,
              [task_name, updateNotes],
              (error, result) => {
                if (error) throw error;
              }
            );
          }
        }
      );
      res.send(`Updated ${task_name}`);
    }
  });

  // PROJECT MANAGER APPROVE TASK
  app.post("/move-task-todo", (req, res, next) => {
    const { task_name, newState, note, taskOwner } = req.body;
    const updateTask = `UPDATE task SET task_state = ?, task_owner = ? WHERE task_name = ? `;
    connection.query(
      updateTask,
      [newState, taskOwner, task_name],
      (error, result) => {
        if (error) throw error;
        else {
          // res.send(result);
          const auditNote = `${now}: ${newState} \nDone by: ${taskOwner} \nUpdated task state to To-Do \n`;
          const addNote = `INSERT INTO task_notes (task_name, task_note, last_updated) VALUES (?, ?, NOW())`;
          connection.query(addNote, [task_name, auditNote], (error, result) => {
            if (error) throw error;
            else {
              res.send(result);
            }
          });
        }
      }
    );
  });

  app.post("/move-task-doing", (req, res, next) => {
    const { task_name, newState, taskOwner } = req.body;
    const updateNote = `UPDATE task SET task_state = ?, task_owner = ? WHERE task_name = ? `;
    connection.query(
      updateNote,
      [newState, taskOwner, task_name],
      (error, result) => {
        if (error) throw error;
        else {
          const auditNote = `${now}: ${newState} \nDone by: ${taskOwner} \nUpdated task state to Doing \n`;
          const addNote = `INSERT INTO task_notes (task_name, task_note, last_updated) VALUES (?, ?, NOW())`;
          connection.query(addNote, [task_name, auditNote], (error, result) => {
            if (error) throw error;
            else {
              res.send(result);
            }
          });
        }
      }
    );
  });

  app.post("/move-task-done", (req, res, next) => {
    const { task_name, newState, taskOwner } = req.body;
    const updateNote = `UPDATE task SET task_state = ?, task_owner = ? WHERE task_name = ? `;
    connection.query(
      updateNote,
      [newState, taskOwner, task_name],
      (error, result) => {
        if (error) throw error;
        else {
          const auditNote = `${now}: ${newState} \nDone by: ${taskOwner} \nUpdated task state to Done \n`;
          const addNote = `INSERT INTO task_notes (task_name, task_note, last_updated) VALUES (?, ?, NOW())`;
          connection.query(addNote, [task_name, auditNote], (error, result) => {
            if (error) throw error;
            else {
              res.send(result);
            }
          });
        }
      }
    );
  });

  app.post("/move-task-close", (req, res, next) => {
    const { task_name, newState, taskOwner } = req.body;
    const updateNote = `UPDATE task SET task_state = ?, task_owner = ? WHERE task_name = ? `;
    connection.query(
      updateNote,
      [newState, taskOwner, task_name],
      (error, result) => {
        if (error) throw error;
        else {
          const auditNote = `${now}: ${newState} \nDone by: ${taskOwner} \nUpdated task state to Closed \n`;
          const addNote = `INSERT INTO task_notes (task_name, task_note, last_updated) VALUES (?, ?, NOW())`;
          connection.query(addNote, [task_name, auditNote], (error, result) => {
            if (error) throw error;
            else {
              res.send(result);
            }
          });
        }
      }
    );
  });
};

module.exports = addupdateTask;
