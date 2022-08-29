const connection = require("../../controller/server/connection");
const checkGroup = require("../checkGroup");
const errorHandler = require("../errorHandler");
const { permitDoingController, permitDoneController } = require("../permitController");
const loginUser = require("../loginController");
const nodemailer = require("nodemailer");

const date = new Date().getDate();
const month = new Date().getMonth() + 1;
const year = new Date().getFullYear();
const time = new Date().toTimeString().slice(0, 8);
const now = `${date}/${month}/${year} ${time}`;

const PromoteTask2Done = function (app) {
  app.post("/api/promote-task-to-done", async (req, res, next) => {
    // const { username, password, task_name } = req.body;

    const jsonData = req.body;
    const promoteTaskInfo = {};

    for (let key in jsonData) {
      promoteTaskInfo[key.toLowerCase()] = jsonData[key];
    }

    if (!promoteTaskInfo.hasOwnProperty("username") || !promoteTaskInfo.hasOwnProperty("password") || !promoteTaskInfo.hasOwnProperty("task_id")) {
      return res.send({ code: 4008 });
    }

    const username = promoteTaskInfo.username;
    const password = promoteTaskInfo.password;
    const task_id = promoteTaskInfo.task_id;

    if (username && password && task_id) {
      const login = await loginUser(username, password);
      if (login === false) return res.send({ code: 4001 });

      const checkTask = (task_id) => {
        return new Promise((resolve, reject) => {
          const getTask = `SELECT task_id, task_name FROM task WHERE task_id = ?`;
          connection.query(getTask, [task_id], (error, result) => {
            if (error) reject(error);
            else if (result.length > 0) {
              return resolve(result);
            } else {
              return resolve(false);
            }
          });
        });
      };
      const checkTaskExist = await checkTask(task_id);
      const task_name = checkTaskExist[0].task_name;

      if (checkTaskExist === false) return res.send({ code: 4005 });

      const getAppAcronym = (task_id) => {
        // FETCH APP ACRONYM WITH TASK NAME
        return new Promise((resolve, reject) => {
          const getApp = `SELECT task_app_acronym FROM task WHERE task_id = ?`;
          connection.query(getApp, [task_id], (error, result) => {
            if (error) reject(error);
            const app_acronym = result[0].task_app_acronym;
            return resolve(app_acronym);
          });
        });
      };
      const app_acronym = await getAppAcronym(task_id);

      //   CHECK DOING PERMIT (APPLICATION ACRONYM)
      const permitDoing = await permitDoingController(app_acronym);
      const permitDone = await permitDoneController(app_acronym);

      const user = await checkGroup({
        username: username,
        usergroup: permitDoing,
      });
      if (user === false) {
        return res.send({ code: 4002 });
      }

      // // FETCH TASK
      const getTask = `SELECT task_id, task_state FROM task WHERE task_id = ?`;
      connection.query(getTask, [task_id], (error, result) => {
        if (error) throw error;
        else if (result.length > 0) {
          // CHECK TASK STATE IF IS IN DOING
          if (result[0].task_state != "Doing") {
            return res.send({ code: 4007 }, req, res);
          } else {
            // PROMOTE TASK
            const task_state = "DONE";
            const updateTask = `UPDATE task SET task_state = ?, task_owner = ? WHERE task_id = ? AND task_app_acronym = ? `;
            connection.query(updateTask, [task_state, username, task_id, app_acronym], (error, result) => {
              if (error) throw error;
              else {
                const auditNote = `${now}: ${task_state} \nDone by: ${username} \nUpdated task state to Done \n`;
                const addNote = `INSERT INTO task_notes (task_name, task_note, last_updated) VALUES (?, ?, NOW())`;
                connection.query(addNote, [task_name, auditNote], (error, result) => {
                  if (error) throw error;
                  // SEND EMAIL TO PERMIT DONE USER GROUP
                  const fetchEmail = `SELECT accounts.email FROM accounts, usergroup WHERE accounts.username = usergroup.username AND usergroup.user_group = ?`;
                  connection.query(fetchEmail, [permitDone], (error, result) => {
                    if (error) throw error;
                    else if (result.length > 0) {
                      result.forEach((user) => {
                        function sendEmail() {
                          let transporter = nodemailer.createTransport({
                            host: process.env.MAILTRAP_HOST,
                            port: process.env.MAILTRAP_PORT,
                            secure: false,
                            auth: {
                              user: process.env.MAILTRAP_USER,
                              pass: process.env.MAILTRAP_PASS,
                            },
                          });
                          let info = transporter.sendMail({
                            from: `${username}@tms.com`, // sender address
                            to: `${user.email}`, // list of receivers
                            subject: `Task ${task_name} is done!`, // Subject line
                            text: `${username} has completed task: ${task_name} on ${now}. Review now!`, // plain text body
                            html: `${username} has completed task: ${task_name} on ${now}. Review now!`, // html body
                          });
                        }
                        sendEmail();
                      });
                      console.log("sending email. . . ");
                      res.send({ code: 200 }, req, res);
                    }
                  });
                });
              }
            });
          }
        } else {
          // res.send({ code: 4005 }, req, res);
        }
      });
    } else {
      return next(errorHandler({ code: 4006 }, req, res));
    }
  });
};

module.exports = PromoteTask2Done;
