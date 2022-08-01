const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");

const login = require("../controller/login");
const add = require("../controller/add");
const update = require("../controller/update");
const accounts = require("../controller/accounts");
const checkAdmin = require("../controller/checkAdmin");
const checkGroup = require("../controller/checkGroup");
const userGroup = require("../controller/userGroup");
const addGroup = require("../controller/addGroup");
const addUserToGroup = require("../controller/addUserToGroup");
const removeUserFromGroup = require("../controller/removeUserFromGroup");
const userUpdate = require("../controller/userUpdate");
const addupdateApp = require("../controller/addupdateApp");
const addGetPlan = require("../controller/addGetPlan");
const getApplications = require("../controller/getApplications");
const addupdateTask = require("../controller/addupdateTask");
const getTasks = require("../controller/getTasks");

// server port
const port = 3002;

const app = express();
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// - - - ALL ACCOUNTS - - -
accounts(app);

//////////////////////////// PHASE 1 IDENTITY ACCESS MANAGEMENT /////////////////////////////////
// 1. login
// 2. add user
// 3. update user (admin/ user)
// 4. add user group
// 5. add user to group
// 6. remove user from group
// 7. check group function

// - - - LOGIN AND AUTH - - -
login(app);

// - - - ADD USER - - -
add(app);

// - - - UPDATE USER - - -
update(app);

// - - - CHECK ADMIN USER - - -
checkAdmin(app);

// - - - FETCH USER GROUP - - -
userGroup(app);

// - - - ADD USER GROUP - - -
addGroup(app);

// - - - ADD USER TO GROUP
addUserToGroup(app);

removeUserFromGroup(app);

userUpdate(app);

//////////////////////////// PHASE 2 TASK FLOW MANAGEMENT /////////////////////////////////
checkGroup(app);

addupdateApp(app);

addGetPlan(app);

getApplications(app);

addupdateTask(app);

getTasks(app);

app.get("/", (req, res) => {
  // redirect users to login page
  res.redirect("/login");
});

app.get("/test", (req, res) => {
  res.send("hello this is testing page");
});

app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
