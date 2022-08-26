const errorHandler = require("./errorHandler");
const checkgroup = require("./checkGroup");
const createToken = require("./jwt/createJWT");
const loginUser = require("./loginController");

const login = function (app) {
  //    - - - CONTROLLER LOGIC FOR LOGIN AND AUTH - - -
  //    - - - ROUTING FOR LOGIN AND AUTH - - -
  app.post("/auth", async (req, res, next) => {
    const { username, password } = req.body;
    // - - - FIELD IS NOT EMPTY - - -
    if (username && password) {
      const login = await loginUser(username, password);
      if (login === false) {
        return next(errorHandler({ error: "Invalid login", code: 4001 }, req, res));
      } else {
        // console.log("hi");
        // JWT TOKEN FOR USER
        // DATA TO STORE IN JWT AND USE TO VERIFY DURING REQUEST SENDING
        // username, user group string, isAdmin

        const isAdmin = await checkgroup({ username, usergroup: "admin" });
        const isLead = await checkgroup({ username, usergroup: "project lead" });

        const isManager = await checkgroup({
          username,
          usergroup: "project manager",
        });

        const jwtToken = await createToken({ username, isAdmin });

        res.send({
          token: jwtToken,
          userInfo: login,
          isAdmin,
          isLead,
          isManager,
        });
      }
    } else {
      return next(errorHandler({ error: "Please fill up all fields" }, req, res));
    }
  });
};

module.exports = login;
