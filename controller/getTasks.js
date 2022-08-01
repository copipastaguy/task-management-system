const connection = require("../server/connection");
const getTasks = function (app) {
  app.get("/get-tasks", (req, res, next) => {
    const getTasks = `SELECT task_app_acronym, task_name, task_description FROM task`;
    connection.query(getTasks, (error, result) => {
      if (error) throw error;
      else {
        res.send(result);
      }
    });
  });

  app.get("/get-task", (req, res) => {
    const task_name = req.query.task_name;
    // console.log(task_name);
    const getNotes = `SELECT * FROM task WHERE task_name = ?`;
    connection.query(getNotes, [task_name], (error, result) => {
      if (error) throw error;
      else {
        res.send(result);
      }
    });
  });

  // app.get("/get-notes", (req, res) => {
  //   const task_name = req.query.task_name;
  //   console.log(task_name);
  //   const getNotes = `SELECT task_note FROM task_notes WHERE task_name = ?`;
  //   connection.query(getNotes, [task_name], (error, result) => {
  //     if (error) throw error;
  //     else {
  //       res.send(result);
  //     }
  //   });
  // });

  app.get("/get-open", (req, res) => {
    const getOpen = `SELECT * FROM task WHERE task_state = "Open"`;
    connection.query(getOpen, (error, result) => {
      if (error) throw error;
      else {
        res.send(result);
      }
    });
  });

  app.get("/get-todo", (req, res) => {
    const getTodo = `SELECT * FROM task WHERE task_state = "ToDo"`;
    connection.query(getTodo, (error, result) => {
      if (error) throw error;
      else {
        res.send(result);
      }
    });
  });

  app.get("/get-doing", (req, res) => {
    const getDoing = `SELECT * FROM task WHERE task_state = "Doing"`;
    connection.query(getDoing, (error, result) => {
      if (error) throw error;
      else {
        res.send(result);
      }
    });
  });

  app.get("/get-done", (req, res) => {
    const getDone = `SELECT * FROM task WHERE task_state = "Done"`;
    connection.query(getDone, (error, result) => {
      if (error) throw error;
      else {
        res.send(result);
      }
    });
  });
};

module.exports = getTasks;
