const express = require("express");
const session = require("express-session");
const cors = require("cors");
require("dotenv").config();

const login = require("../login");
const add = require("../add");
const update = require("../update");
const accounts = require("../accounts");
const userGroup = require("../userGroup");
const addGroup = require("../addGroup");
const addUserToGroup = require("../addUserToGroup");
const removeUserFromGroup = require("../removeUserFromGroup");
const userUpdate = require("../userUpdate");
const addupdateApp = require("../addupdateApp");
const addGetPlan = require("../addGetPlan");
const getApplications = require("../getApplications");
const addupdateTask = require("../addupdateTask");
const getTasks = require("../getTasks");

const CreateTaskAPI = require("../API/CreateTaskAPI");
const GetTaskByStateAPI = require("../API/GetTaskbyStateAPI");
const PromoteTask2Done = require("../API/PromoteTask2Done");

const invalidRoute = require("../invalidRoute");

const port = process.env.API_PORT;

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

login(app);
add(app);
update(app);
userGroup(app);
addGroup(app);
addUserToGroup(app);
removeUserFromGroup(app);
userUpdate(app);

//////////////////////////// PHASE 2 TASK FLOW MANAGEMENT /////////////////////////////////

addupdateApp(app);
addGetPlan(app);
getApplications(app);
addupdateTask(app);
getTasks(app);

//////////////////////////// PHASE 3 API MANAGEMENT /////////////////////////////////

CreateTaskAPI(app);
GetTaskByStateAPI(app);
PromoteTask2Done(app);

invalidRoute(app);



app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
