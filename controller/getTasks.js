const connection = require("../server/connection");

const getTasks = function (app) {
  app.get("/get-tasks", (req, res, next) => {
    const plan_app_acronym = req.query.plan_app_acronym;
    // console.log(plan_app_acronym);
    // const getTasks = `SELECT * FROM task WHERE task_app_acronym = ?`;
    const getTasks = `SELECT * FROM task as t WHERE t.task_app_acronym = ? GROUP BY t.task_name`;
    connection.query(getTasks, [plan_app_acronym], (error, result) => {
      if (error) throw error;
      else {
        res.send(result);
      }
    });
  });

  app.get("/get-task", (req, res) => {
    const task_name = req.query.task_name;
    const getTask = `SELECT * FROM task WHERE task_name = ?`;
    connection.query(getTask, [task_name], (error, result) => {
      if (error) throw error;
      else if (result.length > 0) {
        res.send(result);
      }
    });
  });

  app.get("/get-task-notes", (req, res) => {
    const task_name = req.query.task_name;
    const getNotes = `SELECT * FROM task_notes WHERE task_name = ?`;
    connection.query(getNotes, [task_name], (error, result) => {
      if (error) throw error;
      else {
        const noteArr = [];
        result.forEach((note) => {
          noteArr.push(note.task_note);
        });
        const noteStr = noteArr.reverse().join("\n");
        res.send(noteStr);
      }
    });
  });
};

module.exports = getTasks;
