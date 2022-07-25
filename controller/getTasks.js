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
};

module.exports = getTasks;
