const connection = require("../server/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const errorHandler = require("./errorHandler");
const checkgroup = require("./checkGroup");

const login = function (app) {
  //    - - - CONTROLLER LOGIC FOR LOGIN AND AUTH - - -
  //    - - - ROUTING FOR LOGIN AND AUTH - - -

  app.post("/auth", async (req, res, next) => {
    const { username, password } = req.body;
    // console.log(req.body);

    // - - - FIELD IS NOT EMPTY - - -
    if (username && password) {
      const isAdmin = await checkgroup({ username, usergroup: "Admin" });
      const isLead = await checkgroup({ username, usergroup: "project lead" });
      const isManager = await checkgroup({
        username,
        usergroup: "project manager",
      });

      // ACCESS TOKEN FOR USER
      // REFRESH TOKEN
      // ACCEPTS DATA, PRIVATE KEY AND OPTIONS
      const accessToken = jwt.sign(
        { username, isAdmin },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRATION,
        }
      );
      // res.send({ username, accessToken });

      // - - - CHECK IF USER EXIST - - -
      // - - - FETCH HASHED PASSWORD OF USER - - -
      const query = `SELECT username, password, status FROM accounts WHERE username = ? `;
      connection.query(query, [username], (error, result) => {
        if (error) throw error;
        // - - - VALID - - -
        else if (result.length > 0) {
          const userInfo = result[0];
          const hashPassword = result[0].password;

          const status = result[0].status;
          if (status == "Inactive") {
            return next(errorHandler("Wrong login details", req, res));
          } else if (status === "Active") {
            // fetch the exact user match
            // compare both passwords
            bcrypt.compare(password, hashPassword, (error, correctPassword) => {
              if (error) throw error;
              else if (correctPassword) {
                res.send({ userInfo, isAdmin, isLead, isManager, accessToken });
              } else {
                return next(errorHandler("Wrong login details", req, res));
              }
            });
          }
        } else {
          // - - - INVALID USER - - -
          return next(errorHandler("Wrong login details", req, res));
        }
      });
    } else {
      return next(errorHandler("Please fill up all fields", req, res));
    }
  });
};

module.exports = login;
