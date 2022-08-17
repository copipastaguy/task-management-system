const connection = require("./server/connection");

const permitCreateController = (app_acronym) => {
  return new Promise((resolve, reject) => {
    // QUERY STATEMENT
    const query = `SELECT app_permitCreate FROM application WHERE app_acronym = ?`;
    connection.query(query, [app_acronym], (error, result) => {
      if (error) reject(error);
      else if (result.length > 0) {
        return resolve(result[0].app_permitCreate);
      }
    });
  });
};

const permitDoingController = (app_acronym) => {
  return new Promise((resolve, reject) => {
    // QUERY STATEMENT
    const query = `SELECT app_permitDoing FROM application WHERE app_acronym = ?`;
    connection.query(query, [app_acronym], (error, result) => {
      if (error) reject(error);
      else if (result.length > 0) {
        return resolve(result[0].app_permitDoing);
      }
    });
  });
};

const permitDoneController = (app_acronym) => {
  return new Promise((resolve, reject) => {
    // QUERY STATEMENT
    const query = `SELECT app_permitDone FROM application WHERE app_acronym = ?`;
    connection.query(query, [app_acronym], (error, result) => {
      if (error) reject(error);
      else if (result.length > 0) {
        return resolve(result[0].app_permitDone);
      }
    });
  });
};
module.exports = { permitCreateController, permitDoingController, permitDoneController };
