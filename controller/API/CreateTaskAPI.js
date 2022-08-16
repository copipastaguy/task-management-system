const loginUser = require("../loginController");
const createToken = require("../jwt/createJWT");
const errorHandler = require("../errorHandler");
const checkGroup = require("../checkGroup");
const { permitCreateController } = require("../permitController");
const checkAppController = require("../checkAppController");

const connection = require("../../server/connection");
const e = require("cors");

const CreateTaskAPI = function (app) {
  //    - - - CONTROLLER LOGIC FOR LOGIN AND AUTH - - -
  //    - - - ROUTING FOR LOGIN AND AUTH - - -
  app.post("/api/createtask", async (req, res, next) => {
    const { username, password, app_acronym, task_name, task_description } = req.body;
    // console.log(req.body);

    // - - - FIELD IS NOT EMPTY - - -
    if (username && password && task_name && app_acronym) {
      const login = await loginUser(username, password);

      if (login === false) {
        // console.warn({
        //   message: "Unauthorized",
        //   code: 4001,
        // });
        return next(
          errorHandler(
            {
              code: 4001,
            },
            req,
            res
          )
        );
      } else {
        // CHECK IF APP EXIST
        const app = await checkAppController(app_acronym);
        if (app === false) {
          return next(errorHandler({ code: 4005 }, req, res));
        } else {
          // CHECK USER GROUP WITH APP PERMIT CREATE
          // FETCH PERMIT CREATE GROUP
          const permit = await permitCreateController(app_acronym);
          const user = await checkGroup({
            username: username,
            usergroup: permit,
          });

          if (user === true) {
            //   CREATE NEW TASK
            const fetchApp = `SELECT app_Rnum FROM application WHERE app_acronym = ?`;
            connection.query(fetchApp, [app_acronym], (error, result) => {
              if (error) throw error;
              else {
                const rNum = result[0].app_Rnum;
                const task_Id = `${app_acronym}_${rNum + 1}`;

                // CHECK IF TASK NAME EXIST
                const checkTask = `SELECT task_name FROM task WHERE task_name = ? AND task_app_acronym = ?`;
                connection.query(checkTask, [task_name, app_acronym], (error, result) => {
                  if (error) throw error;
                  else if (result.length > 0) {
                    return next(
                      errorHandler(
                        {
                          // message: "💀x7  ごめんなさい I am sorry",
                          code: 4003,
                        },
                        req,
                        res
                      )
                    );
                  } else {
                    //	NEW TASK
                    const createTask = `INSERT INTO task (task_app_acronym, task_id, task_name, task_description, task_state, task_creator, task_owner, task_createDate) VALUES (?, ?, ?, ?, "OPEN", ?, ?, NOW())`;
                    connection.query(createTask, [app_acronym, task_Id, task_name, task_description, username, username], (error, result) => {
                      if (error) throw error;
                      else {
                        res.send({
                          // message: "ありがとう Arigato",
                          task_Id,
                          code: 200,
                        });
                      }
                    });
                  }
                  const updateRnum = `UPDATE application SET app_Rnum = ? WHERE app_acronym = ?`;
                  connection.query(updateRnum, [rNum + 1, app_acronym], (error, result) => {
                    if (error) throw error;
                    else console.log(result);
                  });
                });
              }
            });
          } else {
            return next(
              errorHandler(
                {
                  //   message: "Forbidden",
                  code: 4002,
                },
                req,
                res
              )
            );
          }
        }
      }
    } else {
      return next(errorHandler({ code: 4005 }, req, res));
    }
  });
};

module.exports = CreateTaskAPI;
