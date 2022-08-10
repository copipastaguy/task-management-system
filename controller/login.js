const connection = require("../server/connection");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

const errorHandler = require("./errorHandler");
const checkgroup = require("./checkGroup");
const createToken = require("./jwt/createJWT");

const login = function (app) {
  //    - - - CONTROLLER LOGIC FOR LOGIN AND AUTH - - -
  //    - - - ROUTING FOR LOGIN AND AUTH - - -

  const loginUser = (username, password) => {
    return new Promise((resolve, reject) => {
      // QUERY STATEMENT
      const query = `SELECT username, password, status, user_group FROM accounts WHERE username = ? `;
      connection.query(query, [username], (error, result) => {
        if (error) reject(error);
        // - - - VALID - - -
        else if (result.length > 0) {
          const userInfo = result[0];
          const hashPassword = result[0].password;
          const status = result[0].status;

          if (status == "Inactive") {
            return resolve(false);
          } else if (status === "Active") {
            bcrypt.compare(password, hashPassword, (error, correctPassword) => {
              if (error) throw error;
              else if (correctPassword) {
                // res.send({ userInfo, isAdmin, isLead, isManager, jwtToken });
                resolve(userInfo);
              } else {
                return resolve(false);
              }
            });
          }
        } else {
          // - - - INVALID USER - - -
          return resolve(false);
        }
      });
    });
  };

  app.post("/auth", async (req, res, next) => {
    const { username, password } = req.body;
    // - - - FIELD IS NOT EMPTY - - -
    if (username && password) {
      const isAdmin = await checkgroup({ username, usergroup: "Admin" });
      const isLead = await checkgroup({ username, usergroup: "project lead" });
      const isManager = await checkgroup({
        username,
        usergroup: "project manager",
      });
      // JWT TOKEN FOR USER
      // DATA TO STORE IN JWT AND USE TO VERIFY DURING REQUEST SENDING
      // username, user group string, isAdmin
      const jwtToken = await createToken({ username, isAdmin });
      const login = await loginUser(username, password);
      if (login === false) {
        return next(
          errorHandler({ msg: "Invalid login", code: 401 }, req, res)
        );
      } else {
        res.send({ message: "Logged In", token: jwtToken });
      }
    } else {
      return next(errorHandler("Please fill up all fields", req, res));
    }
  });
};

module.exports = login;
